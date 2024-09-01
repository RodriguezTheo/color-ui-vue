<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderMainThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { AreaThumb } from "@/components/Base/Area";

const props = withDefaults(defineProps<PickerUiSliderMainThumbProps>(), {
  as: "span"
});
</script>

<template>
  <AreaThumb v-bind="props">
    <slot />
  </AreaThumb>
</template>

<style scoped></style>
