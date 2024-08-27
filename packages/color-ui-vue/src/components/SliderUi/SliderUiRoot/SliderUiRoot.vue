<script lang="ts">
import type {
  AcceptedMode,
  ColorFormat,
  Direction,
  Orientation,
  RGB,
  SliderColorSelected
} from "@/shared";
import type { ComputedRef, Ref } from "vue";
import type { PrimitiveProps } from "radix-vue";

export type SliderUiRootProps = PrimitiveProps & {
  /**
   * The reading direction of Slider UI when applicable. <br> If omitted assumes LTR (left-to-right) reading mode.
   * @defaultValue "ltr"
   */
  dir?: Direction;
  /**
   * The orientation of the Slider UI.
   */
  orientation?: Orientation;
  /** The accepted color mode
   * @defaultValue ["rgb", "hsl", "hex"]
   * */
  acceptedMode?: AcceptedMode[];
  /** Format modelValue
   * @defaultValue "rgb"
   */
  colorFormat?: ColorFormat;
  /** The default value of the slider picker
   * @defaultValue { r: 255, g: 0, b: 0 }
   */
  defaultValue?: SliderColorSelected;
  /**
   * The model value of the slider picker.
   * Check [useFormatColor](https://color-ui-vue.vercel.app/docs/utilities/use-format-color.html) for type declarations.
   */
  modelValue?: SliderColorSelected;
  /**
   * Array of lightness values for the swatches.
   * Note the number of swatches is determined by the length of this array.
   * Max value number is 100 and min value number is 0.
   * @defaultValue [80, 65, 50, 35, 20]
   */
  swatches?: number[];
  /**
   * The default saturation.
   * @defaultValue 50
   */
  defaultSaturation?: number;
};

export type SliderUiRootEmits = {
  /**
   * Event handler called when the color selected change
   */
  "update:modelValue": [payload: SliderColorSelected];
};

export type SliderUiRootProvider = {
  containerId: string;
  dir: Ref<Direction>;
  orientation: Ref<Orientation | undefined>;
  acceptedMode: Ref<AcceptedMode[]>;
  positionColor: Ref<number>;
  color: Ref<number[]>;
  updateColorSelected: () => void;
  updateColor: () => void;
  colorSelected: Ref<number[]>;
  colorFormat: Ref<ColorFormat>;
  setColor: (color: RGB) => void;
  swatches: ComputedRef<number[][]>;
};
</script>

<script setup lang="ts">
import useSliderUi from "@/components/SliderUi/composables/useSliderUi";
import { computed, toRefs } from "vue";
import { provideSliderUiRootContext } from "@/components/SliderUi/SliderUiRoot/context";
import { Primitive } from "radix-vue";

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<SliderUiRootProps>(), {
  as: "div",
  dir: "ltr",
  acceptedMode: () => ["rgb", "hsl", "hex"],
  colorFormat: "rgb",
  defaultValue: () => ({ r: 255, g: 0, b: 0 }),
  swatches: () => [80, 65, 50, 35, 20],
  defaultSaturation: 50
});

const vModel = defineModel<SliderColorSelected>();
const { acceptedMode, colorFormat, dir, swatches, orientation, defaultSaturation } = toRefs(props);

defineEmits<SliderUiRootEmits>();

const opt = computed(() => {
  return {
    colorFormat: colorFormat.value,
    acceptedMode: acceptedMode.value,
    swatches: swatches.value,
    defaultSaturation: defaultSaturation.value
  };
});

const { positionColor, color, updateColor, id, colorSelected, setColor, renderSwatches } =
  useSliderUi(vModel, opt, props.defaultValue);

provideSliderUiRootContext({
  containerId: id,
  dir,
  orientation,
  acceptedMode,
  positionColor,
  color,
  updateColorSelected: updateColor,
  updateColor,
  colorSelected,
  colorFormat,
  setColor,
  swatches: renderSwatches
});
</script>

<template>
  <Primitive v-bind="$attrs" :as="props.as" :as-child="props.asChild">
    <slot />
  </Primitive>
</template>

<style scoped></style>
