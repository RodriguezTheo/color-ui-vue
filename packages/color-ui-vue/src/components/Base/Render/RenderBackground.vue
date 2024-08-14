<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type RenderBackgroundProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { injectRenderRootContext } from "@/components/Base/Render/context";
import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<RenderBackgroundProps>(), {
  as: "span"
});

const renderRootContext = injectRenderRootContext();
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :style="[
      `border-radius: inherit;`,
      `background: rgba(${renderRootContext.color.value[0]}, ${renderRootContext.color.value[1]}, ${renderRootContext.color.value[2]}, ${renderRootContext.alpha.value});`,
      'position: absolute; inset: 0;'
    ]"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
