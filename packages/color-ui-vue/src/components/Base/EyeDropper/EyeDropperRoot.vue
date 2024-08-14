<script lang="ts">
import type { Ref } from "vue";

export type EyeDropperRootProps = {
  disabled?: boolean;
  outputFormat: "hex" | "rgb" | "hsl";
  onChange?: (value: number[] | string) => void;
};

export type EyeDropperRootProvider = {
  disabled: Ref<boolean>;
  onChange?: (value: number[] | string) => void;
  onOpenEyeDropper: () => void;
};
</script>

<script setup lang="ts">
import { toRefs, watch } from "vue";
import { useFormatColor } from "@/shared/useConvertColor";
import { provideEyeDropperRootContext } from "@/components/Base/EyeDropper/context";
import { useEyeDropper } from "@vueuse/core";

const props = withDefaults(defineProps<EyeDropperRootProps>(), {
  onChange: () => {},
  disabled: false
});

const { isSupported, open, sRGBHex } = useEyeDropper();

const { outputFormat, disabled } = toRefs(props);

const vModel = defineModel<number[] | string | null>("modelValue", {
  required: true
});

const updateColor = (color: number[] | string) => {
  vModel.value = color;
  props.onChange(color);
};

watch(sRGBHex, (color) => {
  if (!color) return;
  if (outputFormat.value === "hex") {
    updateColor(color);
    return;
  }
  const formatedColor = useFormatColor(color, "hex", outputFormat.value);
  updateColor(formatedColor);
});

provideEyeDropperRootContext({
  disabled,
  onChange: props.onChange,
  onOpenEyeDropper: open
});
</script>

<template>
  <slot v-if="isSupported" />
</template>

<style scoped></style>
