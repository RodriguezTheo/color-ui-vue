import type {
  AcceptedMode,
  ColorFormat,
  ColorSelected,
  HEX,
  HEXA,
  HSL,
  HSLA,
  RGB,
  RGBA
} from "@/shared/types";
import { useFormatColor } from "@/shared/useConvertColor";
import { type ComputedRef } from "vue";

type OptionsMerged = {
  allowedAlpha: boolean;
  defaultValue: ColorSelected;
  colorFormat: ColorFormat;
  acceptedMode: AcceptedMode[];
};

type ValueReturn = {
  colorSelected: number[];
  alpha?: number;
  positionAlpha?: number;
};

const setRGBColor = (data: RGB | RGBA, allowedAlpha?: boolean) => {
  const { r, g, b } = data;
  const valueToReturn: ValueReturn = {
    colorSelected: [r, g, b] as number[]
  };

  if ("a" in data && allowedAlpha) {
    valueToReturn.alpha = data.a;
    valueToReturn.positionAlpha = data.a;
  }

  return valueToReturn;
};

const setHSLColor = (data: HSL | HSLA, allowedAlpha?: boolean) => {
  const { h, s, l } = data;
  const valueToReturn: ValueReturn = {
    colorSelected: useFormatColor({ h, s, l }, "hsl", "rgb")
  };
  if ("a" in data && allowedAlpha) {
    valueToReturn.alpha = data.a;
    valueToReturn.positionAlpha = data.a;
  }

  return valueToReturn;
};

const setHEXColor = (data: HEX | HEXA, allowedAlpha?: boolean) => {
  const rgba = useFormatColor(data, "hex", "rgba");
  const [r, g, b, a] = rgba;

  const valueToReturn: ValueReturn = {
    colorSelected: [r, g, b]
  };

  if (allowedAlpha) {
    valueToReturn.alpha = a;
    valueToReturn.positionAlpha = a;
  }
  return valueToReturn;
};

export const initializeColor = (
  mergedOptions: ComputedRef<OptionsMerged>,
  cb: (value: ValueReturn) => void
) => {
  const { colorFormat, allowedAlpha, defaultValue } = mergedOptions.value;

  if (typeof defaultValue === "object") {
    const data = defaultValue as Omit<Omit<ColorSelected, "HEX">, "HEXA">;
    if (colorFormat === "rgb" && "r" in data && "g" in data && "b" in data) {
      return cb(setRGBColor(data as RGB | RGBA, allowedAlpha));
    } else if (colorFormat === "hsl" && "h" in data && "s" in data && "l" in data) {
      return cb(setHSLColor(data as HSL | HSLA, allowedAlpha));
    }
  } else if (colorFormat === "hex") {
    return cb(setHEXColor(defaultValue as HEX | HEXA, allowedAlpha));
  }
};
