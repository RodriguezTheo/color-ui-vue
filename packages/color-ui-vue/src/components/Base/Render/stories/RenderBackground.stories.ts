import type { Meta, StoryObj } from "@storybook/vue3";
import RenderRoot from "@/components/Base/Render/RenderRoot.vue";
import RenderBackground from "@/components/Base/Render/RenderBackground.vue";

const meta = {
  title: "Base/Render/Background",
  component: RenderBackground,
  tags: ["autodocs"],
  argTypes: {
    as: { control: false },
    asChild: { control: false }
  },
  args: {
    as: "span",
    asChild: false
  }
} satisfies Meta<typeof RenderBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      RenderRoot,
      RenderBackground
    },
    setup: () => {
      return { args };
    },
    template: `<RenderRoot class="h-10 w-10" :color="[255, 0, 0]" :alpha="0.5">
        <RenderBackground :as="args.as" :as-child="args.asChild" /> 
      </RenderRoot>`
  })
};

export const AsChild: Story = {
  args: {
    ...Default.args,
    asChild: true
  },
  render: (args) => ({
    components: {
      RenderRoot,
      RenderBackground
    },
    setup: () => {
      return { args };
    },
    template: `<RenderRoot class="h-10 w-10" :color="[255, 0, 0]" :alpha="0.5">
      <RenderBackground :as="args.as" :as-child="args.asChild">
        <div />
      </RenderBackground>
    </RenderRoot>`
  })
};
