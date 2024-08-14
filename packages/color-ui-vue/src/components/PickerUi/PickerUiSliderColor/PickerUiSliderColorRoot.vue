<script lang="ts">
import type { Orientation } from "@/shared/types";

export type PickerUiSliderColorRootProps = {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
};
</script>

<script setup lang="ts">
import { SliderRoot } from "@/components/Base/Slider";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { computed } from "vue";

const props = withDefaults(defineProps<PickerUiSliderColorRootProps>(), {
  orientation: "horizontal"
});

const rootContext = injectPickerUiRootContext();

const gradientPos = computed(() => {
  if (props.orientation === "horizontal") {
    return rootContext.dir.value === "rtl" ? `to left,` : `to right,`;
  }
  return rootContext.dir.value === "rtl" ? `to bottom,` : `to top,`;
});
</script>

<template>
  <SliderRoot
    v-bind="props"
    v-model="rootContext.positionColor.value"
    :dir="rootContext.dir.value"
    :style="`background-image: linear-gradient(
              ${gradientPos}
              rgb(255, 0, 0) 0%,
              rgb(255, 255, 0) 17%,
              rgb(0, 255, 0) 33%,
              rgb(0, 255, 255) 50%,
              rgb(0, 0, 255) 67%,
              rgb(255, 0, 255) 83%,
              rgb(255, 0, 0) 100%
            )`"
    @update:modelValue="rootContext.updateColor()"
  >
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
