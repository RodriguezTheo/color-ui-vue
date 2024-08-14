import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiModeRoot from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import PickerUiModeContent from "@/components/PickerUi/PickerUiMode/PickerUiModeContent.vue";
import PickerUiEyeDropperRoot from "@/components/PickerUi/PickerUiEyeDropper/PickerUiEyeDropperRoot.vue";
import PickerUiEyeDropperTrigger from "@/components/PickerUi/PickerUiEyeDropper/PickerUiEyeDropperTrigger.vue";
import { computed, ref } from "vue";

const meta = {
  title: "PickerUi/EyeDropper/Root",
  component: PickerUiEyeDropperRoot,
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
        PickerUiRoot,
        PickerUiModeRoot,
        PickerUiModeContent
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
} satisfies Meta<typeof PickerUiEyeDropperRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      PickerUiEyeDropperRoot,
      PickerUiEyeDropperTrigger
    },
    setup: () => {
      const colorSelected = ref({ r: 240, g: 98, b: 146 });
      const stylesColor = computed(() => {
        return `rgb(${colorSelected.value.r}, ${colorSelected.value.g}, ${colorSelected.value.b})`;
      });
      return { args, colorSelected, stylesColor };
    },
    template: `<PickerUiEyeDropperRoot :disabled="args.disabled">
        <PickerUiEyeDropperTrigger>
          Eye Dropper
        </PickerUiEyeDropperTrigger>
      </PickerUiEyeDropperRoot>`
  })
};
