import type { Meta, StoryObj } from "@storybook/vue3";
import RenderRoot from "@/components/Base/Render/RenderRoot.vue";
import RenderBackground from "@/components/Base/Render/RenderBackground.vue";

const meta = {
  title: "Base/Render/Root",
  component: RenderRoot,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "object" },
    alpha: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
    as: { control: false },
    hideBackground: { control: "boolean" },
    asChild: { control: false }
  },
  args: {
    color: [255, 0, 0],
    alpha: 1,
    hideBackground: false,
    as: "div",
    asChild: false
  }
} satisfies Meta<typeof RenderRoot>;

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
    template: `<RenderRoot class="h-10 w-10" :color="args.color" :alpha="args.alpha" :as="args.as" :as-child="args.asChild" :hide-background="args.hideBackground">
        <RenderBackground /> 
      </RenderRoot>`
  })
};

export const AsChild: Story = {
  args: {
    ...Default.args,
    asChild: true,
    alpha: 0.5
  },
  render: (args) => ({
    components: {
      RenderRoot,
      RenderBackground
    },
    setup: () => {
      return { args };
    },
    template: `<RenderRoot class="h-10 w-10 block" :color="args.color" :alpha="args.alpha" :as="args.as" :as-child="args.asChild" :hide-background="args.hideBackground">
      <span>
        <RenderBackground />
      </span>
    </RenderRoot>`
  })
};

export const HiddenBackground: Story = {
  args: {
    ...Default.args,
    hideBackground: true,
    alpha: 0.5
  },
  render: (args) => ({
    components: {
      RenderRoot,
      RenderBackground
    },
    setup: () => {
      return { args };
    },
    template: `<RenderRoot class="h-10 w-10" :color="args.color" :alpha="args.alpha" :as="args.as" :as-child="args.asChild" :hide-background="args.hideBackground">
        <RenderBackground />
    </RenderRoot>`
  })
};
