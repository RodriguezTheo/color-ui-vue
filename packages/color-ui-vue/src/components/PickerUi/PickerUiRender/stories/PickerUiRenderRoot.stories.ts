import type { Meta, StoryObj } from "@storybook/vue3";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiRenderRoot from "@/components/PickerUi/PickerUiRender/PickerUiRenderRoot.vue";
import PickerUiRenderBackground from "@/components/PickerUi/PickerUiRender/PickerUiRenderBackground.vue";
import { ref } from "vue";

const meta = {
  title: "PickerUi/Render/Root",
  component: PickerUiRenderRoot,
  tags: ["autodocs"],
  argTypes: {
    hideBackground: { control: "boolean" },
    as: { control: false },
    asChild: { control: false }
  },
  args: {
    hideBackground: false,
    as: "div",
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
} satisfies Meta<typeof PickerUiRenderRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiRenderRoot, PickerUiRenderBackground },
    setup: () => {
      return { args };
    },
    template: `<PickerUiRenderRoot class="h-10 w-10" :as="args.as" :as-child="args.asChild" :hide-background="args.hideBackground">
             <PickerUiRenderBackground />
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
    template: `<PickerUiRenderRoot class="h-10 w-10 block" :as="args.as" :as-child="args.asChild" :hide-background="args.hideBackground">
              <span>
             <PickerUiRenderBackground />
              </span>
           </PickerUiRenderRoot>`
  })
};
