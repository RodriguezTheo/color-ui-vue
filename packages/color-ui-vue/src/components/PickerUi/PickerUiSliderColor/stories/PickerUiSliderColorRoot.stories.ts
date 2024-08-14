import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiSliderColorRoot from "@/components/PickerUi/PickerUiSliderColor/PickerUiSliderColorRoot.vue";
import PickerUiSliderColorThumb from "@/components/PickerUi/PickerUiSliderColor/PickerUiSliderColorThumb.vue";

const meta = {
  title: "PickerUi/SliderColor",
  component: PickerUiSliderColorRoot,
  subcomponents: { PickerUiSliderColorThumb },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false
  }
} satisfies Meta<typeof PickerUiSliderColorRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiSliderColorRoot, PickerUiSliderColorThumb, PickerUiRoot },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRoot> 
        <PickerUiSliderColorRoot
        :orientation="args.orientation"
        :disabled="args.disabled"
        class="relative flex touch-none select-none items-center justify-center rounded-full"
        :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
        >
          <PickerUiSliderColorThumb           
            class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </PickerUiSliderColorRoot>
    </PickerUiRoot>`
  })
};
