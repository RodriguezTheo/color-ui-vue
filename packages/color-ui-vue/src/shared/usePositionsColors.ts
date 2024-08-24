import type { Color } from "@/shared/types";

type ValueReturn = {
  color: number[];
  positionsMain: number[];
  positionColor: number;
};

const colorStops: { color: [number, number, number]; position: number }[] = [
  { color: [255, 0, 0], position: 0 },
  { color: [255, 255, 0], position: 17 },
  { color: [0, 255, 0], position: 33 },
  { color: [0, 255, 255], position: 50 },
  { color: [0, 0, 255], position: 67 },
  { color: [255, 0, 255], position: 83 },
  { color: [255, 0, 0], position: 100 }
];

const interpolateColors = (color1: number[], color2: number[], percentage: number): number[] => {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * percentage),
    Math.round(color1[1] + (color2[1] - color1[1]) * percentage),
    Math.round(color1[2] + (color2[2] - color1[2]) * percentage)
  ];
};

function isColorBetween(color1: number[], color2: number[], color3: number[]) {
  for (let i = 0; i < 3; i++) {
    if (color3[i] < Math.min(color1[i], color2[i]) || color3[i] > Math.max(color1[i], color2[i])) {
      return false;
    }
  }
  return true;
}

function colorToPositionsInSliderHue(targetColor: number[]) {
  for (let i = 0; i < colorStops.length - 1; i++) {
    const first = colorStops[i].color;
    const second = colorStops[i + 1].color;
    if (isColorBetween(first, second, targetColor)) {
      const changingComponentIndex = first.findIndex(
        (component, index) => component !== second[index]
      );
      const p =
        (targetColor[changingComponentIndex] - first[changingComponentIndex]) /
        (second[changingComponentIndex] - first[changingComponentIndex]);
      return colorStops[i].position + (colorStops[i + 1].position - colorStops[i].position) * p;
    }
  }
  return 0;
}

function colorSelectedToHuePositions(colorSelected: number[], cb: (value: ValueReturn) => void) {
  const sortedIndices = colorSelected
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value)
    .map((item) => item.index);

  const [minIndex, mediumIndex, maxIndex] = sortedIndices;
  const minValue = colorSelected[minIndex];
  const mediumValue = colorSelected[mediumIndex];
  const maxValue = colorSelected[maxIndex];

  if (minValue === mediumValue && mediumValue === maxValue) {
    const valueReturn: ValueReturn = {
      color: [255, 0, 0],
      positionsMain: [0, ((255 - maxValue) * 100) / 255],
      positionColor: 0
    };

    return cb(valueReturn);
  }

  const normalizedValue = (mediumValue - minValue) / (maxValue - minValue);
  const initializeColor = [0, 0, 0];
  initializeColor[minIndex] = 0;
  initializeColor[maxIndex] = 255;
  initializeColor[mediumIndex] = Math.round(255 * normalizedValue);

  const valueReturn: ValueReturn = {
    color: initializeColor,
    positionsMain: [((maxValue - minValue) / maxValue) * 100, ((255 - maxValue) / 255) * 100],
    positionColor: colorToPositionsInSliderHue(initializeColor)
  };

  return cb(valueReturn);
}

function positionsMainToSelectedColor(
  positions: number[],
  color: number[],
  cb: (value: { color: number[] }) => void
) {
  const [x, y] = positions;
  const percentageX = x / 100;
  const percentageY = y / 100;
  const saturationColor = interpolateColors([255, 255, 255], color, percentageX);
  const searchColor = interpolateColors(saturationColor, [0, 0, 0], percentageY);
  if (searchColor) {
    cb({ color: searchColor });
  }
}

function positionHueToColor(position: number, cb: (value: number[]) => void) {
  let searchColor: Color | null = null;
  for (let i = 0; i < colorStops.length - 1; i++) {
    if (position >= colorStops[i].position && position <= colorStops[i + 1].position) {
      const percentage =
        (position - colorStops[i].position) / (colorStops[i + 1].position - colorStops[i].position);
      searchColor = interpolateColors(colorStops[i].color, colorStops[i + 1].color, percentage);
      break;
    }
  }
  if (searchColor) {
    cb(searchColor);
  }
}

export default () => {
  return {
    positionsMainToSelectedColor,
    colorSelectedToHuePositions,
    colorToPositionsInSliderHue,
    positionHueToColor
  };
};
