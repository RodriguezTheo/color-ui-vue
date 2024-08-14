<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiRenderRootProps = PrimitiveProps & {
  hideBackground?: boolean;
};
</script>

<script setup lang="ts">
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { RenderRoot } from "@/components/Base/Render";
import { useClipboard } from "@vueuse/core";

const props = withDefaults(defineProps<PickerUiRenderRootProps>(), {
  hideBackground: false,
  as: "div"
});

const { copy, isSupported } = useClipboard();

const rootContext = injectPickerUiRootContext();

const copyHexColor = async () => {
  if (!isSupported.value) return;
  const hex = rootContext.inputs.value.hex;
  await copy(hex);
};
</script>

<template>
  <RenderRoot
    v-bind="props"
    :color="rootContext.colorSelected.value"
    :alpha="rootContext.alpha.value"
    @click="copyHexColor"
  >
    <slot />
  </RenderRoot>
</template>

<style scoped></style>
