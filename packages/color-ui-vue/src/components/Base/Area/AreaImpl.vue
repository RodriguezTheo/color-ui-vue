<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type AreaImplEmits = {
  slideStart: [event: PointerEvent];
  slideMove: [event: PointerEvent];
  slideEnd: [event: PointerEvent];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent];
};

export interface AreaImplProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectAreaRootContext } from "@/components/Base/Area/context";
import { Primitive } from "radix-vue";
import { ARROW_KEYS, PAGE_KEYS } from "@/components/Base/Area/utils";

const props = withDefaults(defineProps<AreaImplProps>(), {
  as: "div"
});
const emits = defineEmits<AreaImplEmits>();
const rootContext = injectAreaRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    @keydown="
      (event) => {
        if (event.key === 'Home') {
          emits('homeKeyDown', event);
          event.preventDefault();
        } else if (event.key === 'End') {
          emits('endKeyDown', event);
          event.preventDefault();
        } else if ([...PAGE_KEYS, ...ARROW_KEYS].includes(event.key)) {
          emits('stepKeyDown', event);
          event.preventDefault();
        }
      }
    "
    @pointerdown="
      (event) => {
        const target = event.target as HTMLElement;
        target.setPointerCapture(event.pointerId);
        // Prevent browser focus behaviour because we focus a thumb manually when values change.
        event.preventDefault();
        // Touch devices have a delay before focusing so won't focus if touch immediately moves
        // away from target (sliding). We want thumb to focus regardless.
        if (rootContext.thumbElements.value.includes(target)) {
          target.focus();
        } else {
          emits('slideStart', event);
        }
      }
    "
    @pointermove="
      (event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          emits('slideMove', event);
        }
      }
    "
    @pointerup="
      (event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
          emits('slideEnd', event);
        }
      }
    "
    :style="{
      position: 'relative'
    }"
  >
    <slot />
  </Primitive>
</template>
