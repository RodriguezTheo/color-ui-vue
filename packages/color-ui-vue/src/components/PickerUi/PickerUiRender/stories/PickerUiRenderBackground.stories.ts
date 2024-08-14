import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiRenderRoot from "@/components/PickerUi/PickerUiRender/PickerUiRenderRoot.vue";
import PickerUiRenderBackground from "@/components/PickerUi/PickerUiRender/PickerUiRenderBackground.vue";
import { ref } from "vue";

const meta = {
  title: "PickerUi/Render/Background",
  component: PickerUiRenderBackground,
  tags: ["autodocs"],
  argTypes: {
    as: { control: false },
    asChild: { control: false }
  },
  args: {
    as: "span",
    asChild: false
  },
  decorators: [
    () => ({
      components: {
        PickerUiRoot
      },
      setup: () => {
        const colorSelected = ref({ r: 240, g: 98, b: 146, a: 0.5 });
        return { colorSelected };
      },
      template: `<PickerUiRoot v-model="colorSelected" allowed-alpha><story/></PickerUiRoot>`
    })
  ]
} satisfies Meta<typeof PickerUiRenderBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiRenderRoot, PickerUiRenderBackground },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRenderRoot class="h-10 w-10 block">
             <PickerUiRenderBackground :as="args.as" :as-child="args.asChild"/>
           </PickerUiRenderRoot>`
  })
};

export const AsChild: Story = {
  args: {
    ...Default.args,
    asChild: true
  },
  render: (args) => ({
    components: { PickerUiRenderRoot, PickerUiRenderBackground },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRenderRoot class="h-10 w-10">
      <PickerUiRenderBackground :as="args.as" :as-child="args.asChild">
        <div />
      </PickerUiRenderBackground>
    </PickerUiRenderRoot>`
  })
};
