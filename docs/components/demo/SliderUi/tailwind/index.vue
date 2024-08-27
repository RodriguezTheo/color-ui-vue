<script setup lang="ts">
import {
  SliderUiRoot,
  SliderUiSliderColorRoot,
  SliderUiSliderColorThumb,
  SliderUiSwatchRoot,
  SliderUiSwatchItem
} from "color-ui-vue";
import { ref } from "vue";

const color = ref({ r: 49, g: 168, b: 94, a: 1 });
</script>

<template>
  <div class="flex flex-col items-center gap-y-4">
    <div class="h-10 w-10 rounded-lg p-1 border bg-background">
      <span
        class="h-full w-full block rounded-md"
        :style="`background-color: rgb(${color.r},${color.g},${color.b})`"
      />
    </div>
    <!-- START / SliderUiRoot -->
    <SliderUiRoot
      v-model="color"
      class="flex flex-col w-96 gap-y-4 px-4 py-4 rounded-lg border bg-background"
    >
      <SliderUiSliderColorRoot
        class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full"
      >
        <SliderUiSliderColorThumb
          class="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderUiSliderColorRoot>
      <SliderUiSwatchRoot class="w-full flex gap-x-2">
        <SliderUiSwatchItem
          class="h-4 w-full last:rounded-r-lg first:rounded-l-lg transition-[width,transform] hover:scale-110"
        />
      </SliderUiSwatchRoot>
    </SliderUiRoot>
    <!-- END / SliderUiRoot -->
  </div>
</template>

<style scoped></style>
