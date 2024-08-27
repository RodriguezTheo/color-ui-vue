import { computed, type ModelRef, onMounted, ref, type Ref, watch } from "vue";
import {
  type AcceptedMode,
  type Color,
  type ColorFormat,
  type ColorSelected,
  type InputColor,
  type RGB,
  type SliderColorSelected,
  useFormatColor,
  useId
} from "@/shared";
import { initializeColor } from "@/shared/initializeColor";
import usePositionsColors from "@/shared/usePositionsColors";
import useColors from "@/shared/useColors";

type SliderUiOptionsMerged = {
  allowedAlpha: boolean;
  defaultValue: ColorSelected;
  colorFormat: ColorFormat;
  acceptedMode: AcceptedMode[];
  swatches: number[];
  defaultSaturation: number;
};

type SliderUiOptions = Partial<SliderUiOptionsMerged>;

export default (
  modelValue: ModelRef<SliderColorSelected | undefined>,
  options: Ref<SliderUiOptions>,
  defaultValue?: SliderColorSelected
) => {
  const id = useId(undefined, "color-ui-slider");

  const defaultOptions = {
    defaultValue: modelValue.value
      ? modelValue.value
      : defaultValue
        ? defaultValue
        : { r: 255, g: 0, b: 0 },
    colorFormat: "rgb",
    acceptedMode: ["rgb", "hsl", "hex"],
    swatches: [80, 65, 50, 35, 20],
    defaultSaturation: 50
  };

  const mergedOptions = computed(() => {
    return { ...defaultOptions, ...options.value } as SliderUiOptionsMerged;
  });

  const { positionHueToColor, colorSelectedToHuePositions } = usePositionsColors();

  const useColorsOptions = computed(() => {
    return {
      colorFormat: mergedOptions.value.colorFormat,
      allowedAlpha: mergedOptions.value.allowedAlpha
    };
  });

  const colorSelectedToHuePositionsColors = () =>
    colorSelectedToHuePositions(colorSelected.value, (value) => {
      color.value = value.color;
      positionColor.value = value.positionColor;
    });

  // SLIDERS
  const positionColor = ref<number>(0);
  const color = ref<Color>([255, 0, 0]);
  const colorSelected = ref<number[]>([255, 0, 0]);

  const updateInput = {
    hex: (color: { r: number; g: number; b: number }) =>
      useColors(useColorsOptions.value).updateInput.hex(
        color,
        1,
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
      )
  };

  const updateInputsAll = () => {
    const [r, g, b] = colorSelected.value;
    const color = { r, g, b };
    const hsl = useFormatColor(color, "rgb", "hsl");
    updateInput.hsl(hsl);
    updateInput.hex(color);
    updateInput.rgb(colorSelected.value);
  };

  const updateColor = () => {
    positionHueToColor(positionColor.value, (value) => {
      color.value = value;
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

  const renderSwatches = computed(() => {
    return mergedOptions.value.swatches.map((value) => {
      const [r, g, b] = color.value;
      const objectColor = { r, g, b };
      const hsl = useFormatColor(objectColor, "rgb", "hsl");
      return useFormatColor(
        { h: hsl[0], s: mergedOptions.value.defaultSaturation, l: value },
        "hsl",
        "rgb"
      );
    });
  });

  const setColor = (color: RGB) => {
    colorSelected.value = [color.r, color.g, color.b];
    updateInputsAll();
  };

  onMounted(() => {
    initializeColor(mergedOptions, (value) => {
      colorSelected.value = value.colorSelected;
      updateInputsAll();
      colorSelectedToHuePositionsColors();
    });
  });

  watch([colorSelected, useColorsOptions], () => {
    useColors(useColorsOptions.value).updateModelValue(modelValue, {
      colorSelected: colorSelected.value,
      inputs: inputs.value,
      alpha: 1
    });
  });

  return {
    id,
    color,
    colorSelected,
    positionColor,
    updateColor,
    setColor,
    renderSwatches
  };
};
