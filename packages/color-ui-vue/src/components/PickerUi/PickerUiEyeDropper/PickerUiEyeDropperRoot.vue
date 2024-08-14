<script lang="ts">
export type PickerUiEyeDropperRootProps = {
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { EyeDropperRoot } from "@/components/Base/EyeDropper";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { ref } from "vue";

const props = defineProps<PickerUiEyeDropperRootProps>();

const rootContext = injectPickerUiRootContext();

const modelValue = ref<string | null>(null);
</script>

<template>
  <EyeDropperRoot
    v-model="modelValue"
    output-format="hex"
    :disabled="props.disabled"
    @change="
      (value) => {
        rootContext.updateEyeDropper(value as string);
      }
    "
  >
    <slot />
  </EyeDropperRoot>
</template>

<style scoped></style>
