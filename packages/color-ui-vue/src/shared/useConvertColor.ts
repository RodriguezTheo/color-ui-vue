import type { ColorSelected, HEX, HEXA, HSL, HSLA, RGB, RGBA } from "@/shared/types";

// HEX to ....
const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

const hexToRgba = (hex: string): number[] | null => {
  const hexWithoutHash = hex.startsWith("#") ? hex.slice(1) : hex;
  if (/^([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hexWithoutHash)) {
    let a: number | null = null;
    const hasShortFormat = hexWithoutHash.length === 3 || hexWithoutHash.length === 4;
    const fullHex = hasShortFormat
      ? hexWithoutHash
          .split("")
          .map((char) => char + char)
          .join("")
      : hexWithoutHash;
    if (fullHex.length === 8) {
      a = Number((parseInt(fullHex.slice(6), 16) / 255).toFixed(2));
    }
    const rgb = hexToRgb(fullHex.slice(0, 6));
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    if (a !== null) {
      return [r, g, b, a];
    } else {
      return [r, g, b];
    }
  }
  return null;
};

// HSL to ....
const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

/*
 * Convert an HSL object to a Color object.
 * @param hsl - The HSL object to convert to an RGB object.
 * @returns An object with the RGB values of the color.
 */

const hslaToRgba = (hsl: [number, number, number], alpha: number = 1): number[] => {
  let r, g, b;
  let [h, s, l] = hsl;
  // Normalize h, s, l values
  h = h / 360;
  s = s / 100;
  l = l / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  const result = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

  if (alpha) return [...result, alpha];
  return result;
};

// RGB to ....
const rgbaToHex = (color: number[], alpha: number): string => {
  const rgbHex = color.map((component) => component.toString(16).padStart(2, "0")).join("");
  const alphaHex =
    alpha !== 1
      ? Math.round(alpha * 255)
          .toString(16)
          .padStart(2, "0")
      : "";
  return `#${rgbHex}${alphaHex}`.toUpperCase();
};

const rgbToHsla = (color: number[], alpha: number): number[] => {
  const formattedColor = color.map((component) => component / 255);
  const [r, g, b] = formattedColor;
  const max = Math.max(...formattedColor);
  const min = Math.min(...formattedColor);

  let l = (max + min) / 2;
  let s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

  let h;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / (max - min)) % 6;
  } else if (max === g) {
    h = (b - r) / (max - min) + 2;
  } else {
    h = (r - g) / (max - min) + 4;
  }

  h = h * 60;
  if (h < 0) h = h + 360;

  h = +h.toFixed(0);
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  if (alpha) return [h, s, l, alpha];
  return [h, s, l];
};

export function arrayColorToObjectColor(
  color: number[],
  format: "rgb"
): { r: number; g: number; b: number; a?: number };
export function arrayColorToObjectColor(
  color: number[],
  format: "hsl"
): { h: number; s: number; l: number; a?: number };

/**
 * Convert an array to an object.
 * @param color - The color array to convert.
 * @param format - The format of the color array.
 * @returns The color object.
 */
export function arrayColorToObjectColor(
  color: number[],
  format: "rgb" | "hsl" = "rgb"
):
  | { r: number; g: number; b: number; a?: number }
  | { h: number; s: number; l: number; a?: number } {
  if (format === "rgb") {
    if (color.length === 4) {
      const [r, g, b, a] = color;
      return { r, g, b, a };
    }
    const [r, g, b] = color;
    return { r, g, b };
  } else if (format === "hsl") {
    if (color.length === 4) {
      const [h, s, l, a] = color;
      return { h, s, l, a };
    }
    const [h, s, l] = color;
    return { h, s, l };
  }
  throw new Error("convertArrayToObject : Invalid color format");
}

// Define overloads for different output formats
export function useFormatColor(
  inputColor: ColorSelected,
  inputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa",
  outputFormat: "hex" | "hexa"
): string | null;
export function useFormatColor(
  inputColor: ColorSelected,
  inputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa",
  outputFormat: "rgb" | "rgba" | "hsl" | "hsla"
): number[];
/**
 * Convert a color from one format to another.
 * @param inputColor - The color to convert.
 * @param inputFormat - The format of the input color.
 * @param outputFormat - The format of the output color.
 * @returns The color in the output format.
 */
export function useFormatColor(
  inputColor: ColorSelected,
  inputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa",
  outputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa" = "hex"
) {
  let color: number[] = [];
  if (inputFormat === "hex" || inputFormat === "hexa") {
    const testColor = hexToRgba(inputColor as HEX | HEXA);
    if (testColor) {
      color = testColor;
    } else {
      return null;
    }
  } else if (inputFormat === "rgb") {
    const { r, g, b } = inputColor as RGB;
    color = [r, g, b];
  } else if (inputFormat === "rgba") {
    const { r, g, b, a } = inputColor as RGBA;
    color = [r, g, b, a];
  } else if (inputFormat === "hsl") {
    const { h, s, l } = inputColor as HSL;
    color = hslaToRgba([h, s, l]);
  } else if (inputFormat === "hsla") {
    const { h, s, l, a } = inputColor as HSLA;
    color = hslaToRgba([h, s, l], a);
  }

  if (color.length === 0) {
    throw new Error("useFormatColor: Invalid color format");
  }

  switch (outputFormat) {
    case "hex":
      return rgbaToHex(color.slice(0, 3), 1);
    case "hexa":
      return rgbaToHex(color.slice(0, 3), color[3]);
    case "rgb":
      return color.slice(0, 3);
    case "rgba":
      return color;
    case "hsl":
      return rgbToHsla(color.slice(0, 3), 1);
    case "hsla":
      return rgbToHsla(color.slice(0, 3), color[3]);
  }
}
