<script lang="ts">
import type { Orientation } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderColorRootProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
};
</script>

<script setup lang="ts">
import SliderHueRoot from "@/components/Base/SliderHue/SliderHueRoot.vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";

const props = defineProps<PickerUiSliderColorRootProps>();

const rootContext = injectPickerUiRootContext();
</script>

<template>
  <SliderHueRoot
    v-bind="props"
    v-model="rootContext.positionColor.value"
    :dir="rootContext.dir.value"
    @update:modelValue="rootContext.updateColor()"
    @on-change-complete="() => rootContext.onChangeComplete()"
  >
    <slot />
  </SliderHueRoot>
</template>

<style scoped></style>
