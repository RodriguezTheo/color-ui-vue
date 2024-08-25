<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type SliderHueThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { SliderThumb } from "@/components/Base/Slider";

const props = withDefaults(defineProps<SliderHueThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderThumb v-bind="props">
    <slot />
  </SliderThumb>
</template>

<style scoped></style>
