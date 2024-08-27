import type { Meta, StoryObj } from "@storybook/vue3";
import SliderUiRoot from "@/components/SliderUi/SliderUiRoot/SliderUiRoot.vue";
import SliderUiSliderColorRoot from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorRoot.vue";
import SliderUiSliderColorThumb from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorThumb.vue";
import { ref } from "vue";
import SliderUiSwatchItem from "@/components/SliderUi/SliderUiSwatch/SliderUiSwatchItem.vue";
import SliderUiSwatchRoot from "@/components/SliderUi/SliderUiSwatch/SliderUiSwatchRoot.vue";

const meta = {
  title: "SliderUi/Swatch/Root",
  component: SliderUiSwatchRoot,
  subcomponents: { SliderUiSwatchItem },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false
  }
} satisfies Meta<typeof SliderUiSwatchRoot>;

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
      const color = ref({ r: 255, g: 162, b: 0 });
      return { args, color };
    },
    template: `
      <div>{{color}}</div>
      <SliderUiRoot v-model="color"> 
        <SliderUiSliderColorRoot
        class="relative flex touch-none select-none items-center justify-center rounded-full h-3 w-full"
        >
          <SliderUiSliderColorThumb           
            class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderUiSliderColorRoot>
      <SliderUiSwatchRoot :orientation="args.orientation" :disabled="args.disabled" class="w-full flex gap-x-2 mt-4" :class="[args.orientation === 'horizontal' ? '' : 'flex-col']">
        <SliderUiSwatchItem class="h-4 w-full transition-[width,transform] hover:scale-110" />
      </SliderUiSwatchRoot>
    </SliderUiRoot>`
  })
};
