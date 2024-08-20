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

#### Root

The base of the main slider.

<!-- @include: ../meta/SliderMainRoot.md -->

#### Thumb

No props needed, need to be placed inside the `SliderMainRoot`.

#### Keyboard Interactions

<KeyboardTable :data="[
{
keys: ['ArrowRight'],
description: '<span> Increments <code>valueX</code>.</span>',
},
{
keys: ['ArrowLeft'],
description: '<span> Decrements <code>valueX</code>.</span>',
},
{
keys: ['ArrowUp'],
description: '<span> Increments <code>valueY</code>.</span>',
},
{
keys: ['ArrowDown'],
description: '<span> Decrements <code>valueY</code>.</span>',
},
{
keys: ['PageUp'],
description: '<span> Increases the <code>valueY</code>.</span>',
},
{
keys: ['PageDown'],
description: '<span> Decreases the <code>valueY</code>.</span>',
},
{
keys: ['Home'],
description: 'Sets the <code>valueX</code> to its minimum.',
},
{
keys: ['End'],
description: 'Sets the <code>valueX</code> to its maximum.',
},
{
keys: ['Shift + ArrowRight'],
description: '<span> Increases <code>valueX</code>. </span>',
},
{
keys: ['Shift + ArrowLeft'],
description: '<span> Decreases <code>valueX</code>.</span>',
},
{
keys: ['Shift + ArrowUp'],
description: '<span> Increases <code>valueY</code>. </span>',
},
{
keys: ['Shift + ArrowDown'],
description: '<span> Decreases <code>valueY</code>.</span>',
},
{
keys: ['Shift + PageUp'],
description: '<span> Increases the <code>valueX</code>.</span>',
},
{
keys: ['Shift + PageDown'],
description: '<span> Decreases the <code>valueX</code>.</span>',
},
{
keys: ['Shift + Home'],
description: 'Sets the <code>valueY</code> to its minimum.',
},
{
keys: ['Shift + End'],
description: 'Sets the <code>valueY</code> to its maximum.',
},
]"
/>

### Render

Used to render the color.

```vue
<PickerUiRenderRoot />
```

#### Root

The base of the render.

<!-- @include: ../meta/RenderRoot.md -->

### Eye Dropper

Used to pick a color from the screen.

```vue
<PickerUiEyeDropperRoot>
  <PickerUiEyeDropperTrigger />
</PickerUiEyeDropperRoot>
```

#### Root

The base of the eye dropper.
<br>No props needed.

#### Trigger

The trigger to pick the color.

<!-- @include: ../meta/EyeDropperTrigger.md -->

### Slider Color

The slider to select the color.

```vue
<PickerUiSliderColorRoot>
  <PickerUiSliderColorThumb />
</PickerUiSliderColorRoot>
```

#### Root

The base of the color slider.

<!-- @include: ../meta/SliderColorRoot.md -->

#### Thumb

Need to be placed inside the `SliderColorRoot`.
<br>No props needed.

### Slider Alpha

The slider to select the alpha channel.

```vue
<PickerUiSliderAlphaRoot>
  <PickerUiSliderAlphaThumb />
</PickerUiSliderAlphaRoot>
```

#### Root

The base of the alpha slider.

<!-- @include: ../meta/SliderAlphaRoot.md -->

#### Thumb

Need to be placed inside the `SliderAlphaRoot`.
<br>No props needed.

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

#### Root

The base of the mode.

<!-- @include: ../meta/ModeRoot.md -->

#### Content

The content of the mode.

<!-- @include: ../meta/ModeContent.md -->

#### Trigger

The trigger to open the mode.

<!-- @include: ../meta/ModeTrigger.md -->

#### Item

The item of the mode.

<!-- @include: ../meta/ModeItem.md -->

#### Item Label

The label of the mode item.

<!-- @include: ../meta/ModeItemLabel.md -->

#### Item Input

The input of the mode item.

<!-- @include: ../meta/ModeItemInput.md -->
