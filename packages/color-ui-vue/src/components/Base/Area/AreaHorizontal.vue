<script setup lang="ts">
import AreaImpl from "@/components/Base/Area/AreaImpl.vue";
import type { Direction } from "@/shared";
import {
  type AreaOrientationPrivateEmits,
  type AreaOrientationPrivateProps,
  BACK_KEYS,
  linearScale
} from "@/components/Base/Area/utils";
import { toRefs, ref, computed } from "vue";
import { useForwardExpose } from "radix-vue";

type AreaHorizontalProps = AreaOrientationPrivateProps & {
  dir?: Direction;
};

const props = defineProps<AreaHorizontalProps>();
const emits = defineEmits<AreaOrientationPrivateEmits>();

const { dir, maxY, maxX, minY, minX } = toRefs(props);

const { forwardRef, currentElement: sliderEl } = useForwardExpose();
const rectRef = ref<ClientRect>();
const isSlidingFromLeft = computed(() => dir?.value === "ltr");

function getValueFromPointer(pointerPosition: number[]) {
  const rect = rectRef.value || sliderEl.value!.getBoundingClientRect();
  const inputX: [number, number] = [0, rect.width];
  const inputY: [number, number] = [0, rect.height];
  const outputX: [number, number] = isSlidingFromLeft.value
    ? [minX.value, maxX.value]
    : [maxX.value, minX.value];
  const outputY: [number, number] = [minY.value, maxY.value];
  const valueX = linearScale(inputX, outputX);

  const valueY = linearScale(inputY, outputY);

  rectRef.value = rect;

  return [valueX(pointerPosition[0] - rect.left), valueY(pointerPosition[1] - rect.top)];
}
</script>

<template>
  <AreaImpl
    :ref="forwardRef"
    :dir="dir"
    data-orientation="horizontal"
    :style="{
      ['--color-ui-area-thumb-transform' as any]: 'translateX(-50%) translateY(-50%)'
    }"
    @slide-start="
      (event) => {
        const value = getValueFromPointer([event.clientX, event.clientY]);
        event.preventDefault();
        emits('slideStart', value);
      }
    "
    @slide-move="
      (event) => {
        const value = getValueFromPointer([event.clientX, event.clientY]);
        event.preventDefault();
        emits('slideMove', value);
      }
    "
    @slide-end="
      () => {
        rectRef = undefined;
        emits('slideEnd');
      }
    "
    @home-key-down="emits('homeKeyDown', $event)"
    @end-key-down="emits('endKeyDown', $event)"
    @step-key-down="
      (event) => {
        const slideDirection = isSlidingFromLeft ? 'from-left' : 'from-right';
        const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
        const isShiftKey = event.shiftKey;
        const isXAxis =
          ['ArrowLeft', 'ArrowRight'].includes(event.key) ||
          (['PageUp', 'PageDown'].includes(event.key) && isShiftKey);
        const isYAxis =
          ['ArrowUp', 'ArrowDown'].includes(event.key) ||
          (['PageUp', 'PageDown'].includes(event.key) && !isShiftKey);
        if (isXAxis) {
          emits('stepKeyDown', event, isBackKey ? -1 : 1, 'x');
        } else if (isYAxis) {
          emits('stepKeyDown', event, isBackKey ? -1 : 1, 'y');
        }
      }
    "
  >
    <slot />
  </AreaImpl>
</template>

<style scoped></style>
