import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiSliderAlphaRoot from "@/components/PickerUi/PickerUiSliderAlpha/PickerUiSliderAlphaRoot.vue";
import PickerUiSliderAlphaThumb from "@/components/PickerUi/PickerUiSliderAlpha/PickerUiSliderAlphaThumb.vue";

const meta = {
  title: "PickerUi/SliderAlpha",
  component: PickerUiSliderAlphaRoot,
  subcomponents: { PickerUiSliderAlphaThumb },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" }
  },
  args: {
    orientation: "horizontal",
    disabled: false
  }
} satisfies Meta<typeof PickerUiSliderAlphaRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiSliderAlphaRoot, PickerUiSliderAlphaThumb, PickerUiRoot },
    data: () => ({ sliderValue: 50 }),
    setup: () => {
      return { args };
    },
    template: `<PickerUiRoot allowed-alpha> 
        <PickerUiSliderAlphaRoot
        v-model="sliderValue"
        :orientation="args.orientation"
        :disabled="args.disabled"
        class="relative flex h-3 touch-none select-none items-center justify-center rounded-full"
        :class="[args.orientation === 'horizontal' ? 'h-3 w-full' : 'w-3 h-40']"
        >
          <PickerUiSliderAlphaThumb           
            class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </PickerUiSliderAlphaRoot>
    </PickerUiRoot>`
  })
};
