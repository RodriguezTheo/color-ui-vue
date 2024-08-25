<script lang="ts">
import type { Ref } from "vue";

export type PickerUiHistoryRootProps = {
  /** When `true`, prevents the user from interacting with list item. */
  disabled?: boolean;
  /** When `true`, hides the background of the list item. */
  hideBackground?: boolean;
};

export type PickerUiHistoryRootProvider = {
  disabled: Ref<boolean>;
  hideBackground: Ref<boolean>;
};
</script>

<script setup lang="ts">
import { providePickerUiHistoryContext } from "@/components/PickerUi/PickerUiHistory/context";
import { onMounted, toRefs, watch } from "vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { useDebounceFn } from "@vueuse/core";

const props = withDefaults(defineProps<PickerUiHistoryRootProps>(), {
  disabled: false,
  hideBackground: false
});

const rootContext = injectPickerUiRootContext();

const { disabled, hideBackground } = toRefs(props);

providePickerUiHistoryContext({
  disabled,
  hideBackground
});

onMounted(() => {
  rootContext.history().init();
});

let isInitial = true;
const debouncedUpdateHistory = useDebounceFn((newColor) => {
  rootContext.history().create({ color: newColor.color, alpha: newColor.alpha });
}, 1000);

watch([rootContext.colorSelected, rootContext.alpha], () => {
  if (isInitial) {
    isInitial = false;
    return;
  }
  const data = {
    color: rootContext.colorSelected.value,
    alpha: rootContext.alpha.value
  };
  debouncedUpdateHistory(data);
});
</script>

<template>
  <slot />
</template>

<style scoped></style>
