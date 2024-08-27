<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type SliderUiHistoryListItemProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with list item. */
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { RenderRoot } from "@/components/Base/Render";
import { computed } from "vue";
import { injectSliderUiRootContext } from "@/components/SliderUi/SliderUiRoot/context";
import { injectSliderUiSwatchContext } from "@/components/SliderUi/SliderUiSwatch/context";

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<SliderUiHistoryListItemProps>(), {
  as: "button"
});

const rootContext = injectSliderUiRootContext();
const swatchContext = injectSliderUiSwatchContext();

const isDisabled = computed(() => {
  return props.disabled || swatchContext.disabled.value;
});
</script>

<template>
  <RenderRoot
    v-bind="{ ...props, ...$attrs }"
    v-for="(item, index) in rootContext.swatches.value"
    :key="`swatch-item-${index}-${rootContext.containerId}`"
    :color="item"
    :alpha="1"
    :disabled="props.as === 'button' && isDisabled ? true : undefined"
    :aria-disabled="props.as !== 'button' && isDisabled ? true : undefined"
    :data-disabled="isDisabled ? true : undefined"
    :type="props.as === 'button' ? 'button' : undefined"
    hide-background
    @click="
      () =>
        rootContext.setColor({
          r: item[0],
          g: item[1],
          b: item[2]
        })
    "
  >
    <slot />
  </RenderRoot>
</template>

<style scoped></style>
