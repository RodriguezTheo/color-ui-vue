<script lang="ts">
import type { Direction, Orientation } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type SliderRootProps = PrimitiveProps & {
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
  /** The reading direction of the slider. */
  dir?: Direction;
};

export type SliderRootEmits = {
  "update:modelValue": [payload: number | undefined];
  onChangeComplete: [payload: number];
};
</script>
<script setup lang="ts">
import { SliderRoot } from "radix-vue";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<SliderRootProps>(), {
  orientation: "horizontal",
  as: "div",
  dir: "ltr",
  disabled: false
});

const vModel = defineModel<number>("modelValue", {
  default: 0
});

const emits = defineEmits<SliderRootEmits>();

const sliderValue = ref<number[]>([vModel.value]);
const updateVModel = (value: number[] | undefined) => {
  if (!value) return;
  vModel.value = value[0];
};

watch(
  () => props.modelValue,
  (value) => {
    if (!value) return;
    sliderValue.value = [value];
  }
);
</script>

<template>
  <SliderRoot
    v-bind="props"
    v-model="sliderValue"
    :dir="dir"
    :min="0"
    :max="100"
    :step="0.01"
    @update:model-value="
      (value) => {
        updateVModel(value);
        emits('update:modelValue', value ? value[0] : value);
      }
    "
    @value-commit="
      (event) => {
        emits('onChangeComplete', event[0]);
      }
    "
  >
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
