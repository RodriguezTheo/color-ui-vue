import type { Meta, StoryObj } from "@storybook/vue3";
import SliderHueRoot from "@/components/Base/SliderHue/SliderHueRoot.vue";
import SliderHueThumb from "@/components/Base/SliderHue/SliderHueThumb.vue";

import { ref } from "vue";

const meta = {
  title: "Base/SliderHue/Root",
  component: SliderHueRoot,
  subcomponents: { SliderHueThumb },
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: false },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false, // Valeur par défaut pour `disabled`
    modelValue: 50
  }
} satisfies Meta<typeof SliderHueRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SliderHueRoot, SliderHueThumb },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      const modelValue = ref(60);
      return { args, modelValue };
    },
    template: ` <SliderHueRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="relative flex touch-none select-none items-center justify-center rounded-full bg-primary/20"
      :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
      >
        <SliderHueThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderHueRoot>`
  })
};
