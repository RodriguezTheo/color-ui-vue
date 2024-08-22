import { computed, type ModelRef, onMounted, type Ref, ref, watch } from "vue";
import type {
  AcceptedMode,
  Color,
  ColorSelected,
  ColorUiOptions,
  ColorUiOptionsMerged,
  HEX,
  HEXA,
  HSL,
  HSLA,
  InputColor,
  ModeInput,
  Positions,
  RGB,
  RGBA
} from "@/shared/types";
import { interpolateColors } from "@/components/PickerUi/utils/interpolateColors";
import { colorStops, positionInSlider } from "@/components/PickerUi/utils";
import { arrayColorToObjectColor, useFormatColor } from "@/shared/useConvertColor";
import { useId } from "@/shared";
import { useHistory } from "@/shared/useHistory";

export default (
  modelValue: ModelRef<ColorSelected | undefined>,
  options: Ref<ColorUiOptions>,
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
    history: {
      enabledLocalStorage: true,
      limit: 8
    }
  };

  const mergedOptions = computed(() => {
    return { ...defaultOptions, ...options.value } as ColorUiOptionsMerged;
  });

  const initializeColor = (color: ColorSelected) => {
    // Define color by the color format
    if (typeof mergedOptions.value.defaultValue === "object") {
      const data = color as Omit<Omit<ColorSelected, "HEX">, "HEXA">;
      if (mergedOptions.value.colorFormat === "rgb") {
        if ("r" in data && "g" in data && "b" in data) {
          const { r, g, b } = data as RGB | RGBA;
          colorSelected.value = [r, g, b];

          if ("a" in data && mergedOptions.value.allowedAlpha) {
            alpha.value = (data as RGBA).a;
            positionAlpha.value = alpha.value;
          }
        }
      }

      if (mergedOptions.value.colorFormat === "hsl") {
        if ("h" in data && "s" in data && "l" in data) {
          const { h, s, l } = data as HSL | HSLA;
          colorSelected.value = useFormatColor({ h, s, l }, "hsl", "rgb");

          if ("a" in data && mergedOptions.value.allowedAlpha) {
            alpha.value = (data as HSLA).a;
            positionAlpha.value = alpha.value;
          }
        }
      }
    }

    if (
      mergedOptions.value.colorFormat === "hex" &&
      typeof mergedOptions.value.defaultValue === "string"
    ) {
      const data = color as HEX | HEXA;
      const rgba = useFormatColor(data, "hex", "rgba");
      const [r, g, b, a] = rgba;
      colorSelected.value = [r, g, b];

      if (mergedOptions.value.allowedAlpha) {
        alpha.value = a;
        positionAlpha.value = alpha.value;
      }
    }

    updateInputsAll();
    positionToSelectedColor();
  };

  // History
  const { histories, history } = useHistory(mergedOptions.value.history);

  const updateEyeDropper = (value: string) => {
    colorSelected.value = useFormatColor(value, "hex", "rgb");
    updateInputsAll();
    positionToSelectedColor();
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
    hex: (color: { r: number; g: number; b: number }) => {
      const testColor = mergedOptions.value.allowedAlpha
        ? useFormatColor({ ...color, a: alpha.value }, "rgba", "hexa")
        : useFormatColor(color, "rgb", "hex");
      if (testColor) {
        inputs.value.hex = testColor;
      }
    },
    hsl: (color: number[]) => {
      const [h, s, l] = color;
      inputs.value.h = h;
      inputs.value.s = s;
      inputs.value.l = l;
    },
    rgb: (color: number[]) => {
      const [r, g, b] = color;
      inputs.value.r = r;
      inputs.value.g = g;
      inputs.value.b = b;
    },
    a: (value: number) => {
      inputs.value.a = mergedOptions.value.allowedAlpha ? value : 1;
    }
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
    let searchColor: Color | null = null;
    for (let i = 0; i < colorStops.length - 1; i++) {
      if (
        positionColor.value >= colorStops[i].position &&
        positionColor.value <= colorStops[i + 1].position
      ) {
        const percentage =
          (positionColor.value - colorStops[i].position) /
          (colorStops[i + 1].position - colorStops[i].position);
        searchColor = interpolateColors(colorStops[i].color, colorStops[i + 1].color, percentage);
        break;
      }
    }
    if (searchColor) {
      color.value = searchColor;
      updateColorSelected();
      updateInputsAll();
    }
  };

  const updateColorSelected = () => {
    const [x, y] = positionsMain.value;
    const percentageX = x / 100;
    const percentageY = y / 100;
    const saturationColor = interpolateColors([255, 255, 255], color.value, percentageX);
    const searchColor = interpolateColors(saturationColor, [0, 0, 0], percentageY);
    if (searchColor) {
      colorSelected.value = searchColor;
      updateInputsAll();
    }
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
    //Verifier si la valeur est un nombre sinon retourner l'ancienne valeur de l'input
    if (isNaN(Number(value)) && mode !== "hex") {
      return;
    }

    (inputs.value[mode] as number | string) = mode !== "hex" ? Number(value) : value;

    if (mode === "a") {
      positionAlpha.value = Number(value);
      alpha.value = positionAlpha.value;

      updateInput.hex(arrayColorToObjectColor(colorSelected.value, "rgb"));

      positionToSelectedColor();
    }

    if (mode === "r" || mode === "g" || mode === "b") {
      colorSelected.value = [inputs.value.r, inputs.value.g, inputs.value.b];
      const color = arrayColorToObjectColor(colorSelected.value, "rgb");
      const hsl = useFormatColor(color, "rgb", "hsl");
      updateInput.hsl(hsl);
      updateInput.hex(color);
      positionToSelectedColor();
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
      positionToSelectedColor();
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

      positionToSelectedColor();
    }
  };

  const positionToSelectedColor = () => {
    const sortedIndices = colorSelected.value
      .map((value, index) => ({ value, index }))
      .sort((a, b) => a.value - b.value)
      .map((item) => item.index);

    const [minIndex, mediumIndex, maxIndex] = sortedIndices;
    const minValue = colorSelected.value[minIndex];
    const mediumValue = colorSelected.value[mediumIndex];
    const maxValue = colorSelected.value[maxIndex];

    if (minValue === mediumValue && mediumValue === maxValue) {
      color.value = [255, 0, 0];
      positionsMain.value = [0, ((255 - maxValue) * 100) / 255];
      positionColor.value = 0;
    } else {
      const normalizedValue = (mediumValue - minValue) / (maxValue - minValue);
      const initializeColor: Color = [0, 0, 0];
      initializeColor[minIndex] = 0;
      initializeColor[maxIndex] = 255;
      initializeColor[mediumIndex] = Math.round(255 * normalizedValue);

      color.value = initializeColor;
      positionsMain.value = [
        ((maxValue - minValue) / maxValue) * 100,
        ((255 - maxValue) / 255) * 100
      ];
      positionColor.value = positionInSlider(initializeColor);
    }
  };

  // MODE
  const mode = ref<AcceptedMode>("rgb");

  onMounted(() => {
    initializeColor(mergedOptions.value.defaultValue);
  });

  watch(mergedOptions, () => {
    if (!mergedOptions.value.allowedAlpha) {
      positionAlpha.value = 1;
      updateAlpha();
    }

    updateInput.hex(arrayColorToObjectColor(colorSelected.value, "rgb"));
  });

  watch([colorSelected, alpha], () => {
    if (mergedOptions.value.colorFormat === "rgb") {
      const data = {
        r: colorSelected.value[0],
        g: colorSelected.value[1],
        b: colorSelected.value[2]
      };
      if (mergedOptions.value.allowedAlpha) {
        (data as RGBA).a = alpha.value;
      }
      modelValue.value = data;
    }

    if (mergedOptions.value.colorFormat === "hsl") {
      const data: HSLA | HSL = {
        h: inputs.value.h,
        s: inputs.value.s,
        l: inputs.value.l
      };
      if (mergedOptions.value.allowedAlpha) {
        (data as HSLA).a = alpha.value;
      }
      modelValue.value = data;
    }

    if (mergedOptions.value.colorFormat === "hex") {
      modelValue.value = inputs.value.hex;
    }
  });

  const setColor = (color: RGBA) => {
    colorSelected.value = [color.r, color.g, color.b];
    updateInputs(mergedOptions.value.allowedAlpha ? color.a : 1, "a");
    updateInputsAll();
    positionToSelectedColor();
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
