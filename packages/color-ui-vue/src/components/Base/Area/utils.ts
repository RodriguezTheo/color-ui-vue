import { clamp } from "@vueuse/core";

export interface AreaOrientationPrivateProps {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type AreaOrientationPrivateEmits = {
  slideEnd: [];
  slideStart: [value: number[]];
  slideMove: [value: number[]];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent, direction: number, coords: "x" | "y"];
};

export function convertValueToPercentage(value: number[], min: number[], max: number[]) {
  const maxStepsX = max[0] - min[0];
  const percentPerStepX = 100 / maxStepsX;
  const percentageX = percentPerStepX * (value[0] - min[0]);
  const x = clamp(percentageX, 0, 100);

  const maxStepsY = max[1] - min[1];
  const percentPerStepY = 100 / maxStepsY;
  const percentageY = percentPerStepY * (value[1] - min[1]);
  const y = clamp(percentageY, 0, 100);

  return [x, y];
}

export function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

export function getDecimalCount(value: number) {
  return (String(value).split(".")[1] || "").length;
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}

export type Direction = "ltr" | "rtl";

export const PAGE_KEYS = ["PageUp", "PageDown"];
export const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

type SlideDirection = "from-left" | "from-right";
export const BACK_KEYS: Record<SlideDirection, string[]> = {
  "from-left": ["Home", "PageUp", "ArrowUp", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"]
};
