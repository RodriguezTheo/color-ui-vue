<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export interface AreaThumbImplProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useMounted } from "@vueuse/core";

import { convertValueToPercentage } from "./utils";
import { injectAreaRootContext } from "@/components/Base/Area/context";
import { useForwardExpose, Primitive } from "radix-vue";

defineOptions({
  inheritAttrs: false
});

defineProps<AreaThumbImplProps>();

const rootContext = injectAreaRootContext();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const value = computed(() => rootContext.modelValue?.value);
const percent = computed(() => {
  const min = [rootContext.minX.value ?? 0, rootContext.minY.value ?? 0];
  const max = [rootContext.maxX.value ?? 0, rootContext.maxY.value ?? 0];

  if (value.value === undefined) {
    return [0, 0];
  }
  return convertValueToPercentage(value.value, min, max);
});

const isMounted = useMounted();

onMounted(() => {
  rootContext.thumbElements.value.push(thumbElement.value);
});
onUnmounted(() => {
  const i = rootContext.thumbElements.value.findIndex((i) => i === thumbElement.value) ?? -1;
  rootContext.thumbElements.value.splice(i, 1);
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :ref="forwardRef"
    role="slider"
    :tabindex="rootContext.disabled.value ? undefined : 0"
    :aria-label="$attrs['aria-label']"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    data-orientation="horizontal"
    :aria-valuenow="value"
    :aria-valuemin="[rootContext.minX.value, rootContext.minY.value]"
    :aria-valuemax="[rootContext.maxX.value, rootContext.maxY.value]"
    aria-orientation="horizontal"
    :as-child="asChild"
    :as="as"
    :style="{
      transform: 'var(--color-ui-area-thumb-transform)',
      position: 'absolute',
      top: `${percent[1]}%`,
      left: `${percent[0]}%`,
      display: !isMounted && value === undefined ? 'none' : undefined
    }"
  >
    <slot />
  </Primitive>
</template>
