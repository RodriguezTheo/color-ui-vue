<script lang="ts">
import type { Direction, Orientation } from "@/shared/types";
import type { ModelRef, Ref } from "vue";
import type { PrimitiveProps } from "radix-vue";

export interface SliderAreaRootProps extends PrimitiveProps {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The controlled value of the slider area. Can be bind as `v-model`. */
  modelValue?: number[];
  /** The orientation of the slider. */
  orientation?: Orientation;
  /** The reading direction of the slider. */
  dir?: Direction;
  /** The minimum value for the range. */
  min?: number[];
  /** The maximum value for the range. */
  max?: number[];
  /** The reactive color */
  color: number[];
}

export interface SliderAreaRootProvider {
  modelValue: ModelRef<number[]>;
  orientation: Ref<Orientation>;
  disabled: Ref<boolean>;
  min: Ref<number[]>;
  max: Ref<number[]>;
  events: () => {
    onUp: () => void;
    onDown: (e: MouseEvent | TouchEvent) => void;
    onArrowKeyDown: (e: KeyboardEvent) => void;
    onArrowKeyUp: () => void;
  };
  thumbElement: Ref<HTMLElement | null>;
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRefs } from "vue";
import { provideSliderAreaRootContext } from "@/components/Base/SliderArea/context";
import { useMouseInElement } from "@vueuse/core";
import { ARROW_KEYS, PAGE_KEYS } from "@/components/Base/SliderArea/utils";
import { Primitive, useForwardExpose } from "radix-vue";

const props = withDefaults(defineProps<SliderAreaRootProps>(), {
  as: "div",
  max: () => [100, 100],
  min: () => [0, 0],
  disabled: false,
  orientation: "horizontal",
  dir: "ltr"
});

const { disabled, min, dir, max, orientation } = toRefs(props);

const vModel = defineModel<number[]>("modelValue", {
  default: [0, 0]
});

const position = ref<number[]>([0, 0]);

const { forwardRef, currentElement } = useForwardExpose();

const thumbElement = ref<HTMLElement | null>(null);
const isSliding = ref(false);

const { elementX, elementY, elementHeight, elementWidth } = useMouseInElement(currentElement);

const roundToStep = (value: number, step: number) => {
  return Math.floor(value / step) * step;
};

const updateModelValue = (value: number[]) => {
  if (!currentElement.value) {
    return;
  }

  const [x, y] = value;
  let newPosition: number[] = [0, 0];

  if (x === 0) {
    newPosition[0] = props.min[0];
  } else if (x > elementWidth.value) {
    newPosition[0] = props.max[0];
  } else {
    const precision = Math.abs(Math.log10(1));
    newPosition[0] = parseFloat(
      roundToStep((x * (props.max[0] - props.min[0])) / elementWidth.value, 1).toFixed(precision)
    );
  }

  if (y === 0) {
    newPosition[1] = props.min[1];
  } else if (y > elementHeight.value) {
    newPosition[1] = props.max[1];
  } else {
    const precision = Math.abs(Math.log10(1));
    newPosition[1] = parseFloat(
      roundToStep((y * (props.max[1] - props.min[1])) / elementHeight.value, 1).toFixed(precision)
    );
  }

  vModel.value = newPosition;
};

const updatePositions = () => {
  if (!currentElement.value) {
    return;
  }

  const { width, height } = currentElement.value.getBoundingClientRect();
  const x = (vModel.value[0] / (props.max[0] - props.min[0])) * width;
  const y = (vModel.value[1] / (props.max[1] - props.min[1])) * height;

  position.value = [x, y];
};

const events = () => {
  const onDrag = (value: number[]) => {
    if (!currentElement.value) {
      return;
    }

    const [x, y] = value;
    const [stepX, stepY] = [1, 1];
    let newPosition: number[] = [Math.floor(x / stepX) * stepX, Math.floor(y / stepY) * stepY];

    if (x === elementWidth.value) {
      newPosition[0] = x;
    } else if (x === 0) {
      newPosition[0] = 0;
    }

    if (y === elementHeight.value) {
      newPosition[1] = y;
    } else if (y === 0) {
      newPosition[1] = 0;
    }

    position.value = newPosition;
    updateModelValue(position.value);
  };

  const onDown = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || !currentElement.value) {
      return;
    }

    e.preventDefault();

    if (e instanceof MouseEvent) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    }

    if (e instanceof TouchEvent) {
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    }

    const x = elementX.value;
    const y = elementY.value;

    if (x >= 0 && x <= elementWidth.value && y >= 0 && y <= elementHeight.value) {
      isSliding.value = true;
      onDrag([x, y]);
    }
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!currentElement.value) {
      return;
    }

    e.preventDefault();

    const getXPos = () => {
      if (elementX.value < 0) {
        return 0;
      } else if (elementX.value > elementWidth.value) {
        return elementWidth.value;
      } else {
        return elementX.value;
      }
    };

    const getYPos = () => {
      if (elementY.value < 0) {
        return 0;
      } else if (elementY.value > elementHeight.value) {
        return elementHeight.value;
      } else {
        return elementY.value;
      }
    };

    onDrag([getXPos(), getYPos()]);
  };

  const cleanUp = () => {
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onUp);

    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  const onUp = () => {
    isSliding.value = false;
    cleanUp();
  };

  const onArrowKeyDown = (e: KeyboardEvent) => {
    if (props.disabled || !currentElement.value) {
      return;
    }

    isSliding.value = true;

    let keyPos = position.value;
    const { width, height } = currentElement.value.getBoundingClientRect();

    if (e.key === "ArrowUp") {
      keyPos[1] = Math.max(0, keyPos[1] - (e.shiftKey ? 10 : 1));
    } else if (e.key === "ArrowDown") {
      keyPos[1] = Math.min(height, keyPos[1] + (e.shiftKey ? 10 : 1));
    } else if (e.key === "ArrowLeft") {
      keyPos[0] = Math.max(0, keyPos[0] - (e.shiftKey ? 10 : 1));
    } else if (e.key === "ArrowRight") {
      keyPos[0] = Math.min(width, keyPos[0] + (e.shiftKey ? 10 : 1));
    } else if (e.key === "Home") {
      e.shiftKey ? (keyPos[1] = 0) : (keyPos[0] = 0);
    } else if (e.key === "End") {
      e.shiftKey ? (keyPos[1] = height) : (keyPos[0] = width);
    } else if (e.key === "PageUp") {
      e.shiftKey
        ? (keyPos[0] = Math.max(0, keyPos[0] - 10))
        : (keyPos[1] = Math.max(0, keyPos[1] - 10));
    } else if (e.key === "PageDown") {
      e.shiftKey
        ? (keyPos[0] = Math.min(width, keyPos[0] + 10))
        : (keyPos[1] = Math.min(height, keyPos[1] + 10));
    }

    onDrag(keyPos);
  };

  const onArrowKeyUp = () => {
    isSliding.value = false;
  };

  return {
    onUp,
    onDown,
    onArrowKeyDown,
    onArrowKeyUp,
    cleanUp
  };
};

provideSliderAreaRootContext({
  modelValue: vModel,
  orientation,
  disabled,
  max,
  min,
  events,
  thumbElement
});

onMounted(() => {
  if (currentElement.value) {
    updatePositions();
  }
});

const backgroundColor = computed(() => {
  const { color } = props;
  return `background:linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0)), linear-gradient(to top, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0]}, ${color[1]}, ${color[2]})); position: relative;`;
});

onBeforeUnmount(() => {
  events().cleanUp();
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :ref="forwardRef"
    :dir="dir"
    :data-orientation="orientation"
    :aria-disabled="disabled"
    :style="backgroundColor"
    tabindex="-1"
    @keydown="
      (event) => {
        if (event.key === 'Home') {
          event.preventDefault();
        } else if (event.key === 'End') {
          event.preventDefault();
        } else if ([...PAGE_KEYS, ...ARROW_KEYS].includes(event.key)) {
          event.preventDefault();
        } else if (event.altKey) {
          event.preventDefault();
        }
      }
    "
    @mousedown="events().onDown"
    @mousemove="
      (e) => {
        e.preventDefault();
      }
    "
    @touchmove.passive="
      (e) => {
        e.preventDefault();
        if (thumbElement) {
          thumbElement.focus();
          events().onDown(e);
        }
      }
    "
    @touchdown="
      (event: TouchEvent) => {
        if (thumbElement) {
          thumbElement.focus();
        }
        events().onDown(event);
      }
    "
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
