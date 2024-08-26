<script lang="ts">
import type { Orientation } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type PickerUiSliderAlphaRootProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: Orientation;
};
</script>

<script setup lang="ts">
import SliderAlphaRoot from "@/components/Base/SliderAlpha/SliderAlphaRoot.vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";

const props = withDefaults(defineProps<PickerUiSliderAlphaRootProps>(), {
  orientation: "horizontal",
  hideBackground: false,
  asChild: false,
  as: "div"
});

const rootContext = injectPickerUiRootContext();
</script>

<template>
  <SliderAlphaRoot
    v-if="rootContext.allowedAlpha.value"
    v-model="rootContext.positionAlpha.value"
    :color="rootContext.color.value"
    :disabled="props.disabled"
    :orientation="props.orientation"
    :as="props.as"
    :as-child="props.asChild"
    :max="1"
    :min="0"
    :step="0.01"
    :dir="rootContext.dir.value"
    @update:model-value="rootContext.updateAlpha()"
    @on-change-complete="() => rootContext.onChangeComplete()"
  >
    <slot />
  </SliderAlphaRoot>
</template>

<style scoped></style>
