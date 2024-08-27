import type { Meta, StoryObj } from "@storybook/vue3";
import SliderUiRoot from "@/components/SliderUi/SliderUiRoot/SliderUiRoot.vue";
import SliderUiSliderColorRoot from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorRoot.vue";
import SliderUiSliderColorThumb from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorThumb.vue";
import { ref } from "vue";
import SliderUiSwatchItem from "@/components/SliderUi/SliderUiSwatch/SliderUiSwatchItem.vue";
import SliderUiSwatchRoot from "@/components/SliderUi/SliderUiSwatch/SliderUiSwatchRoot.vue";

const meta = {
  title: "SliderUi/Root",
  component: SliderUiRoot,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    dir: { control: "select", options: ["ltr", "rtl"] },
    modelValue: { control: false },
    acceptedMode: { control: "object" },
    colorFormat: { control: "select", options: ["hex", "rgb", "hsl"] }
  },
  args: {
    modelValue: { r: 240, g: 98, b: 146 },
    dir: "ltr",
    acceptedMode: ["hex", "rgb", "hsl"],
    colorFormat: "rgb",
    orientation: "horizontal"
  }
} satisfies Meta<typeof SliderUiRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      SliderUiSliderColorThumb,
      SliderUiSliderColorRoot,
      SliderUiRoot,
      SliderUiSwatchRoot,
      SliderUiSwatchItem
    },
    setup: () => {
      const color = ref(args.modelValue);
      return { args, color };
    },
    template: `
      <div>{{color}}</div>
      <SliderUiRoot v-model="color" :orientation="args.orientation" :dir="args.dir" :accepted-mode="args.acceptedMode" :color-format="args.colorFormat"> 
        <SliderUiSliderColorRoot
        class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full"
        >
          <SliderUiSliderColorThumb           
            class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderUiSliderColorRoot>
      <SliderUiSwatchRoot  class="w-full flex gap-x-2 mt-4 data-[orientation=vertical]:flex-col">
        <SliderUiSwatchItem class="h-4 w-full transition-[width,transform] hover:scale-110" />
      </SliderUiSwatchRoot>
    </SliderUiRoot>`
  })
};
