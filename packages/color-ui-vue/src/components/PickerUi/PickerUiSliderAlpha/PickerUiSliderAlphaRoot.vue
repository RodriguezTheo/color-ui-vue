<script lang="ts">
import type { Orientation } from "@/shared/types";

export type PickerUiSliderAlphaRootProps = {
  /** When `true`, square background is hidden */
  hideBackground?: false;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
};
</script>

<script setup lang="ts">
import { SliderBackground, SliderRoot } from "@/components/Base/Slider";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { computed } from "vue";

const props = withDefaults(defineProps<PickerUiSliderAlphaRootProps>(), {
  orientation: "horizontal",
  hideBackground: false
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
    v-if="rootContext.allowedAlpha.value"
    v-bind="props"
    v-model="rootContext.positionAlpha.value"
    :max="1"
    :min="0"
    :step="0.01"
    :dir="rootContext.dir.value"
    @update:model-value="rootContext.updateAlpha()"
    :style="[
      !hideBackground &&
        `background-size: 10px 10px;
        background-image: conic-gradient(
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 25%,
        transparent 0deg,
        transparent 50%,
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 75%,
        transparent 0deg
      )`
    ]"
  >
    <SliderBackground
      :style="`backgroundImage: linear-gradient(${gradientPos}
    rgba(${rootContext.color.value[0]},${rootContext.color.value[1]},${rootContext.color.value[2]},0),
    rgba(${rootContext.color.value[0]},${rootContext.color.value[1]},${rootContext.color.value[2]},1))`"
    />
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
