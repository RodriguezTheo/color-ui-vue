<script lang="ts">
import type { SliderRootProps } from "@/components/Base/Slider";

export type SliderHueRootProps = SliderRootProps & {};
export type SliderHueRootEmits = {
  "update:modelValue": [payload: number | undefined];
};
</script>

<script setup lang="ts">
import { SliderRoot } from "@/components/Base/Slider";
import { computed } from "vue";
import { useForwardPropsEmits } from "radix-vue";

const props = withDefaults(defineProps<SliderHueRootProps>(), {
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
});
const emits = defineEmits<SliderHueRootEmits>();

const gradientPos = computed(() => {
  if (props.orientation === "horizontal") {
    return props.dir === "rtl" ? `to left,` : `to right,`;
  }
  return props.dir === "rtl" ? `to bottom,` : `to top,`;
});

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :style="`background-image: linear-gradient(
              ${gradientPos}
              rgb(255, 0, 0) 0%,
              rgb(255, 255, 0) 17%,
              rgb(0, 255, 0) 33%,
              rgb(0, 255, 255) 50%,
              rgb(0, 0, 255) 67%,
              rgb(255, 0, 255) 83%,
              rgb(255, 0, 0) 100%
            )`"
  >
    <slot />
  </SliderRoot>
</template>

<style scoped></style>
