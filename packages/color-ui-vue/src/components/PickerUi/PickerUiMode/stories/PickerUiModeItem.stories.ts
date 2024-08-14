import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiModeRoot from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import PickerUiModeContent from "@/components/PickerUi/PickerUiMode/PickerUiModeContent.vue";
import PickerUiModeItem from "@/components/PickerUi/PickerUiMode/PickerUiModeItem.vue";
import PickerUiModeItemLabel from "@/components/PickerUi/PickerUiMode/PickerUiModeItemLabel.vue";
import PickerUiModeItemInput from "@/components/PickerUi/PickerUiMode/PickerUiModeItemInput.vue";
import { computed, ref } from "vue";

const meta = {
  title: "PickerUi/Mode/Item",
  component: PickerUiModeItem,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      table: { type: { summary: '"h" | "s" | "l" | "r" | "g" | "b" | "a" | "hex"' } }
    }
  },
  args: {
    value: "rgb"
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
                    <PickerUiModeRoot
                      class="relative flex touch-none select-none items-center justify-center"
                    >
                      <PickerUiModeContent value="rgb">
                        <story/>
                      </PickerUiModeContent>
                    </PickerUiModeRoot>
                  </PickerUiRoot>`
    })
  ]
} satisfies Meta<typeof PickerUiModeContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiModeItem, PickerUiModeItemLabel, PickerUiModeItemInput },
    setup: () => {
      return { args };
    },
    template: `<PickerUiModeItem value="r">
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
           </PickerUiModeItem>`
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
    template: `<PickerUiModeItem value="r" as-child>
              <span>
                <PickerUiModeItemLabel>R</PickerUiModeItemLabel>
                <PickerUiModeItemInput />
              </span>
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

export const WithBinding: Story = {
  render: (args) => ({
    components: {
      PickerUiModeItem,
      PickerUiModeItemLabel,
      PickerUiModeItemInput
    },
    setup: () => {
      return { args };
    },
    template: `<PickerUiModeItem value="r" v-slot="{componentField}">
             <PickerUiModeItemLabel>R</PickerUiModeItemLabel>
              <input type="text" v-bind="componentField" />
           </PickerUiModeItem>
           <PickerUiModeItem value="g" v-slot="{componentField, itemId}">
             <label :for="itemId">G</label>
             <input type="number" min="0" max="250" v-bind="componentField" />
           </PickerUiModeItem>
           <PickerUiModeItem value="b">
             <PickerUiModeItemLabel>B</PickerUiModeItemLabel>
             <PickerUiModeItemInput />
           </PickerUiModeItem>`
  })
};
