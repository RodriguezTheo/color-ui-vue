<script lang="ts">
import type { Mode } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type PickerUiModeContentProps = PrimitiveProps & {
  /** The mode of the color picker. */
  value: Mode;
};
</script>

<script setup lang="ts">
import { computed, nextTick } from "vue";
import { injectPickerUiModeRootContext } from "@/components/PickerUi/PickerUiMode/context";
import { makeContentId, makeTriggerId } from "@/components/PickerUi/PickerUiMode/utils";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { Primitive, useForwardExpose } from "radix-vue";

const props = withDefaults(defineProps<PickerUiModeContentProps>(), {
  as: "div"
});

const rootContext = injectPickerUiRootContext();
const modeRootContext = injectPickerUiModeRootContext();

const triggerId = computed(() => makeTriggerId(rootContext.containerId, props.value));
const contentId = computed(() => makeContentId(rootContext.containerId, props.value));

const isSelected = computed(() => props.value === modeRootContext.mode.value);

const { forwardRef } = useForwardExpose();

const keyEvents = (event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    modeRootContext.onSwitchMode(1);
  } else if (event.key === "ArrowLeft") {
    modeRootContext.onSwitchMode(-1);
  }

  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    nextTick(() => {
      const tabs = Array.from(document.querySelectorAll("[role=tabpanel]"));
      const activeTab = tabs.find((tab) => tab.getAttribute("data-state") === "active");
      if (!activeTab) return;
      (activeTab as HTMLElement).focus();
    });
  }
};
</script>

<template>
  <Primitive
    :id="contentId"
    :ref="forwardRef"
    :as-child="props.asChild"
    :as="props.as"
    role="tabpanel"
    tabindex="0"
    :data-state="isSelected ? 'active' : 'inactive'"
    :data-orientation="modeRootContext.orientation.value"
    :aria-labelledby="triggerId"
    @keydown="keyEvents"
    :hidden="!isSelected"
  >
    <slot v-if="isSelected" :value="value" />
  </Primitive>
</template>

<style scoped></style>
