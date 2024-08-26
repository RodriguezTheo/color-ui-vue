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
import { onMounted, toRefs } from "vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";

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
</script>

<template>
  <slot />
</template>

<style scoped></style>
