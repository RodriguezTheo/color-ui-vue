<script lang="ts">
import type { SliderAlphaThumbProps } from "@/components/Base/SliderAlpha";

export type PickerUiSliderAlphaThumbProps = SliderAlphaThumbProps & {};
</script>

<script setup lang="ts">
import SliderAlphaThumb from "@/components/Base/SliderAlpha/SliderAlphaThumb.vue";

const props = withDefaults(defineProps<PickerUiSliderAlphaThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderAlphaThumb v-bind="props">
    <slot />
  </SliderAlphaThumb>
</template>

<style scoped></style>
