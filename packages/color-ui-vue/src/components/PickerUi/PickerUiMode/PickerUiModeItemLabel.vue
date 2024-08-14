<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiModeItemLabelProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { Label } from "radix-vue";
import { injectPickerUiModeItemContext } from "@/components/PickerUi/PickerUiMode/context";

const props = withDefaults(defineProps<PickerUiModeItemLabelProps>(), {
  as: "label"
});

const modeItemContext = injectPickerUiModeItemContext();
</script>

<template>
  <Label :as="props.as" :as-child="props.asChild" :for="modeItemContext.id">
    <slot />
  </Label>
</template>

<style scoped></style>
