import { computed, type ModelRef, onMounted, type Ref, ref, watch } from "vue";
import type {
  AcceptedMode,
  Color,
  ColorFormat,
  ColorSelected,
  InputColor,
  ModeInput,
  Positions,
  RGBA
} from "@/shared/types";
import { arrayColorToObjectColor, useFormatColor } from "@/shared/useConvertColor";
import { useId } from "@/shared";
import { defaultPalette, useHistory } from "@/shared/useHistory";
import { initializeColor } from "@/shared/initializeColor";
import usePositionsColors from "@/shared/usePositionsColors";
import useColors from "@/shared/useColors";

type PickerUiOptionsMerged = {
  allowedAlpha: boolean;
  defaultValue: ColorSelected;
  colorFormat: ColorFormat;
  acceptedMode: AcceptedMode[];
  historyLimit: number;
  historyDefault: { color: number[]; alpha: number }[];
};

type PickerUiOptions = Partial<PickerUiOptionsMerged>;

export default (
  modelValue: ModelRef<ColorSelected | undefined>,
  historiesValue: ModelRef<{ color: number[]; alpha: number }[] | undefined>,
  options: Ref<PickerUiOptions>,
  defaultValue?: ColorSelected
) => {
  const id = useId(undefined, "color-ui");

  const defaultOptions = {
    defaultValue: modelValue.value
      ? modelValue.value
      : defaultValue
        ? defaultValue
        : { r: 255, g: 0, b: 0 },
    allowedAlpha: false,
    colorFormat: "rgb",
    acceptedMode: ["rgb", "hsl", "hex"],
    historyLimit: 8,
    historyDefault: defaultPalette
  };

  const mergedOptions = computed(() => {
    return { ...defaultOptions, ...options.value } as PickerUiOptionsMerged;
  });

  const { colorSelectedToHuePositions, positionsMainToSelectedColor, positionHueToColor } =
    usePositionsColors();

  const useColorsOptions = computed(() => {
    return {
      colorFormat: mergedOptions.value.colorFormat,
      allowedAlpha: mergedOptions.value.allowedAlpha
    };
  });

  // History
  const { histories, history } = useHistory(
    {
      limit: mergedOptions.value.historyLimit,
      defaultHistory: mergedOptions.value.historyDefault,
      allowedAlpha: mergedOptions.value.allowedAlpha
    },
    (value) => {
      historiesValue.value = value;
    }
  );

  const colorSelectedToHuePositionsColors = () =>
    colorSelectedToHuePositions(colorSelected.value, (value) => {
      color.value = value.color;
      positionsMain.value = value.positionsMain;
      positionColor.value = value.positionColor;
    });

  const updateEyeDropper = (value: string) => {
    colorSelected.value = useFormatColor(value, "hex", "rgb");
    updateInputsAll();
    colorSelectedToHuePositionsColors();
    history().create({
      color: colorSelected.value,
      alpha: mergedOptions.value.allowedAlpha ? alpha.value : 1
    });
  };

  // SLIDERS
  const positionsMain = ref<Positions>([50, 50]);
  const positionColor = ref<number>(0);
  const positionAlpha = ref<number>(1);

  const color = ref<Color>([255, 0, 0]);
  const colorSelected = ref<number[]>([255, 0, 0]);
  const alpha = ref<number>(1);

  const updateAlpha = () => {
    alpha.value = positionAlpha.value;
    updateInputs(alpha.value, "a");
  };

  const updateInput = {
    hex: (color: { r: number; g: number; b: number }) =>
      useColors(useColorsOptions.value).updateInput.hex(
        color,
        alpha.value,
        (value) => (inputs.value.hex = value)
      ),
    hsl: (color: number[]) =>
      useColors(useColorsOptions.value).updateInput.hsl(
        color,
        (value) => (inputs.value = { ...inputs.value, ...value })
      ),
    rgb: (color: number[]) =>
      useColors(useColorsOptions.value).updateInput.rgb(
        color,
        (value) => (inputs.value = { ...inputs.value, ...value })
      ),
    a: (value: number) =>
      useColors(useColorsOptions.value).updateInput.alpha(
        value,
        (value) => (inputs.value.a = value)
      )
  };

  const updateInputsAll = () => {
    const color = arrayColorToObjectColor(colorSelected.value, "rgb");
    const hsl = useFormatColor(color, "rgb", "hsl");
    updateInput.hsl(hsl);
    updateInput.hex(color);
    updateInput.rgb(colorSelected.value);
    updateInput.a(alpha.value);
  };

  const updateColor = () => {
    positionHueToColor(positionColor.value, (value) => {
      color.value = value;
      updateColorSelected();
      updateInputsAll();
    });
  };

  const updateColorSelected = () => {
    positionsMainToSelectedColor(positionsMain.value, color.value, (value) => {
      colorSelected.value = value.color;
      updateInputsAll();
    });
  };

  // INPUTS
  // RGB
  const inputs = ref<InputColor>({
    r: 255,
    g: 0,
    b: 50,
    h: 100,
    s: 0,
    l: 0,
    a: 1,
    hex: "#ff0032"
  });

  const updateInputs = (value: string | number, mode: ModeInput) => {
    if (isNaN(Number(value)) && mode !== "hex") {
      return;
    }

    (inputs.value[mode] as number | string) = mode !== "hex" ? Number(value) : value;

    if (mode === "a") {
      positionAlpha.value = Number(value);
      alpha.value = positionAlpha.value;

      updateInput.hex(arrayColorToObjectColor(colorSelected.value, "rgb"));

      colorSelectedToHuePositionsColors();
    }

    if (mode === "r" || mode === "g" || mode === "b") {
      colorSelected.value = [inputs.value.r, inputs.value.g, inputs.value.b];
      const color = arrayColorToObjectColor(colorSelected.value, "rgb");
      const hsl = useFormatColor(color, "rgb", "hsl");
      updateInput.hsl(hsl);
      updateInput.hex(color);
      colorSelectedToHuePositionsColors();
    }

    if (mode === "h" || mode === "s" || mode === "l") {
      const rgb = useFormatColor(
        { h: inputs.value.h, s: inputs.value.s, l: inputs.value.l },
        "hsl",
        "rgb"
      );
      updateInput.rgb(rgb);
      colorSelected.value = [rgb[0], rgb[1], rgb[2]];
      updateInput.hex(arrayColorToObjectColor(colorSelected.value, "rgb"));
      colorSelectedToHuePositionsColors();
    }

    if (mode === "hex") {
      const rgba = useFormatColor(value as string, "hex", "rgba");
      if (!rgba) return;
      const [r, g, b, a] = rgba;
      colorSelected.value = [r, g, b];

      updateInput.rgb(rgba);

      updateInput.hsl(useFormatColor({ r, g, b }, "rgb", "hsl"));

      updateInput.a(a);
      alpha.value = mergedOptions.value.allowedAlpha ? a : 1;
      positionAlpha.value = mergedOptions.value.allowedAlpha ? a : 1;

      colorSelectedToHuePositionsColors();
    }
  };

  // MODE
  const mode = ref<AcceptedMode>("rgb");

  onMounted(() => {
    initializeColor(mergedOptions, (value) => {
      colorSelected.value = value.colorSelected;
      if (value.alpha !== undefined && value.positionAlpha !== undefined) {
        alpha.value = value.alpha;
        positionAlpha.value = value.positionAlpha;
      }
      updateInputsAll();
      colorSelectedToHuePositionsColors();
    });
  });

  watch(useColorsOptions, () => {
    if (!useColorsOptions.value.allowedAlpha) {
      positionAlpha.value = 1;
      updateAlpha();
    }

    updateInput.hex(arrayColorToObjectColor(colorSelected.value, "rgb"));
  });

  watch([colorSelected, alpha], () => {
    useColors(useColorsOptions.value).updateModelValue(modelValue, {
      colorSelected: colorSelected.value,
      inputs: inputs.value,
      alpha: alpha.value
    });
  });

  const setColor = (color: RGBA) => {
    colorSelected.value = [color.r, color.g, color.b];
    updateInputs(mergedOptions.value.allowedAlpha ? color.a : 1, "a");
    updateInputsAll();
    colorSelectedToHuePositionsColors();
    history().create({
      color: [color.r, color.g, color.b],
      alpha: mergedOptions.value.allowedAlpha ? color.a : 1
    });
  };

  return {
    // SLIDERS
    alpha,
    updateAlpha,
    positionAlpha,
    color,
    updateColor,
    positionColor,
    colorSelected,
    updateColorSelected,
    positionsMain,
    // INPUTS
    inputs,
    updateInputs,
    // MODE
    mode,
    // EYE DROPPER
    updateEyeDropper,
    id,
    // History
    histories,
    history,
    // GLOBAL
    setColor
  };
};
