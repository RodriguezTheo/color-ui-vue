import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiSliderMainRoot from "@/components/PickerUi/PickerUiSliderMain/PickerUiSliderMainRoot.vue";
import PickerUiSliderMainThumb from "@/components/PickerUi/PickerUiSliderMain/PickerUiSliderMainThumb.vue";
import { computed, ref } from "vue";

const meta = {
  title: "PickerUi/SliderMain",
  component: PickerUiSliderMainRoot,
  subcomponents: { PickerUiSliderMainThumb },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" }
  },
  args: {
    disabled: false
  },
  decorators: [
    () => ({
      components: {
        PickerUiRoot
      },
      setup: () => {
        const colorSelected = ref({ r: 240, g: 98, b: 146 });
        const stylesColor = computed(() => {
          return `rgb(${colorSelected.value.r}, ${colorSelected.value.g}, ${colorSelected.value.b})`;
        });
        return { colorSelected, stylesColor };
      },
      template: `<div class="min-h-10 max-w-10" :style="{backgroundColor: stylesColor}" />
                  <PickerUiRoot v-model="colorSelected">
                    <story/>
                  </PickerUiRoot>`
    })
  ]
} satisfies Meta<typeof PickerUiSliderMainRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiSliderMainRoot, PickerUiSliderMainThumb },
    setup: () => {
      return { args };
    },
    template: `<PickerUiSliderMainRoot class="group outline-none h-40 w-80" :disabled="args.disabled" :orientation="args.orientation">
              <PickerUiSliderMainThumb
                class="block h-5 w-5 rounded-full cursor-pointer data-[disabled=true]:cursor-not-allowed border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
           </PickerUiSliderMainRoot>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: { PickerUiSliderMainRoot, PickerUiSliderMainThumb },
    setup: () => {
      return { args };
    },
    template: `<PickerUiSliderMainRoot class="group outline-none h-40 w-80 block" :disabled="args.disabled" :orientation="args.orientation" as-child>
              <span>
              <PickerUiSliderMainThumb
                class="block h-5 w-5 rounded-full cursor-pointer data-[disabled=true]:cursor-not-allowed border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
              </span>
           </PickerUiSliderMainRoot>`
  })
};
