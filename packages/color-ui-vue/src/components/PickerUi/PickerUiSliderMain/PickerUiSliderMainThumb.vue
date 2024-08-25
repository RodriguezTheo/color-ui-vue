<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderMainThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { SliderAreaThumb } from "@/components/Base/SliderArea";

const props = withDefaults(defineProps<PickerUiSliderMainThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderAreaThumb v-bind="props">
    <slot />
  </SliderAreaThumb>
</template>

<style scoped></style>
