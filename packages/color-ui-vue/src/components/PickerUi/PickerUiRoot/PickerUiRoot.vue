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
  /**
   * The model value histories of the color picker.
   */
  histories?: { color: number[]; alpha: number }[];
  /**
   * The model value of the color picker.
   * Check [useFormatColor](https://color-ui-vue.vercel.app/docs/utilities/use-format-color.html) for type declarations.
   */
  modelValue?: ColorSelected;
};

export type PickerUiRootEmits = {
  /**
   * Event handler called when the color selected change
   */
  "update:modelValue": [payload: ColorSelected];
  /**
   * Event handler called when the histories change
   */
  "update:histories": [payload: { color: number[]; alpha: number }[]];
  /**
   * Event handler called when the color selected change is completed
   */
  onChangeComplete: [payload: ColorSelected];
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
  onChangeComplete: () => void;
};
</script>
<script setup lang="ts">
import { computed, toRefs } from "vue";
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

const emits = defineEmits<PickerUiRootEmits>();

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

const onChangeComplete = () => {
  if (vModel.value) {
    emits("onChangeComplete", vModel.value);
  }

  const data = {
    color: colorSelected.value,
    alpha: alpha.value
  };

  history().create(data);
  vHistories.value = histories.value;
};

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
  histories,
  onChangeComplete
});
</script>

<template>
  <Primitive v-bind="$attrs" :as="props.as" :as-child="props.asChild">
    <slot />
  </Primitive>
</template>

<style scoped></style>
