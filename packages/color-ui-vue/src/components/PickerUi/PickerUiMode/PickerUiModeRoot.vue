<script lang="ts">
import type { Ref } from "vue";
import type { AcceptedMode, Orientation } from "@/shared/types";
import type { PrimitiveProps } from "radix-vue";

export type PickerUiModeRootProps = PrimitiveProps & {
  /** The orientation of the tab mode. */
  orientation?: Orientation;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
};

export type PickerUiModeRootProvider = {
  mode: Ref<AcceptedMode>;
  acceptedModes: Ref<AcceptedMode[]>;
  allowedAlpha: Ref<boolean>;
  orientation: Ref<Orientation>;
  disabled: Ref<boolean>;
  onSwitchMode: (next?: number) => void;
};
</script>

<script setup lang="ts">
import { injectPickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import { providePickerUiModeRootContext } from "@/components/PickerUi/PickerUiMode/context";
import { Primitive } from "radix-vue";
import { toRefs } from "vue";

const props = withDefaults(defineProps<PickerUiModeRootProps>(), {
  orientation: "horizontal",
  disabled: false,
  as: "div"
});

const rootContext = injectPickerUiRootContext();

const onSwitchMode = (next: number = 1) => {
  const modeLength = rootContext.acceptedMode.value.length;
  const index = rootContext.acceptedMode.value.findIndex((mode) => mode === rootContext.mode.value);

  let nextIndex = (index + next + modeLength) % modeLength;

  rootContext.mode.value = rootContext.acceptedMode.value[nextIndex];
};

const { disabled, orientation } = toRefs(props);

providePickerUiModeRootContext({
  mode: rootContext.mode,
  acceptedModes: rootContext.acceptedMode,
  allowedAlpha: rootContext.allowedAlpha,
  orientation,
  disabled,
  onSwitchMode
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :dir="rootContext.dir.value"
    :data-state="rootContext.mode.value"
    :data-disabled="props.disabled ? '' : undefined"
    :data-orientation="props.orientation"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
