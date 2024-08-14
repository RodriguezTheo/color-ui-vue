/**
 * Global Types
 * */
export type Direction = "ltr" | "rtl";
export type Orientation = "horizontal" | "vertical";

/**
 * Colors Types
 * */
export type RGB = { r: number; g: number; b: number };
export type RGBA = { r: number; g: number; b: number; a: number };
export type HSL = { h: number; s: number; l: number };
export type HSLA = { h: number; s: number; l: number; a: number };
export type HEX = string;
export type HEXA = string;

export type ColorFormat = "rgb" | "hsl" | "hex";

/**
 * Color UI
 * */
export type ColorSelected = RGB | RGBA | HSL | HSLA | HEX | HEXA;

export type AcceptedMode = "hsl" | "rgb" | "hex";

export type Mode = "hsl" | "rgb" | "hex";
export type ModeInput = "h" | "s" | "l" | "r" | "g" | "b" | "a" | "hex";

export type InputColor = {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  a: number;
  hex: string;

  [key: string]: number | string;
};

export type Color = [number, number, number];
export type Alpha = number;

export type Positions = [number, number];
export type Position = number;

export type ColorUiOptions = {
  allowedAlpha?: boolean;
  colorFormat?: ColorFormat;
  acceptedMode?: AcceptedMode[];
};

export type ColorUiOptionsMerged = ColorUiOptions & {
  allowedAlpha: boolean;
  defaultValue: ColorSelected;
  colorFormat: ColorFormat;
  acceptedMode: AcceptedMode[];
};
