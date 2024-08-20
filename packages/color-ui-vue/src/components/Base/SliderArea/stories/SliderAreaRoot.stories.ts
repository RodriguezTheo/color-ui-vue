import type { Meta, StoryObj } from "@storybook/vue3";
import { SliderAreaThumb, SliderAreaRoot } from "@/components/Base/SliderArea";

const meta = {
  title: "Base/SliderArea/SliderAreaRoot",
  component: SliderAreaRoot,
  subcomponents: { SliderAreaThumb },
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: false },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
    color: {
      control: "object"
    },
    max: {
      control: "object"
    },
    min: {
      control: "object"
    },
    dir: { control: "select", options: ["ltr", "rtl"] }
  },
  args: {
    orientation: "horizontal",
    disabled: false,
    dir: "ltr",
    color: [240, 0, 0],
    min: [0, 0],
    max: [100, 100]
  }
} satisfies Meta<typeof SliderAreaRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SliderAreaRoot, SliderAreaThumb },
    data: () => ({ sliderValue: [50, 50], color: [255, 0, 0] }),
    setup: () => {
      return { args };
    },
    template: ` <SliderAreaRoot
      v-model="sliderValue"
      :color="args.color"
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="group outline-none rounded-md h-40 w-60"
      >
        <SliderAreaThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderAreaRoot>`
  })
};
