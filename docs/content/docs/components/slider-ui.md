---
title: Slider UI
description: A Slider UI color component to select a color with swatch.
name: SliderUi
layout: doc
---

# Slider UI

<Description>
A Slider UI color component to select a color.
</Description>

<DemoHeroPreview value="SliderUi" />

<DemoCodePreview value="SliderUi" />

## Installation

Install the component from your command line.

<InstallationTabs value="color-ui-vue" />

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  SliderUiRoot,
  SliderUiSliderColorRoot,
  SliderUiSliderColorThumb,
  SliderUiSwatchRoot,
  SliderUiSwatchItem
} from "color-ui-vue";
</script>

<template>
  <SliderUiRoot>
    <SliderUiSliderColorRoot>
      <SliderUiSliderColorThumb />
    </SliderUiSliderColorRoot>

    <SliderUiSwatchRoot>
      <SliderUiSwatchItem />
    </SliderUiSwatchRoot>
  </SliderUiRoot>
</template>
```

## API Reference

### Root

The base part of the Slider UI.

```vue
<SliderUiRoot>
  <!-- Parts go here -->
</SliderUiRoot>
```

<!-- @include: ../meta/slider-ui/SliderUiRoot.md -->

### Slider Color

The slider to select the color.

```vue
<SliderUiSwatchRoot>
  <SliderUiSliderColorThumb />
</SliderUiSwatchRoot>
```

<!-- @include: ../meta/slider-ui/SliderColorRoot.md -->

### Swatch

The swatch list to select the color.

```vue
<PickerUiSliderAlphaRoot>
  <SliderUiSwatchItem />
</PickerUiSliderAlphaRoot>
```

<!-- @include: ../meta/slider-ui/SwatchRoot.md -->
