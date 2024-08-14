<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type EyeDropperTriggerProps = PrimitiveProps & {
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { Primitive, useForwardExpose } from "radix-vue";
import { injectEyeDropperRootContext } from "@/components/Base/EyeDropper/context";
import { computed } from "vue";

const props = withDefaults(defineProps<EyeDropperTriggerProps>(), {
  as: "button"
});

const { forwardRef } = useForwardExpose();

const disabledValue = computed(() => {
  if (props.disabled) return true;
  return rootContext.disabled.value;
});

const rootContext = injectEyeDropperRootContext();

const handleEyeDropper = () => {
  if (disabledValue.value) return;
  rootContext.onOpenEyeDropper();
};
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :disabled="disabledValue"
    :aria-disabled="disabledValue ? 'true' : undefined"
    :ref="forwardRef"
    :type="props.as === 'button' ? 'button' : undefined"
    @click="() => handleEyeDropper()"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
