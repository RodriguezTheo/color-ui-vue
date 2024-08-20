<script lang="ts"></script>

<script setup lang="ts">
import { injectSliderAreaRootContext } from "@/components/Base/SliderArea/context";

const rootContext = injectSliderAreaRootContext();
const { onDown, onUp, onArrowKeyDown, onArrowKeyUp } = rootContext.events();
</script>

<template>
  <span
    role="slider"
    :ref="rootContext.thumbElement"
    :aria-disabled="rootContext.disabled.value"
    :data-disabled="rootContext.disabled.value"
    :aria-valuemin="rootContext.min.value.toString()"
    :data-orientation="rootContext.orientation.value"
    :aria-valuemax="rootContext.max.value.toString()"
    :aria-valuenow="rootContext.modelValue.value.toString()"
    :tabindex="rootContext.disabled.value ? -1 : 0"
    :style="`position: absolute; transform: translate(-50%, -50%); left: ${rootContext.modelValue.value[0]}%; top: ${rootContext.modelValue.value[1]}%; z-index: 1;`"
    @mousedown="onDown"
    @mouseup="onUp"
    @touchstart="onDown"
    @touchend="onUp"
    @keydown="onArrowKeyDown"
    @keyup="onArrowKeyUp"
  />
</template>

<style scoped></style>
