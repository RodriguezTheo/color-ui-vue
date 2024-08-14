<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiRenderBackgroundProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { RenderBackground } from "@/components/Base/Render";
const props = withDefaults(defineProps<PickerUiRenderBackgroundProps>(), {
  as: "span"
});
</script>

<template>
  <RenderBackground :as="props.as" :as-child="props.asChild">
    <slot />
  </RenderBackground>
</template>

<style scoped></style>
