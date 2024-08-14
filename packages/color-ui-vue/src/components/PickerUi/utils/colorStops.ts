export const colorStops: { color: [number, number, number]; position: number }[] = [
  { color: [255, 0, 0], position: 0 },
  { color: [255, 255, 0], position: 17 },
  { color: [0, 255, 0], position: 33 },
  { color: [0, 255, 255], position: 50 },
  { color: [0, 0, 255], position: 67 },
  { color: [255, 0, 255], position: 83 },
  { color: [255, 0, 0], position: 100 }
];

const isColorBetween = (
  color1: [number, number, number],
  color2: [number, number, number],
  color3: [number, number, number]
) => {
  for (let i = 0; i < 3; i++) {
    if (color3[i] < Math.min(color1[i], color2[i]) || color3[i] > Math.max(color1[i], color2[i])) {
      return false;
    }
  }
  return true;
};

export const positionInSlider = (targetColor: [number, number, number]) => {
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
};
