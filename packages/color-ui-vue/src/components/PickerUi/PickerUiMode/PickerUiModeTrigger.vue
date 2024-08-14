<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type PickerUiModeTriggerProps = PrimitiveProps & {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { injectPickerUiModeRootContext } from "@/components/PickerUi/PickerUiMode/context";
import { Primitive, useForwardExpose } from "radix-vue";
import { makeContentId, makeTriggerId } from "@/components/PickerUi/PickerUiMode/utils";

const props = withDefaults(defineProps<PickerUiModeTriggerProps>(), {
  as: "button"
});

const rootContext = injectPickerUiRootContext();
const modeRootContext = injectPickerUiModeRootContext();

const { forwardRef } = useForwardExpose();

const triggerId = computed(() => {
  return makeTriggerId(rootContext.containerId, modeRootContext.mode.value);
});

const contentId = computed(() =>
  makeContentId(rootContext.containerId, modeRootContext.mode.value)
);
</script>

<template>
  <Primitive
    :id="triggerId"
    :ref="forwardRef"
    role="tab"
    :type="props.as === 'button' ? 'button' : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :aria-selected="true"
    data-state="active"
    :aria-controls="contentId"
    :disabled="props.disabled"
    :data-disabled="props.disabled ? '' : undefined"
    :data-orientation="modeRootContext.orientation.value"
    @mousedown.left="
      (event: Event) => {
        if (!modeRootContext.disabled.value) {
          modeRootContext.onSwitchMode();
        } else {
          event.preventDefault();
        }
      }
    "
    @keydown.enter.space="
      (event: Event) => {
        if (!modeRootContext.disabled.value) {
          modeRootContext.onSwitchMode();
        } else {
          event.preventDefault();
        }
      }
    "
  >
    <slot :mode="modeRootContext.mode.value" />
  </Primitive>
</template>

<style scoped></style>
