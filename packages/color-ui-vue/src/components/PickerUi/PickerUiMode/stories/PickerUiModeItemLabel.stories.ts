import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiModeRoot from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import PickerUiModeTrigger from "@/components/PickerUi/PickerUiMode/PickerUiModeTrigger.vue";
import PickerUiModeContent from "@/components/PickerUi/PickerUiMode/PickerUiModeContent.vue";
import PickerUiModeItem from "@/components/PickerUi/PickerUiMode/PickerUiModeItem.vue";
import PickerUiModeItemLabel from "@/components/PickerUi/PickerUiMode/PickerUiModeItemLabel.vue";
import PickerUiModeItemInput from "@/components/PickerUi/PickerUiMode/PickerUiModeItemInput.vue";
import { computed, ref } from "vue";

const meta = {
  title: "PickerUi/Mode/Item/Label",
  component: PickerUiModeItemLabel,
  tags: ["autodocs"],
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
                    <PickerUiModeRoot
                      class="relative flex touch-none select-none items-center justify-center"
                    >
                      <PickerUiModeContent value="rgb">
                        <story />
                      </PickerUiModeContent>
                    </PickerUiModeRoot>
                  </PickerUiRoot>`
    })
  ]
} satisfies Meta<typeof PickerUiModeItemLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      PickerUiModeRoot,
      PickerUiModeContent,
      PickerUiModeTrigger,
      PickerUiRoot,
      PickerUiModeItem,
      PickerUiModeItemLabel,
      PickerUiModeItemInput
    },
    setup: () => {
      return { args };
    },
    template: `
         <PickerUiModeContent value="rgb">
           <PickerUiModeItem value="r">
             <PickerUiModeItemLabel>R</PickerUiModeItemLabel>
              <PickerUiModeItemInput />
           </PickerUiModeItem>
           <PickerUiModeItem value="g">
             <PickerUiModeItemLabel>G</PickerUiModeItemLabel>
             <PickerUiModeItemInput />
           </PickerUiModeItem>
           <PickerUiModeItem value="b">
             <PickerUiModeItemLabel>B</PickerUiModeItemLabel>
             <PickerUiModeItemInput />
           </PickerUiModeItem>
         </PickerUiModeContent>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: {
      PickerUiModeItem,
      PickerUiModeItemLabel,
      PickerUiModeItemInput
    },
    setup: () => {
      return { args };
    },
    template: `
            <PickerUiModeItem value="r">
                <PickerUiModeItemLabel as-child>
                  <label class="bg-red-500">R</label>
                </PickerUiModeItemLabel>
                <PickerUiModeItemInput />
            </PickerUiModeItem>
            <PickerUiModeItem value="g">
              <PickerUiModeItemLabel>G</PickerUiModeItemLabel>
              <PickerUiModeItemInput />
            </PickerUiModeItem>
            <PickerUiModeItem value="b">
              <PickerUiModeItemLabel>B</PickerUiModeItemLabel>
              <PickerUiModeItemInput />
            </PickerUiModeItem>`
  })
};
