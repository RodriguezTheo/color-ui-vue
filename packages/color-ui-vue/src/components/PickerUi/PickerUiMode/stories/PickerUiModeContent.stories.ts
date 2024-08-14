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
  title: "PickerUi/Mode/Content",
  component: PickerUiModeContent,
  tags: ["autodocs"],
  argTypes: {
    value: { control: false }
  },
  args: {
    value: "rgb"
  }
} satisfies Meta<typeof PickerUiModeContent>;

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
      const colorSelected = ref({ r: 240, g: 98, b: 146 });
      const stylesColor = computed(() => {
        return `rgb(${colorSelected.value.r}, ${colorSelected.value.g}, ${colorSelected.value.b})`;
      });
      return { args, colorSelected, stylesColor };
    },
    template: `<div class="min-h-10 max-w-10" :style="{backgroundColor: stylesColor}" />
      <PickerUiRoot v-model="colorSelected">
        <PickerUiModeRoot
        :orientation="args.orientation"
        :disabled="args.disabled"
        class="relative flex touch-none select-none items-center justify-center"
        >
         <PickerUiModeContent :value="args.value">
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
         </PickerUiModeContent>
        </PickerUiModeRoot>  
      </PickerUiRoot>`
  })
};

export const AsChild: Story = {
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
    template: `<PickerUiRoot>
      <PickerUiModeRoot
        :orientation="args.orientation"
        :disabled="args.disabled"
        as-child
      >
        <span>
          <PickerUiModeContent :value="args.value">
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
          </PickerUiModeContent>
        </span>
      </PickerUiModeRoot> 
    </PickerUiRoot>`
  })
};
