import type { Meta, StoryObj } from "@storybook/vue3";
import { SliderRoot, SliderThumb, SliderBackground } from "@/components/Base/Slider";

const meta = {
  title: "Base/Slider/SliderRoot",
  component: SliderRoot,
  subcomponents: { SliderThumb },
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: false },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false // Valeur par défaut pour `disabled`
  }
} satisfies Meta<typeof SliderRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SliderRoot, SliderThumb },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      return { args };
    },
    template: ` <SliderRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="relative flex touch-none select-none items-center justify-center rounded-full bg-primary/20"
      :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
      >
        <SliderThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderRoot>`
  })
};

export const WithBackground: Story = {
  render: (args) => ({
    components: { SliderRoot, SliderThumb, SliderBackground },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      return { args };
    },
    template: ` <SliderRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="relative flex touch-none select-none items-center justify-center rounded-full bg-primary/20"
      :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
      >
        <SliderBackground class="bg-red-600"/>
        <SliderThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderRoot>`
  })
};
