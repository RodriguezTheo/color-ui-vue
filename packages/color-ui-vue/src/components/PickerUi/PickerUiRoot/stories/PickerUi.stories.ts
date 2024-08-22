import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "../PickerUiRoot.vue";
import PickerUiModeRoot from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import PickerUiModeContent from "@/components/PickerUi/PickerUiMode/PickerUiModeContent.vue";
import PickerUiModeTrigger from "@/components/PickerUi/PickerUiMode/PickerUiModeTrigger.vue";
import PickerUiModeItem from "@/components/PickerUi/PickerUiMode/PickerUiModeItem.vue";
import PickerUiModeItemLabel from "@/components/PickerUi/PickerUiMode/PickerUiModeItemLabel.vue";
import PickerUiModeItemInput from "@/components/PickerUi/PickerUiMode/PickerUiModeItemInput.vue";
import PickerUiSliderMainRoot from "@/components/PickerUi/PickerUiSliderMain/PickerUiSliderMainRoot.vue";
import PickerUiSliderMainThumb from "@/components/PickerUi/PickerUiSliderMain/PickerUiSliderMainThumb.vue";
import PickerUiRenderRoot from "@/components/PickerUi/PickerUiRender/PickerUiRenderRoot.vue";

import PickerUiSliderColorRoot from "@/components/PickerUi/PickerUiSliderColor/PickerUiSliderColorRoot.vue";
import PickerUiSliderColorThumb from "@/components/PickerUi/PickerUiSliderColor/PickerUiSliderColorThumb.vue";
import PickerUiSliderAlphaRoot from "@/components/PickerUi/PickerUiSliderAlpha/PickerUiSliderAlphaRoot.vue";
import PickerUiSliderAlphaThumb from "@/components/PickerUi/PickerUiSliderAlpha/PickerUiSliderAlphaThumb.vue";

import PickerUiEyeDropperRoot from "@/components/PickerUi/PickerUiEyeDropper/PickerUiEyeDropperRoot.vue";
import PickerUiEyeDropperTrigger from "@/components/PickerUi/PickerUiEyeDropper/PickerUiEyeDropperTrigger.vue";

import PickerUiHistoryRoot from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryRoot.vue";
import PickerUiHistoryList from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryList.vue";
import PickerUiHistoryListItem from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryListItem.vue";

import { ref } from "vue";

const meta = {
  title: "PickerUi/Root",
  component: PickerUiRoot,
  tags: ["autodocs"],
  argTypes: {
    dir: { control: "select", options: ["ltr", "rtl"] },
    modelValue: { control: false },
    acceptedMode: { control: "object" },
    allowedAlpha: { control: "boolean" },
    colorFormat: { control: "select", options: ["hex", "rgb", "hsl"] },
    history: { control: "object" }
  },
  args: {
    modelValue: { r: 240, g: 98, b: 146, a: 0.5 },
    dir: "ltr",
    acceptedMode: ["hex", "rgb", "hsl"],
    allowedAlpha: true,
    colorFormat: "rgb",
    history: {
      limit: 7
    }
  }
} satisfies Meta<typeof PickerUiRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      PickerUiRoot,
      PickerUiSliderMainThumb,
      PickerUiSliderMainRoot,
      PickerUiRenderRoot,
      PickerUiSliderColorRoot,
      PickerUiSliderColorThumb,
      PickerUiSliderAlphaRoot,
      PickerUiSliderAlphaThumb,
      PickerUiModeRoot,
      PickerUiModeContent,
      PickerUiModeTrigger,
      PickerUiModeItem,
      PickerUiModeItemLabel,
      PickerUiModeItemInput,
      PickerUiEyeDropperRoot,
      PickerUiEyeDropperTrigger,
      PickerUiHistoryRoot,
      PickerUiHistoryList,
      PickerUiHistoryListItem
    },
    setup: () => {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    template: `<div class="flex gap-x-16">
      <div class="flex flex-col w-80 gap-y-2 px-4 py-4 rounded border">
      <PickerUiRoot v-bind="args" v-model="modelValue">
      <PickerUiSliderMainRoot class="group outline-none h-40 w-full mb-4 rounded-md">
        <PickerUiSliderMainThumb
          class="block h-4 w-4 rounded-full cursor-pointer data-[disabled=true]:cursor-not-allowed border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </PickerUiSliderMainRoot>
        <div class="flex gap-x-2">
          <div class="flex gap-x-2">
            <PickerUiRenderRoot class="min-h-10 min-w-10 rounded-full" />
            <PickerUiEyeDropperRoot>
              <PickerUiEyeDropperTrigger class="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Y
              </PickerUiEyeDropperTrigger>
            </PickerUiEyeDropperRoot>
          </div>
          <div class="flex flex-col w-full items-center justify-center gap-y-2">
            <PickerUiSliderColorRoot class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full">
              <PickerUiSliderColorThumb
                class="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
            </PickerUiSliderColorRoot>
            <PickerUiSliderAlphaRoot class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full">
              <PickerUiSliderAlphaThumb
                class="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
            </PickerUiSliderAlphaRoot>
          </div>
        </div>
        <PickerUiModeRoot class="flex flex-col">
          <PickerUiModeContent v-for="(mode) in ['rgb', 'hsl']" :value="mode" :key="'mode-'+mode" class="flex gap-x-2 w-full" v-slot="{value}">
            <PickerUiModeItem v-for="(item) in value" :key="'rgb-'+item"  :value="item" class="flex flex-col text-center">
                <PickerUiModeItemLabel>{{item.toUpperCase()}}</PickerUiModeItemLabel>
                <PickerUiModeItemInput 
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </PickerUiModeItem>
            <PickerUiModeItem value="a">
              <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
              <PickerUiModeItemInput
                class="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </PickerUiModeItem>
          </PickerUiModeContent>
          <PickerUiModeContent value="hex" class="flex gap-x-2 w-full">
            <PickerUiModeItem value="hex" class="flex flex-col w-full">
              <PickerUiModeItemLabel>Hex</PickerUiModeItemLabel>
              <PickerUiModeItemInput
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </PickerUiModeItem>
            <PickerUiModeItem value="a" >
              <PickerUiModeItemLabel>A</PickerUiModeItemLabel>
              <PickerUiModeItemInput
                class="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </PickerUiModeItem>
          </PickerUiModeContent>
          <PickerUiModeTrigger v-slot="{mode}" class="mt-2 h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            {{mode}}
          </PickerUiModeTrigger>
          <PickerUiHistoryRoot>
            <PickerUiHistoryList class="flex justify-between gap-x-2 mt-2">
              <PickerUiHistoryListItem class="h-8 w-8 rounded-md" />
            </PickerUiHistoryList>
          </PickerUiHistoryRoot>
        </PickerUiModeRoot>
    </PickerUiRoot>
      </div>
      <div class="flex flex-col w-80 gap-y-2 px-4 py-4 rounded border">
        <div class="flex justify-center font-semibold underline">OPTIONS</div>
        <div>
         <div>format: {{args.colorFormat}}</div>
          <div>modelValue: {{modelValue}}</div>
        </div>
      </div>
    </div>`
  })
};
