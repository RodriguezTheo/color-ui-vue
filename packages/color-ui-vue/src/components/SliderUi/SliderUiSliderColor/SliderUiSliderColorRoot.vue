<script lang="ts">
import type { Orientation } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type SliderUiSliderColorRootProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
};
</script>

<script setup lang="ts">
import SliderHueRoot from "@/components/Base/SliderHue/SliderHueRoot.vue";
import { injectSliderUiRootContext } from "@/components/SliderUi/SliderUiRoot/context";
import { computed } from "vue";

const props = withDefaults(defineProps<SliderUiSliderColorRootProps>(), {
  as: "div",
  orientation: "horizontal"
});

const rootContext = injectSliderUiRootContext();

const dataOrientation = computed(() => {
  return rootContext.orientation.value || props.orientation;
});
</script>

<template>
  <SliderHueRoot
    v-bind="props"
    v-model="rootContext.positionColor.value"
    :orientation="dataOrientation"
    :dir="rootContext.dir.value"
    @update:modelValue="rootContext.updateColor()"
  >
    <slot />
  </SliderHueRoot>
</template>

<style scoped></style>
