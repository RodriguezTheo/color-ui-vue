<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type SliderThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { SliderThumb } from "radix-vue";

const props = withDefaults(defineProps<SliderThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderThumb v-bind="props">
    <slot />
  </SliderThumb>
</template>

<style scoped></style>
