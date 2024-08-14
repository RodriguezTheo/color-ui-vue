<script setup lang="ts">
import {
  PickerUiEyeDropperRoot,
  PickerUiEyeDropperTrigger,
  PickerUiModeContent,
  PickerUiModeItem,
  PickerUiModeItemInput,
  PickerUiModeItemLabel,
  PickerUiModeRoot,
  PickerUiModeTrigger,
  PickerUiRenderBackground,
  PickerUiRenderRoot,
  PickerUiRoot,
  PickerUiSliderAlphaRoot,
  PickerUiSliderAlphaThumb,
  PickerUiSliderColorRoot,
  PickerUiSliderColorThumb,
  PickerUiSliderMainRoot,
  PickerUiSliderMainThumb,
  type ModeInput
} from "color-ui-vue";
import { ref } from "vue";

const color = ref({ r: 100, g: 100, b: 100 });
</script>

<template>
  <PickerUiRoot v-model="color">
    <PickerUiSliderMainRoot class="SliderArea">
      <PickerUiSliderMainThumb class="SliderAreaThumb" />
    </PickerUiSliderMainRoot>
    <div class="PickerUiContent">
      <PickerUiRenderRoot class="RenderRoot">
        <PickerUiRenderBackground />
      </PickerUiRenderRoot>
      <PickerUiEyeDropperRoot>
        <PickerUiEyeDropperTrigger class="EyeDropperTrigger">Y</PickerUiEyeDropperTrigger>
      </PickerUiEyeDropperRoot>
      <div class="SliderContainer">
        <PickerUiSliderColorRoot class="SliderRoot">
          <PickerUiSliderColorThumb class="SliderThumb" />
        </PickerUiSliderColorRoot>
        <PickerUiSliderAlphaRoot class="SliderRoot">
          <PickerUiSliderAlphaThumb class="SliderThumb" />
        </PickerUiSliderAlphaRoot>
      </div>
    </div>
    <PickerUiModeRoot class="ModeRoot">
      <PickerUiModeContent
        v-for="mode in ['rgb', 'hsl'] as const"
        :value="mode"
        :key="'mode-' + mode"
        class="ModeContent"
        v-slot="{ value }"
      >
        <PickerUiModeItem
          v-for="item in value"
          :key="'rgb-' + item"
          :value="item as ModeInput"
          class="ModeItem"
        >
          <PickerUiModeItemLabel>
            {{ item.toUpperCase() }}
          </PickerUiModeItemLabel>
          <PickerUiModeItemInput class="ModeItemInput" />
        </PickerUiModeItem>
        <PickerUiModeItem value="a">
          <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
          <PickerUiModeItemInput class="ModeItemInput" />
        </PickerUiModeItem>
      </PickerUiModeContent>
      <PickerUiModeContent value="hex" class="PickerUiModeContent">
        <PickerUiModeItem value="hex" class="ModeItemHex">
          <PickerUiModeItemLabel>Hex</PickerUiModeItemLabel>
          <PickerUiModeItemInput class="ModeItemInput" />
        </PickerUiModeItem>
        <PickerUiModeItem value="a">
          <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
          <PickerUiModeItemInput class="ModeItemInput" />
        </PickerUiModeItem>
      </PickerUiModeContent>
      <PickerUiModeTrigger v-slot="{ mode }" class="ModeTrigger">
        {{ mode }}
      </PickerUiModeTrigger>
    </PickerUiModeRoot>
  </PickerUiRoot>
</template>
