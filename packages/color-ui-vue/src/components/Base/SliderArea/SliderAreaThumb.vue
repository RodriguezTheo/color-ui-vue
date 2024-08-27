<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type SliderAreaThumbProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { Primitive, useForwardExpose } from "radix-vue";
import { injectSliderAreaRootContext } from "@/components/Base/SliderArea/context";
import { onMounted } from "vue";

const rootContext = injectSliderAreaRootContext();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const { onDown, onUp, onArrowKeyDown, onArrowKeyUp } = rootContext.events();

const props = withDefaults(defineProps<SliderAreaThumbProps>(), {
  as: "span"
});

onMounted(() => {
  rootContext.thumbElement.value = thumbElement.value;
});
</script>

<template>
  <Primitive
    v-bind="props"
    role="slider"
    :ref="forwardRef"
    :aria-disabled="rootContext.disabled.value"
    :data-disabled="rootContext.disabled.value"
    :aria-valuemin="rootContext.min.value.toString()"
    :data-orientation="rootContext.orientation.value"
    :aria-valuemax="rootContext.max.value.toString()"
    :aria-valuenow="rootContext.modelValue.value.toString()"
    :tabindex="rootContext.disabled.value ? -1 : 0"
    :style="`position: absolute; transform: translate(-50%, -50%); left: ${rootContext.modelValue.value[0]}%; top: ${rootContext.modelValue.value[1]}%; z-index: 1;`"
    @mousedown="onDown"
    @mouseup="
      () => {
        onUp();
        rootContext.onChangeComplete();
      }
    "
    @touchstart="onDown"
    @touchend="
      () => {
        onUp();
        rootContext.onChangeComplete();
      }
    "
    @keydown="onArrowKeyDown"
    @keyup="onArrowKeyUp"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
