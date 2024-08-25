import type { Meta, StoryObj } from "@storybook/vue3";
import SliderAlphaRoot from "@/components/Base/SliderAlpha/SliderAlphaRoot.vue";
import SliderAlphaThumb from "@/components/Base/SliderAlpha/SliderAlphaThumb.vue";
import { ref } from "vue";

const meta = {
  title: "Base/SliderAlpha/Root",
  component: SliderAlphaRoot,
  subcomponents: { SliderAlphaThumb },
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: false },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
    hideBackground: { control: "boolean" },
    color: { control: false }
  },
  args: {
    orientation: "horizontal",
    disabled: false, // Valeur par défaut pour `disabled`
    modelValue: 50,
    hideBackground: false,
    color: [255, 0, 0]
  }
} satisfies Meta<typeof SliderAlphaRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SliderAlphaRoot, SliderAlphaThumb },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      const modelValue = ref(60);
      return { args, modelValue };
    },
    template: ` <SliderAlphaRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      :color="args.color"
      :hide-background="args.hideBackground"
      class="relative flex touch-none select-none items-center justify-center rounded-full bg-primary/20"
      :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
      >
        <SliderAlphaThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderAlphaRoot>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: { SliderAlphaRoot, SliderAlphaThumb },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      const modelValue = ref(60);
      return { args, modelValue };
    },
    template: ` <SliderAlphaRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      :color="args.color"
      :hide-background="args.hideBackground"
      class="relative flex touch-none select-none items-center justify-center rounded-full bg-primary/20"
      :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
      as-child
      >
      <span>
        <SliderAlphaThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </span>
      </SliderAlphaRoot>`
  })
};
