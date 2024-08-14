---

title: Styling
description: Color UI components are unstyled and compatible with any styling solution, giving you complete control over styling.
---

# Styling

<Description>
Color UI components are unstyled and compatible with any styling solution, giving you complete control over styling.
</Description>

## Styling overview

### Functional styles

You are in control of all aspects of styling, including functional styles.

### Classes

All components accept `class` attributes (some root components can't), just like normal component. This class will be passed through to the DOM element. You can use it in CSS as expected.

## Styling with CSS

### Styling a part

You can style a component part by targeting the `class` that you provide.

```vue
<script setup lang="ts">
  import { PickerUiSliderMainRoot, PickerUiSliderMainThumb } from "color-ui-vue";
</script>

<template>
  <PickerUiSliderMainRoot class="PickerUiSliderMainRoot">
    <PickerUiSliderMainThumb class="PickerUiSliderMainThumb" />
  </PickerUiSliderMainRoot>
</template>

<style>
.PickerUiSliderMainRoot {
  /* ... */
}

.PickerUiSliderMainThumb {
  /* ... */
}
</style>
```

### Styling a data attribute

You can style a component by targeting its `data-` attribute.

```css
.PickerUiSliderMainThumb[data-disabled="true"] {
  /* ... */
}
```

## Styling with Tailwind CSS

The examples below are using [Tailwind CSS](https://tailwindcss.com/), but you can use any library of your choice.

### Styling a part

```vue
<script setup lang="ts">
  import { PickerUiSliderMainRoot, PickerUiSliderMainThumb } from "color-ui-vue";
</script>

<template>
  <PickerUiSliderMainRoot class="group outline-none h-40 w-full mb-4 rounded-md">
    <PickerUiSliderMainThumb class="block h-4 w-4 rounded-full cursor-pointer data-[disabled=true]:cursor-not-allowed border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </PickerUiSliderMainRoot>
</template>
```

### Styling a data attribute

```vue{10}
<script setup lang="ts">
  import { PickerUiSliderMainRoot, PickerUiSliderMainThumb } from "color-ui-vue";
</script>

<template>
  <PickerUiSliderMainRoot class="group outline-none h-40 w-full mb-4 rounded-md">
    <PickerUiSliderMainThumb 
      class="
      block h-4 w-4 rounded-full cursor-pointer border-2 border-primary bg-background
      data-[disabled=true]:cursor-not-allowed
      " 
    />
  </PickerUiSliderMainRoot>
</template>
```

## Extending a primitive

```vue[CustomPickerUiSliderMain.vue]
<script setup lang="ts">
import { PickerUiSliderMainRoot, type PickerUiRootProps } from "color-ui-vue";

type Props = PickerUiRootProps & {
  foo: string;
}

defineProps<Props>();
</script>

<template>
  <PickerUiSliderMainRoot v-bind="$props">
    <slot />
  </PickerUiSliderMainRoot>
</template>
```

::: info
Source: [Radix vue](https://www.radix-vue.com/)
:::