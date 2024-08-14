<script lang="ts">
import type {
  AcceptedMode,
  ColorFormat,
  ColorSelected,
  Direction,
  InputColor,
  ModeInput,
  Positions
} from "@/shared/types";
import type { Ref } from "vue";

export type PickerUiRootProps = {
  /**
   * The reading direction of Color Ui when applicable. <br> If omitted assumes LTR (left-to-right) reading mode.
   * @defaultValue "ltr"
   */
  dir?: Direction;
  /** The accepted color mode
   * @defaultValue ["rgb", "hsl", "hex"]
   * */
  acceptedMode?: AcceptedMode[];
  /** Format modelValue
   * If alpha is `true`, the default value is `rgba` otherwise `rgb`
   * @defaultValue "rgba" | "rgb"
   */
  colorFormat?: ColorFormat;
  /** When `true`, allows the user to set the alpha channel.
   * @defaultValue false
   */
  allowedAlpha?: boolean;
  /** The default value of the color picker
   * @defaultValue { r: 255, g: 0, b: 0 }
   */
  defaultValue?: ColorSelected;
};

export type PickerUiRootProvider = {
  dir: Ref<Direction>;
  containerId: string;
  acceptedMode: Ref<AcceptedMode[]>;
  positionsMain: Ref<Positions>;
  allowedAlpha: Ref<boolean>;
  alpha: Ref<number>;
  updateAlpha: () => void;
  positionAlpha: Ref<number>;
  positionColor: Ref<number>;
  color: Ref<[number, number, number]>;
  updateColorSelected: () => void;
  updateColor: () => void;
  colorSelected: Ref<number[]>;
  mode: Ref<AcceptedMode>;
  inputs: Ref<InputColor>;
  updateInputs: (value: string | number, mode: ModeInput) => void;
  colorFormat: Ref<ColorFormat>;
  updateEyeDropper: (value: string) => void;
};
</script>
<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
import { providePickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import usePickerUi from "@/components/PickerUi/composables/usePickerUi";

const props = withDefaults(defineProps<PickerUiRootProps>(), {
  orientation: "horizontal",
  dir: "ltr",
  acceptedMode: () => ["rgb", "hsl", "hex"],
  allowedAlpha: false,
  colorFormat: "rgb",
  defaultValue: () => ({ r: 255, g: 0, b: 0 })
});

const vModel = defineModel<ColorSelected>();

const { allowedAlpha, acceptedMode, colorFormat, dir } = toRefs(props);

const options = computed(() => {
  return {
    allowedAlpha: allowedAlpha.value,
    colorFormat: colorFormat.value,
    acceptedMode: acceptedMode.value
  };
});

const {
  color,
  updateColor,
  positionColor,
  alpha,
  updateAlpha,
  positionAlpha,
  colorSelected,
  updateColorSelected,
  positionsMain,
  inputs,
  updateInputs,
  updateEyeDropper,
  mode,
  id
} = usePickerUi(vModel, options, props.defaultValue);

providePickerUiRootContext({
  dir,
  containerId: id,
  acceptedMode,
  positionsMain,
  positionColor,
  allowedAlpha,
  alpha,
  updateAlpha,
  positionAlpha,
  color,
  updateColor,
  colorSelected,
  updateColorSelected,
  mode,
  inputs,
  updateInputs,
  colorFormat,
  updateEyeDropper
});

onMounted(() => {
  if (!vModel.value) {
    vModel.value = props.defaultValue;
  }
});
</script>

<template>
  <slot />
</template>

<style scoped></style>
