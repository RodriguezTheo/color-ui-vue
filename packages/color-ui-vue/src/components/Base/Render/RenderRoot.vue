<script lang="ts">
import type { PrimitiveProps } from "radix-vue";

export type RenderRootProps = PrimitiveProps & {
  hideBackground?: boolean;
  color: number[];
  alpha: number;
};
</script>

<script setup lang="ts">
import { Primitive } from "radix-vue";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<RenderRootProps>(), {
  hideBackground: false,
  as: "div"
});

const { color, alpha } = toRefs(props);

const backgroundColor = computed(() => {
  if (!props.hideBackground) {
    return `background-size: 8px 8px;
          background-color: rgb(255, 255, 255);
          background-image:
            linear-gradient(to top, rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${alpha.value}), rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${alpha.value})),
            conic-gradient(
              rgb(238, 238, 238) 0deg,
              rgb(238, 238, 238) 25%,
              transparent 0deg,
              transparent 50%,
              rgb(238, 238, 238) 0deg,
              rgb(238, 238, 238) 75%,
              transparent 0deg);`;
  }
  return `background: rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${alpha.value});`;
});
</script>

<template>
  <Primitive :as="props.as" :as-child="props.asChild" :style="backgroundColor">
    <slot />
  </Primitive>
</template>

<style scoped></style>
