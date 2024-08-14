import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiModeRoot from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import PickerUiModeTrigger from "@/components/PickerUi/PickerUiMode/PickerUiModeTrigger.vue";

const meta = {
  title: "PickerUi/Mode/Trigger",
  component: PickerUiModeTrigger,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" }
  },
  args: {
    disabled: false // Valeur par défaut pour `disabled`
  }
} satisfies Meta<typeof PickerUiModeTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiModeRoot, PickerUiModeTrigger, PickerUiRoot },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRoot>
      
   <PickerUiModeRoot
      :orientation="args.orientation"
      :disabled="args.disabled"
      class="relative flex touch-none select-none items-center justify-center"
      >
        <PickerUiModeTrigger v-slot="{ mode }">
          {{ mode }}
        </PickerUiModeTrigger>
      </PickerUiModeRoot>  </PickerUiRoot>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: { PickerUiModeRoot, PickerUiModeTrigger, PickerUiRoot },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRoot>
      
   <PickerUiModeRoot
      :orientation="args.orientation"
      :disabled="args.disabled"
      >
        <PickerUiModeTrigger v-slot="{ mode }" as-child>
         <button type="button" class="h-12 bg-red-950 text-white px-8 py-4 rounded">{{ mode }}</button>
        </PickerUiModeTrigger>
      </PickerUiModeRoot>  </PickerUiRoot>`
  })
};
