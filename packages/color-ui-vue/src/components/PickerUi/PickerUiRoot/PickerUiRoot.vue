<script lang="ts">
import type {
  AcceptedMode,
  ColorFormat,
  ColorSelected,
  Direction,
  InputColor,
  ModeInput,
  Positions,
  RGBA
} from "@/shared/types";
import type { Ref } from "vue";
import type { PrimitiveProps } from "radix-vue";

export type PickerUiRootProps = PrimitiveProps & {
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
  /**
   * Options
   * @defaultValue {historyLimit: 8, defaultHistory: [{ color: number[], alpha: number }]}
   */
  options?: {
    historyLimit?: number;
    historyDefault?: { color: number[]; alpha: number }[];
  };
  histories?: { color: number[]; alpha: number }[];
  modelValue?: ColorSelected;
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
  color: Ref<number[]>;
  updateColorSelected: () => void;
  updateColor: () => void;
  colorSelected: Ref<number[]>;
  mode: Ref<AcceptedMode>;
  inputs: Ref<InputColor>;
  updateInputs: (value: string | number, mode: ModeInput) => void;
  colorFormat: Ref<ColorFormat>;
  updateEyeDropper: (value: string) => void;
  setColor: (color: RGBA) => void;
  histories: Ref<{ color: number[]; alpha: number }[]>;
  history: () => {
    remove: (props: { color: number[]; alpha: number }) => void;
    create: (props: { color: number[]; alpha: number }) => void;
    clear: () => void;
    init: () => void;
  };
};
</script>
<script setup lang="ts">
import { computed, onMounted, toRefs, watch } from "vue";
import { providePickerUiRootContext } from "@/components/PickerUi/PickerUiRoot/context";
import usePickerUi from "@/components/PickerUi/composables/usePickerUi";
import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<PickerUiRootProps>(), {
  as: "div",
  orientation: "horizontal",
  dir: "ltr",
  acceptedMode: () => ["rgb", "hsl", "hex"],
  allowedAlpha: false,
  colorFormat: "rgb",
  defaultValue: () => ({ r: 255, g: 0, b: 0 })
});

const vModel = defineModel<ColorSelected>();
const vHistories = defineModel<{ color: number[]; alpha: number }[]>("histories");

const { allowedAlpha, acceptedMode, colorFormat, dir, options } = toRefs(props);

const opt = computed(() => {
  return {
    allowedAlpha: allowedAlpha.value,
    colorFormat: colorFormat.value,
    acceptedMode: acceptedMode.value,
    ...options.value
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
  id,
  setColor,
  histories,
  history
} = usePickerUi(vModel, vHistories, opt, props.defaultValue);

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
  updateEyeDropper,
  setColor,
  history,
  histories
});

watch(histories, () => {
  vHistories.value = histories.value;
});

onMounted(() => {
  if (!vModel.value) {
    vModel.value = props.defaultValue;
  }
});
</script>

<template>
  <Primitive v-bind="$attrs" :as="props.as" :as-child="props.asChild">
    <slot />
  </Primitive>
</template>

<style scoped></style>
