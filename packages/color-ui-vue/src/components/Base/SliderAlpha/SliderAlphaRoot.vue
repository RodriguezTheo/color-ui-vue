<script lang="ts">
import type { SliderRootProps } from "@/components/Base/Slider";
import type { ComputedRef, Ref } from "vue";

export type SliderAlphaRootProps = SliderRootProps & {
  /** When `true`, square background is hidden */
  hideBackground?: false;
  /** The color of the slider. */
  color: number[];
};

export type SliderAlphaRootEmits = {
  "update:modelValue": [payload: number | undefined];
  onChangeComplete: [payload: number];
};

export type SliderAlphaProvider = {
  hideBackground: Ref<boolean>;
  style: ComputedRef<string>;
};
</script>

<script setup lang="ts">
import { SliderRoot } from "@/components/Base/Slider";
import { computed, toRefs } from "vue";
import { useForwardPropsEmits } from "radix-vue";
import { provideSliderAlphaRootContext } from "@/components/Base/SliderAlpha/context";

const props = withDefaults(defineProps<SliderAlphaRootProps>(), {
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
});
const emits = defineEmits<SliderAlphaRootEmits>();

const { hideBackground, color } = toRefs(props);

const gradientPos = computed(() => {
  if (props.orientation === "horizontal") {
    return props.dir === "rtl" ? `to left,` : `to right,`;
  }
  return props.dir === "rtl" ? `to bottom,` : `to top,`;
});

const delegatedProps = computed(() => {
  const { color, ...rest } = props;
  return rest;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const backgroundColor = computed(() => {
  if (!hideBackground.value) {
    return `background-size: 8px 8px;
        background-color: rgb(255, 255, 255);
        background-image: conic-gradient(
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 25%,
        transparent 0deg,
        transparent 50%,
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 75%,
        transparent 0deg
      )`;
  }
  return `background-color: rgb(255, 255, 255); background-image: linear-gradient(${gradientPos.value}
    rgba(${color.value[0]},${color.value[1]},${color.value[2]}, 0),
    rgba(${color.value[0]},${color.value[1]},${color.value[2]},1))`;
});

const colorStyle = computed(() => {
  const linearGradient = `background-image: linear-gradient(${gradientPos.value}
    rgba(255, 255, 255, 0),
    rgba(${color.value[0]},${color.value[1]},${color.value[2]},1))`;

  return `${linearGradient}`;
});

provideSliderAlphaRootContext({
  hideBackground,
  style: colorStyle
});
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :max="1"
    :min="0"
    :step="0.01"
    :dir="props.dir"
    :style="backgroundColor"
  >
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
