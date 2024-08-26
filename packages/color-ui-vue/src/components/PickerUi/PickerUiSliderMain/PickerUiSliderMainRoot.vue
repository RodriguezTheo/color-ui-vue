<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderMainRootProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: "horizontal" | "vertical";
};
</script>

<script setup lang="ts">
import { SliderAreaRoot } from "@/components/Base/SliderArea";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";

const props = withDefaults(defineProps<PickerUiSliderMainRootProps>(), {
  disabled: false,
  orientation: "horizontal"
});

const rootContext = injectPickerUiRootContext();
</script>

<template>
  <SliderAreaRoot
    v-bind="props"
    v-model="rootContext.positionsMain.value"
    @update:model-value="() => rootContext.updateColorSelected()"
    :color="rootContext.color.value"
    :dir="rootContext.dir.value"
    :min="[0, 0]"
    :max="[100, 100]"
    @on-change-complete="() => rootContext.onChangeComplete()"
  >
    <slot />
  </SliderAreaRoot>
</template>

<style scoped></style>
