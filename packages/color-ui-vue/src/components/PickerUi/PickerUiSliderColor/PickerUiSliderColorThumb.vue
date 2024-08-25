<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderColorThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import SliderHueThumb from "@/components/Base/SliderHue/SliderHueThumb.vue";

const props = withDefaults(defineProps<PickerUiSliderColorThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderHueThumb v-bind="props">
    <slot />
  </SliderHueThumb>
</template>

<style scoped></style>
