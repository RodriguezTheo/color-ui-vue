---
title: Picker UI
description: A Picker UI color component to select a color.
name: PickerUI
layout: doc
---

# Picker UI

<Description>
A Picker UI color component to select a color.
</Description>

<DemoHeroPreview value="PickerUi" />

<DemoCodePreview value="PickerUi" />

## Installation

Install the component from your command line.

<InstallationTabs value="color-ui-vue" />

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  PickerUiRoot,
  PickerUiModeRoot,
  PickerUiModeContent,
  PickerUiModeTrigger,
  PickerUiModeItem,
  PickerUiModeItemLabel,
  PickerUiModeItemInput,
  PickerUiSliderMainRoot,
  PickerUiSliderMainThumb,
  PickerUiRenderRoot,
  PickerUiSliderColorRoot,
  PickerUiSliderColorThumb,
  PickerUiSliderAlphaRoot,
  PickerUiSliderAlphaThumb,
  PickerUiEyeDropperRoot,
  PickerUiEyeDropperTrigger
} from "color-ui-vue";
</script>

<template>
  <PickerUiRoot>
    <PickerUiSliderMainRoot>
      <PickerUiSliderMainThumb />
    </PickerUiSliderMainRoot>

    <PickerUiRenderRoot />

    <PickerUiEyeDropperRoot>
      <PickerUiEyeDropperTrigger />
    </PickerUiEyeDropperRoot>

    <PickerUiSliderColorRoot>
      <PickerUiSliderColorThumb />
    </PickerUiSliderColorRoot>

    <PickerUiSliderAlphaRoot>
      <PickerUiSliderAlphaThumb />
    </PickerUiSliderAlphaRoot>

    <PickerUiModeRoot>
      <PickerUiModeContent>
        <PickerUiModeItem>
          <PickerUiModeItemLabel />
          <PickerUiModeItemInput />
        </PickerUiModeItem>
      </PickerUiModeContent>
      <PickerUiModeTrigger />
    </PickerUiModeRoot>
    <PickerUiHistoryRoot>
      <PickerUiHistoryList>
        <PickerUiHistoryListItem />
      </PickerUiHistoryList>
    </PickerUiHistoryRoot>
  </PickerUiRoot>
</template>
```

## API Reference

### Root

The base part of the Picker UI.

```vue
<PickerUiRoot>
  <!-- Parts go here -->
</PickerUiRoot>
```

<!-- @include: ../meta/PickerUiRoot.md -->

### Slider Main

The main slider to select the color.

```vue
<PickerUiSliderMainRoot>
  <PickerUiSliderMainThumb />
</PickerUiSliderMainRoot>
```

<!-- @include: ../meta/SliderMainRoot.md -->

### Render

Used to render the color.

```vue
<PickerUiRenderRoot />
```

<!-- @include: ../meta/RenderRoot.md -->

### Eye Dropper

Used to pick a color from the screen.

```vue
<PickerUiEyeDropperRoot>
  <PickerUiEyeDropperTrigger />
</PickerUiEyeDropperRoot>
```

<!-- @include: ../meta/EyeDropperTrigger.md -->

### Slider Color

The slider to select the color.

```vue
<PickerUiSliderColorRoot>
  <PickerUiSliderColorThumb />
</PickerUiSliderColorRoot>
```

<!-- @include: ../meta/SliderColorRoot.md -->

### Slider Alpha

The slider to select the alpha channel.

```vue
<PickerUiSliderAlphaRoot>
  <PickerUiSliderAlphaThumb />
</PickerUiSliderAlphaRoot>
```

<!-- @include: ../meta/SliderAlphaRoot.md -->

### Mode

The mode to select the color format.

```vue
<PickerUiModeRoot>
  <PickerUiModeContent>
    <PickerUiModeItem>
      <PickerUiModeItemLabel />
      <PickerUiModeItemInput />
    </PickerUiModeItem>
  </PickerUiModeContent>
  <PickerUiModeTrigger />
</PickerUiModeRoot>
```

<!-- @include: ../meta/ModeRoot.md -->
<!-- @include: ../meta/ModeContent.md -->
<!-- @include: ../meta/ModeTrigger.md -->
<!-- @include: ../meta/ModeItem.md -->
<!-- @include: ../meta/ModeItemLabel.md -->
<!-- @include: ../meta/ModeItemInput.md -->

### History

The history of the selected colors.

```vue
<PickerUiHistoryRoot>
  <PickerUiHistoryList>
    <PickerUiHistoryListItem />
  </PickerUiHistoryList>
</PickerUiHistoryRoot>
```

<!-- @include: ../meta/HistoryRoot.md -->
<!-- @include: ../meta/HistoryList.md -->
<!-- @include: ../meta/HistoryListItem.md -->
