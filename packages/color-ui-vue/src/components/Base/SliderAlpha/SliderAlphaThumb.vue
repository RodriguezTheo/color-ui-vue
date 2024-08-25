<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type SliderAlphaThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { SliderBackground, SliderThumb } from "@/components/Base/Slider";
import { injectSliderAlphaRootContext } from "@/components/Base/SliderAlpha/context";

defineOptions({
  inheritAttrs: false
});

const rootContext = injectSliderAlphaRootContext();

const props = withDefaults(defineProps<SliderAlphaThumbProps>(), {
  as: "span"
});
</script>

<template>
  <SliderBackground v-if="!rootContext.hideBackground.value" :style="rootContext.style.value" />
  <SliderThumb v-bind="{ ...props, ...$attrs }">
    <slot />
  </SliderThumb>
</template>

<style scoped></style>
