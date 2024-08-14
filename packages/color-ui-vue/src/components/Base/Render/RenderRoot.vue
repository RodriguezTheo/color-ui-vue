<script lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { Ref } from "vue";

export type RenderRootProps = PrimitiveProps & {
  hideBackground?: boolean;
  color: number[];
  alpha: number;
};

export type RenderRootProvider = {
  color: Ref<number[]>;
  alpha: Ref<number>;
};
</script>

<script setup lang="ts">
import { Primitive } from "radix-vue";
import { provideRenderRootContext } from "@/components/Base/Render/context";
import { toRefs } from "vue";

const props = withDefaults(defineProps<RenderRootProps>(), {
  hideBackground: false,
  as: "div"
});

const { color, alpha } = toRefs(props);

provideRenderRootContext({
  color,
  alpha
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :style="[
      !props.hideBackground &&
        `background-size: 10px 10px;
        background-image: conic-gradient(
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 25%,
        transparent 0deg,
        transparent 50%,
        rgb(238, 238, 238) 0deg,
        rgb(238, 238, 238) 75%,
        transparent 0deg
      );`,
      'position: relative'
    ]"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
