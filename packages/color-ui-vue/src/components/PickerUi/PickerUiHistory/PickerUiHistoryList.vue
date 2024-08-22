<script lang="ts">
import type { PrimitiveProps } from "radix-vue";
export type PickerUiHistoryListProps = PrimitiveProps & {};
</script>

<script setup lang="ts">
import { Primitive } from "radix-vue";
import { injectPickerUiHistoryRootContext } from "@/components/PickerUi/PickerUiHistory/context";

const props = withDefaults(defineProps<PickerUiHistoryListProps>(), {
  as: "div",
  asChild: false
});

const historyRootContext = injectPickerUiHistoryRootContext();
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :data-disabled="historyRootContext.disabled.value ? true : undefined"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
