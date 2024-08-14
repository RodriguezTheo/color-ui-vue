<script lang="ts">
import type { EyeDropperTriggerProps } from "@/components/Base/EyeDropper";

export type PickerUiEyeDropperTriggerProps = EyeDropperTriggerProps & {};
</script>

<script setup lang="ts">
import { EyeDropperTrigger } from "@/components/Base/EyeDropper";

const props = defineProps<PickerUiEyeDropperTriggerProps>();
</script>

<template>
  <EyeDropperTrigger :as="props.as" :as-child="props.asChild" :disabled="props.disabled">
    <slot />
  </EyeDropperTrigger>
</template>

<style scoped></style>
