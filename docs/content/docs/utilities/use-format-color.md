---
title: Use format color
description: Format color to different formats.
---

# useFormatColor

<Description>
Convert color to different formats.
</Description>

When you need to convert a color to a different format, you can use the `useFormatColor` composable.
This composable provides a function that takes a color and format color and returns the color in the desired format.

## Usage

```typescript
import { useFormatColor } from "color-ui-vue";

const color = useFormatColor("#ff0000", "hex", "rgb");
// Output: { r: 255, g: 0, b: 0 }
```

## Type Declarations

```typescript
export type RGB = { r: number; g: number; b: number };
export type RGBA = { r: number; g: number; b: number; a: number };
export type HSL = { h: number; s: number; l: number };
export type HSLA = { h: number; s: number; l: number; a: number };
export type HEX = string;
export type HEXA = string;

export type ColorSelected = RGB | RGBA | HSL | HSLA | HEX | HEXA;

export declare function useFormatColor(
  inputColor: ColorSelected,
  inputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa",
  outputFormat: "rgb" | "hsl" | "hex" | "rgba" | "hsla" | "hexa" = "hex"
): ColorSelected;
```

## Sources

[Sources](https://github.com/RodriguezTheo/color-ui-vue/blob/main/packages/color-ui-vue/src/shared/useConvertColor.tsc) • [Docs](https://github.com/RodriguezTheo/color-ui-vue/blob/main/docs/content/docs/utilities/use-convert-color.md)
