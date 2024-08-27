import type { Meta, StoryObj } from "@storybook/vue3";
import SliderUiRoot from "@/components/SliderUi/SliderUiRoot/SliderUiRoot.vue";
import SliderUiSliderColorRoot from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorRoot.vue";
import SliderUiSliderColorThumb from "@/components/SliderUi/SliderUiSliderColor/SliderUiSliderColorThumb.vue";
import { ref } from "vue";

const meta = {
  title: "SliderUi/SliderColor",
  component: SliderUiSliderColorRoot,
  subcomponents: { SliderUiSliderColorThumb },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false
  }
} satisfies Meta<typeof SliderUiSliderColorRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SliderUiSliderColorThumb, SliderUiSliderColorRoot, SliderUiRoot },
    setup: () => {
      const color = ref({ r: 255, g: 162, b: 0 });
      return { args, color };
    },
    template: `<SliderUiRoot v-model="color"> 
        <SliderUiSliderColorRoot
        :orientation="args.orientation"
        :disabled="args.disabled"
        class="relative flex touch-none select-none items-center justify-center rounded-full"
        :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
        >
          <SliderUiSliderColorThumb           
            class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderUiSliderColorRoot>
    </SliderUiRoot>`
  })
};
