export const interpolateColors = (
  color1: [number, number, number],
  color2: [number, number, number],
  percentage: number
): [number, number, number] => {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * percentage),
    Math.round(color1[1] + (color2[1] - color1[1]) * percentage),
    Math.round(color1[2] + (color2[2] - color1[2]) * percentage)
  ];
};
