<script lang="ts">
import type { Ref } from "vue";
import type { PrimitiveProps } from "radix-vue";
import type { Orientation } from "@/shared";

export type SliderUiSwatchListProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the list. */
  disabled?: boolean;
  /**
   * The orientation of the swatch list.
   */
  orientation?: Orientation;
};

export type SliderUiSwatchRootProvider = {
  disabled: Ref<boolean>;
};
</script>

<script setup lang="ts">
import { Primitive } from "radix-vue";
import { provideSliderUiSwatchContext } from "@/components/SliderUi/SliderUiSwatch/context";
import { computed, toRefs } from "vue";
import { injectSliderUiRootContext } from "@/components/SliderUi/SliderUiRoot/context";

const props = withDefaults(defineProps<SliderUiSwatchListProps>(), {
  as: "div",
  orientation: "horizontal"
});

const { disabled } = toRefs(props);

const rootContext = injectSliderUiRootContext();

const dataOrientation = computed(() => {
  return rootContext.orientation.value || props.orientation;
});

provideSliderUiSwatchContext({
  disabled
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :data-disabled="props.disabled ? true : undefined"
    :data-orientation="dataOrientation"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
