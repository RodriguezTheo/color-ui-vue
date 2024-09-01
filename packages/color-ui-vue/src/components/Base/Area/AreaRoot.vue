<script lang="ts">
import type { Ref } from "vue";
import type { PrimitiveProps } from "radix-vue";
import type { Direction } from "@/shared";

export interface AreaRootProps extends PrimitiveProps {
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number[];
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number[];
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** The minimum [X,Y] value for the range. */
  min?: number[];
  /** The maximum [X,Y] value for the range. */
  max?: number[];
}

export type AreaRootEmits = {
  /**
   * Event handler called when the slider value changes
   */
  "update:modelValue": [payload: number[] | undefined];
  /**
   * Event handler called when the value changes at the end of an interaction.
   *
   * Useful when you only need to capture a final value e.g. to update a backend service.
   */
  valueCommit: [payload: number[]];
};

export type AreaRootProvider = {
  modelValue?: Readonly<Ref<number[] | undefined>>;
  thumbElements: Ref<HTMLElement[]>;
  minX: Ref<number>;
  maxX: Ref<number>;
  minY: Ref<number>;
  maxY: Ref<number>;
  disabled: Ref<boolean>;
};
</script>

<script setup lang="ts">
import AreaHorizontal from "@/components/Base/Area/AreaHorizontal.vue";
import {
  computed,
  ref,
  toRefs,
  toRaw,
  type WritableComputedRef,
  onMounted,
  onUnmounted
} from "vue";
import { provideAreaRootContext } from "@/components/Base/Area/context";
import { clamp, useVModel } from "@vueuse/core";
import { useForwardExpose } from "radix-vue";
import { ARROW_KEYS, getDecimalCount, PAGE_KEYS, roundValue } from "@/components/Base/Area/utils";

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<AreaRootProps>(), {
  min: () => [0, 0],
  max: () => [100, 100],
  dir: "ltr",
  disabled: false,
  defaultValue: () => [0, 0]
});

const emits = defineEmits<AreaRootEmits>();

const { forwardRef, currentElement } = useForwardExpose();

const { min, max, disabled: isDisabled, dir: propDir } = toRefs(props);
const minX = computed(() => min.value[0]);
const maxX = computed(() => max.value[0]);
const minY = computed(() => min.value[1]);
const maxY = computed(() => max.value[1]);

const modelValue = useVModel(props, "modelValue", emits, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as WritableComputedRef<number[]>;

const valueIndexToChangeRef = ref(0);
const valuesBeforeSlideStartRef = ref(modelValue.value);

function handleSlideStart(values: number[]) {
  updateValues(values);
}

function handleSlideMove(values: number[]) {
  updateValues(values);
}

function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value;
  const nextValue = modelValue.value;
  const hasChanged = String(prevValue) !== String(nextValue);
  if (hasChanged && modelValue.value) emits("valueCommit", toRaw(modelValue.value));
}

function updateValues(values: number[], { commit } = { commit: false }) {
  const decimalCount = getDecimalCount(0.01);
  const snapToStepX = roundValue(
    Math.round((values[0] - minX.value) / 0.01) * 0.01 + minX.value,
    decimalCount
  );
  const snapToStepY = roundValue(
    Math.round((values[1] - minY.value) / 0.01) * 0.01 + minY.value,
    decimalCount
  );
  const nextValueX = clamp(snapToStepX, minX.value, maxX.value);
  const nextValueY = clamp(snapToStepY, minY.value, maxY.value);

  valueIndexToChangeRef.value = 0;
  const hasChanged = String([nextValueX, nextValueY]) !== String(modelValue.value);

  if (hasChanged && commit) emits("valueCommit", [nextValueX, nextValueY]);

  if (hasChanged) {
    thumbElements.value[0].focus();
    modelValue.value = [nextValueX, nextValueY];
  }
}

const thumbElements = ref<HTMLElement[]>([]);

const handleToucheMove = (event: TouchEvent) => {
  event.preventDefault();
};

onMounted(() => {
  currentElement.value.addEventListener("touchmove", handleToucheMove, { passive: false });
});

onUnmounted(() => {
  currentElement.value.removeEventListener("touchmove", handleToucheMove);
});

provideAreaRootContext({
  modelValue,
  thumbElements,
  minX,
  maxX,
  minY,
  maxY,
  disabled: isDisabled
});
</script>

<template>
  <component
    :is="AreaHorizontal"
    v-bind="$attrs"
    :ref="forwardRef"
    :as-child="asChild"
    :as="as"
    :minX="minX"
    :maxX="maxX"
    :minY="minY"
    :maxY="maxY"
    :dir="propDir"
    :aria-disabled="isDisabled"
    :data-disabled="isDisabled ? '' : undefined"
    @pointerdown="
      () => {
        if (!isDisabled) valuesBeforeSlideStartRef = modelValue;
      }
    "
    @slide-start="!isDisabled && handleSlideStart($event)"
    @slide-move="!isDisabled && handleSlideMove($event)"
    @slide-end="!isDisabled && handleSlideEnd()"
    @home-key-down="
      (event) => {
        if (!disabled) {
          const isShiftKey = event.shiftKey;
          updateValues(isShiftKey ? [minX, modelValue[1]] : [modelValue[0], minY], {
            commit: true
          });
        }
      }
    "
    @end-key-down="
      (event) => {
        if (!disabled) {
          const isShiftKey = event.shiftKey;
          updateValues(isShiftKey ? [maxX, modelValue[1]] : [modelValue[0], maxY], {
            commit: true
          });
        }
      }
    "
    @step-key-down="
      (event, direction, coords) => {
        if (!isDisabled) {
          const isPageKey = PAGE_KEYS.includes(event.key);
          const isArrowKey = ARROW_KEYS.includes(event.key);
          const isShiftKey = event.shiftKey;
          const isSkipKey = isPageKey || (isArrowKey && isShiftKey);
          const multiplier = isSkipKey ? 100 : 10;
          const value = modelValue;
          const stepInDirection = 0.01 * direction * multiplier;

          if (coords === 'x') {
            updateValues([value[0] + stepInDirection, value[1]], { commit: true });
          } else {
            updateValues([value[0], value[1] + stepInDirection], { commit: true });
          }
        }
      }
    "
  >
    <slot :model-value="modelValue" />
  </component>
</template>
