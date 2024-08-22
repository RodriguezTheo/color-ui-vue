<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiHistoryListItemProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with list item. */
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { RenderRoot } from "@/components/Base/Render";
import { computed } from "vue";
import { injectPickerUiHistoryRootContext } from "@/components/PickerUi/PickerUiHistory/context";

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<PickerUiHistoryListItemProps>(), {
  as: "button"
});

const rootContext = injectPickerUiRootContext();
const historyRootContext = injectPickerUiHistoryRootContext();

const isDisabled = computed(() => {
  return props.disabled || historyRootContext.disabled.value;
});

const alphaValue = (alpha: number) => {
  return rootContext.allowedAlpha.value ? alpha : 1;
};
</script>

<template>
  <RenderRoot
    v-bind="{ ...props, ...$attrs }"
    v-for="(item, index) in rootContext.histories.value"
    :key="`history-item-${index}-${rootContext.containerId}`"
    :color="item.color"
    :alpha="alphaValue(item.alpha)"
    :disabled="props.as === 'button' && isDisabled ? true : undefined"
    :hide-background="historyRootContext.hideBackground.value"
    :aria-disabled="props.as !== 'button' && isDisabled ? true : undefined"
    :data-disabled="isDisabled ? true : undefined"
    :type="props.as === 'button' ? 'button' : undefined"
    @click="
      () =>
        rootContext.setColor({
          r: item.color[0],
          g: item.color[1],
          b: item.color[2],
          a: item.alpha
        })
    "
  >
    <slot />
  </RenderRoot>
</template>

<style scoped></style>
