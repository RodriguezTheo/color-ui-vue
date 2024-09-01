<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export interface AreaThumbProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import AreaThumbImpl from "./AreaThumbImpl.vue";
import { useForwardExpose } from "radix-vue";

const props = defineProps<AreaThumbProps>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <AreaThumbImpl :ref="forwardRef" v-bind="props">
    <slot />
  </AreaThumbImpl>
</template>
