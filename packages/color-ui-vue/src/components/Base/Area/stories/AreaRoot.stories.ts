import type { Meta, StoryObj } from "@storybook/vue3";
import AreaRoot from "@/components/Base/Area/AreaRoot.vue";
import AreaThumb from "@/components/Base/Area/AreaThumb.vue";

const meta = {
  title: "Base/Area/AreaRoot",
  component: AreaRoot,
  subcomponents: { AreaThumb },
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: false },
    disabled: { control: "boolean" },
    max: {
      control: "object"
    },
    min: {
      control: "object"
    },
    dir: { control: "select", options: ["ltr", "rtl"] }
  },
  args: {
    disabled: false,
    dir: "ltr",
    min: [0, 0],
    max: [100, 100]
  }
} satisfies Meta<typeof AreaRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AreaRoot, AreaThumb },
    data: () => ({ sliderValue: [50, 50] }),
    setup: () => {
      return { args };
    },
    template: ` <AreaRoot
      v-model="sliderValue"
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="group outline-none rounded-md h-40 w-60 bg-blue-300"
      >
        <AreaThumb
          class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </AreaRoot>`
  })
};
