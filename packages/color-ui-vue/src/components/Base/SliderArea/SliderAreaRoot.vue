<script lang="ts">
import type { Direction, Orientation } from "@/shared/types";
import type { ModelRef, Ref } from "vue";

export interface SliderAreaRootProps {
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The controlled value of the slider area. Can be bind as `v-model`. */
  modelValue?: [number, number];
  /** The orientation of the slider. */
  orientation?: Orientation;
  /** The reading direction of the slider. */
  dir?: Direction;
  /** The minimum value for the range. */
  min?: [number, number];
  /** The maximum value for the range. */
  max?: [number, number];
  /** The reactive color */
  color: [number, number, number];
}

export interface SliderAreaRootProvider {
  modelValue: ModelRef<[number, number]>;
  orientation: Ref<Orientation>;
  disabled: Ref<boolean>;
  min: Ref<[number, number]>;
  max: Ref<[number, number]>;
  events: () => {
    onUp: () => void;
    onDown: (e: MouseEvent | TouchEvent) => void;
    onArrowKeyDown: (e: KeyboardEvent) => void;
    onArrowKeyUp: () => void;
  };
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import { provideSliderAreaRootContext } from "@/components/Base/SliderArea/context";
import { useMouseInElement } from "@vueuse/core";

const props = withDefaults(defineProps<SliderAreaRootProps>(), {
  max: () => [100, 100],
  min: () => [0, 0],
  disabled: false,
  orientation: "horizontal",
  dir: "ltr"
});

const { disabled, min, dir, max, orientation } = toRefs(props);

const vModel = defineModel<[number, number]>("modelValue", {
  default: [0, 0]
});

const position = ref<[number, number]>([0, 0]);

const containerRef = ref<HTMLElement | null>(null);
const isSliding = ref(false);

const { elementX, elementY, elementHeight, elementWidth } = useMouseInElement(containerRef);

const roundToStep = (value: number, step: number) => {
  return Math.floor(value / step) * step;
};

const updateModelValue = (value: [number, number]) => {
  if (!containerRef.value) {
    return;
  }

  const [x, y] = value;
  let newPosition: [number, number] = [0, 0];

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
  if (!containerRef.value) {
    return;
  }
  const x = (vModel.value[0] / (props.max[0] - props.min[0])) * elementWidth.value;
  const y = (vModel.value[1] / (props.max[1] - props.min[1])) * elementHeight.value;

  position.value = [x, y];
};

const events = () => {
  const onDrag = (value: [number, number]) => {
    if (!containerRef.value) {
      return;
    }

    const [x, y] = value;
    const [stepX, stepY] = [1, 1];
    let newPosition: [number, number] = [
      Math.floor(x / stepX) * stepX,
      Math.floor(y / stepY) * stepY
    ];

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
    if (props.disabled || !containerRef.value) {
      return;
    }

    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    const x = elementX.value;
    const y = elementY.value;

    if (x >= 0 && x <= elementWidth.value && y >= 0 && y <= elementHeight.value) {
      isSliding.value = true;
      onDrag([x, y]);
    }
  };

  const onMove = () => {
    if (!containerRef.value) {
      return;
    }

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
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  const onUp = () => {
    isSliding.value = false;
    cleanUp();
  };

  const onArrowKeyDown = (e: KeyboardEvent) => {
    if (props.disabled || !containerRef.value) {
      return;
    }

    isSliding.value = true;
    let keyPos = position.value;
    if (e.key === "ArrowUp") {
      keyPos[1] = Math.max(0, keyPos[1] - 1);
    } else if (e.key === "ArrowDown") {
      keyPos[1] = Math.min(elementHeight.value, keyPos[1] + 1);
    } else if (e.key === "ArrowLeft") {
      keyPos[0] = Math.max(0, keyPos[0] - 1);
    } else if (e.key === "ArrowRight") {
      keyPos[0] = Math.min(elementWidth.value, keyPos[0] + 1);
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

watch(vModel, () => {
  updatePositions();
});

provideSliderAreaRootContext({
  modelValue: vModel,
  orientation,
  disabled,
  max,
  min,
  events
});

onMounted(() => {
  if (containerRef.value) {
    updatePositions();
  }
});

onBeforeUnmount(() => {
  events().cleanUp();
});
</script>

<template>
  <div
    ref="containerRef"
    :dir="dir"
    :data-orientation="orientation"
    :aria-disabled="disabled"
    style="position: relative"
    tabindex="-1"
    @mousedown="events().onDown"
    @touchdown="events().onDown"
  >
    <div
      :style="`background: rgb(${color[0]}, ${color[1]}, ${color[2]});  position: absolute; inset: 0; border-radius: inherit; overflow: hidden;`"
      tabindex="-1"
    >
      <div
        style="
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)),
            linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
        "
      />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
