<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderMainRootProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { AreaRoot } from "@/components/Base/Area";
import { computed } from "vue";

const props = withDefaults(defineProps<PickerUiSliderMainRootProps>(), {
  disabled: false
});

const backgroundColor = computed(() => {
  const color = rootContext.color.value;
  return `background:linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0)), linear-gradient(to top, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0]}, ${color[1]}, ${color[2]})); position: relative;`;
});

const rootContext = injectPickerUiRootContext();
</script>

<template>
  <AreaRoot
    v-bind="props"
    v-model="rootContext.positionsMain.value"
    @update:model-value="() => rootContext.updateColorSelected()"
    :style="backgroundColor"
    :dir="rootContext.dir.value"
    :min="[0, 0]"
    :max="[100, 100]"
    @value-commit="() => rootContext.onChangeComplete()"
  >
    <slot />
  </AreaRoot>
</template>

<style scoped></style>
