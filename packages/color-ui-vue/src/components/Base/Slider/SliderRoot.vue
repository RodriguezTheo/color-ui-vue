<script lang="ts">
import type { Direction, Orientation } from "@/shared/types";

export type SliderRootProps = {
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
  /** The reading direction of the slider. */
  dir?: Direction;
};
</script>
<script setup lang="ts">
import { SliderRoot } from "radix-vue";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<SliderRootProps>(), {
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
});

const vModel = defineModel<number>("modelValue", {
  default: 0
});

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
    @update:model-value="updateVModel"
  >
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
