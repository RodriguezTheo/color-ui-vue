<script lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { ModeInput } from "@/shared/types";
import type { Ref } from "vue";

export type PickerUiModeItemProps = PrimitiveProps & {
  /** Mode input value */
  value: ModeInput;
  disabled?: boolean;
};

export type PickerUiModeItemProvider = {
  id: string;
  value: ModeInput;
  updateInput: (event: Event) => void;
  modelValue: Ref<number | string>;
  disabled: Ref<boolean | undefined>;
};
</script>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { makeContentId } from "@/components/PickerUi/PickerUiMode/utils";
import {
  injectPickerUiModeRootContext,
  providePickerUiModeItemContext
} from "@/components/PickerUi/PickerUiMode/context";
import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<PickerUiModeItemProps>(), {
  as: "div"
});

const rootContext = injectPickerUiRootContext();
const modeContext = injectPickerUiModeRootContext();

const { disabled } = toRefs(props);

const allowedAlpha = computed(() => {
  return props.value === "a" ? rootContext.allowedAlpha.value : true;
});

const modelValue = ref<number | string>(rootContext.inputs.value[props.value]);

const updateInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  rootContext.updateInputs(value, props.value);
};

const contentId = computed(() => {
  return `${makeContentId(rootContext.containerId, props.value)}-item`;
});

watch(
  () => rootContext.inputs.value[props.value],
  (value) => {
    modelValue.value = value;
  }
);

providePickerUiModeItemContext({
  id: contentId.value,
  value: props.value,
  updateInput,
  modelValue,
  disabled: modeContext.disabled || disabled
});
</script>

<template>
  <Primitive v-if="allowedAlpha" :as="props.as" :as-child="props.asChild">
    <slot
      :itemId="contentId"
      :value="modelValue"
      :componentField="{ value: modelValue, onInput: updateInput, id: contentId }"
    />
  </Primitive>
</template>

<style scoped></style>
