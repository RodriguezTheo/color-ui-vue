<script lang="ts">
import type { PrimitiveProps } from "radix-vue";
export type PickerUiModeItemInputProps = PrimitiveProps & {
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { injectPickerUiModeItemContext } from "@/components/PickerUi/PickerUiMode/context";
import { Primitive } from "radix-vue";
import { computed } from "vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";

const props = withDefaults(defineProps<PickerUiModeItemInputProps>(), {
  as: "input"
});

const rootContext = injectPickerUiRootContext();

const maxLength = computed(() => {
  if (modeItemContext.value === "hex" && rootContext.allowedAlpha.value) {
    return 9;
  } else if (modeItemContext.value === "hex" && !rootContext.allowedAlpha.value) {
    return 7;
  } else if (modeItemContext.value !== "a") {
    return 3;
  }
  return undefined;
});

const modeItemContext = injectPickerUiModeItemContext();
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :id="modeItemContext.id"
    :type="modeItemContext.value === 'a' ? 'number' : 'text'"
    :min="modeItemContext.value === 'a' ? 0 : undefined"
    :max="modeItemContext.value === 'a' ? 1 : undefined"
    :step="modeItemContext.value === 'a' ? 0.01 : undefined"
    :disabled="modeItemContext.disabled.value || props.disabled"
    :aria-disabled="modeItemContext.disabled.value || props.disabled"
    :maxLength="maxLength"
    @input="modeItemContext.updateInput"
    :value="modeItemContext.modelValue.value"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
