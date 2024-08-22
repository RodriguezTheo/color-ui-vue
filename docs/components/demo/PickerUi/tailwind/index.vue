<script setup lang="ts">
import { Pipette } from "lucide-vue-next";
import {
  type ModeInput,
  PickerUiEyeDropperRoot,
  PickerUiEyeDropperTrigger,
  PickerUiModeContent,
  PickerUiModeItem,
  PickerUiModeItemInput,
  PickerUiModeItemLabel,
  PickerUiModeRoot,
  PickerUiModeTrigger,
  PickerUiRenderRoot,
  PickerUiRoot,
  PickerUiSliderAlphaRoot,
  PickerUiSliderAlphaThumb,
  PickerUiSliderColorRoot,
  PickerUiSliderColorThumb,
  PickerUiSliderMainRoot,
  PickerUiSliderMainThumb,
  PickerUiHistoryRoot,
  PickerUiHistoryList,
  PickerUiHistoryListItem
} from "color-ui-vue";
import { ref } from "vue";

const color = ref({ r: 100, g: 100, b: 100 });
</script>

<template>
  <div class="flex flex-col w-80 gap-y-2 px-4 py-4 rounded-lg border bg-background">
    <PickerUiRoot v-model="color" allowed-alpha :history="{ limit: 7 }">
      <PickerUiSliderMainRoot class="group outline-none h-40 w-full mb-4 rounded-md">
        <PickerUiSliderMainThumb
          class="block h-4 w-4 rounded-full cursor-pointer data-[disabled=true]:cursor-not-allowed border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </PickerUiSliderMainRoot>
      <div class="flex gap-x-2">
        <div class="flex gap-x-2">
          <PickerUiRenderRoot class="min-h-10 min-w-10 rounded-full" />
          <PickerUiEyeDropperRoot>
            <PickerUiEyeDropperTrigger
              class="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <Pipette class="w-4 h-4" />
            </PickerUiEyeDropperTrigger>
          </PickerUiEyeDropperRoot>
        </div>
        <div class="flex flex-col w-full items-center justify-center gap-y-2">
          <PickerUiSliderColorRoot
            class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full"
          >
            <PickerUiSliderColorThumb
              class="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          </PickerUiSliderColorRoot>
          <PickerUiSliderAlphaRoot
            class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full"
          >
            <PickerUiSliderAlphaThumb
              class="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          </PickerUiSliderAlphaRoot>
        </div>
      </div>
      <PickerUiModeRoot class="flex flex-col">
        <PickerUiModeContent
          v-for="mode in ['rgb', 'hsl'] as const"
          :value="mode"
          :key="'mode-' + mode"
          class="flex gap-x-2 w-full"
          v-slot="{ value }"
        >
          <PickerUiModeItem
            v-for="item in value"
            :key="'rgb-' + item"
            :value="item as ModeInput"
            class="flex flex-col text-center"
          >
            <PickerUiModeItemLabel>{{ item.toUpperCase() }}</PickerUiModeItemLabel>
            <PickerUiModeItemInput
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </PickerUiModeItem>
          <PickerUiModeItem value="a">
            <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
            <PickerUiModeItemInput
              class="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </PickerUiModeItem>
        </PickerUiModeContent>
        <PickerUiModeContent value="hex" class="flex gap-x-2 w-full">
          <PickerUiModeItem value="hex" class="flex flex-col w-full">
            <PickerUiModeItemLabel>Hex</PickerUiModeItemLabel>
            <PickerUiModeItemInput
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </PickerUiModeItem>
          <PickerUiModeItem value="a">
            <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
            <PickerUiModeItemInput
              class="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </PickerUiModeItem>
        </PickerUiModeContent>
        <PickerUiModeTrigger
          v-slot="{ mode }"
          class="mt-2 h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          {{ mode }}
        </PickerUiModeTrigger>
      </PickerUiModeRoot>
      <PickerUiHistoryRoot>
        <PickerUiHistoryList class="flex justify-between gap-x-2 mt-2">
          <PickerUiHistoryListItem class="h-8 w-8 rounded-md" />
        </PickerUiHistoryList>
      </PickerUiHistoryRoot>
    </PickerUiRoot>
  </div>
</template>

<style scoped></style>
