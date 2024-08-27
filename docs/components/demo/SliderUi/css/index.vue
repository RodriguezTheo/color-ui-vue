<script setup lang="ts">
import {
  SliderUiRoot,
  SliderUiSliderColorRoot,
  SliderUiSliderColorThumb,
  SliderUiSwatchRoot,
  SliderUiSwatchItem
} from "color-ui-vue";
import { ref } from "vue";

const color = ref({ r: 49, g: 168, b: 94 });
</script>

<template>
  <SliderUiRoot v-model="color" class="SliderUi">
    <SliderUiSliderColorRoot class="SliderRoot">
      <SliderUiSliderColorThumb class="SliderThumb" />
    </SliderUiSliderColorRoot>
    <SliderUiSwatchRoot class="SwatchRoot">
      <SliderUiSwatchItem class="SwatchItem" />
    </SliderUiSwatchRoot>
  </SliderUiRoot>
</template>
