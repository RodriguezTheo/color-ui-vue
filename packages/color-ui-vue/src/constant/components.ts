export const components = {
  pickerUiRoot: ["PickerUiRoot"],

  pickerUiSliderMain: ["PickerUiSliderMainRoot", "PickerUiSliderMainThumb"],

  pickerUiRender: ["PickerUiRenderRoot", "PickerUiRenderBackground"],

  pickerUiEyeDropper: ["PickerUiEyeDropperRoot", "PickerUiEyeDropperTrigger"],

  pickerUiSliderColor: ["PickerUiSliderColorRoot", "PickerUiSliderColorThumb"],

  pickerUiSliderAlpha: ["PickerUiSliderAlphaRoot", "PickerUiSliderAlphaThumb"],

  pickerUiMode: [
    "PickerUiModeRoot",
    "PickerUiModeTrigger",
    "PickerUiModeContent",
    "PickerUiModeItem",
    "PickerUiModeItemLabel",
    "PickerUiModeItemInput"
  ],

  sliderUiRoot: ["SliderUiRoot"],

  sliderUiSliderColor: ["SliderUiSliderColorRoot", "SliderUiSliderColorThumb"],

  sliderUiSwatch: ["SliderUiSwatchRoot", "SliderUiSwatchItem"]
};

export const utils = {
  utils: ["useId", "useEyeDropper", "arrayColorToObjectColor", "useFormatColor"]
};
