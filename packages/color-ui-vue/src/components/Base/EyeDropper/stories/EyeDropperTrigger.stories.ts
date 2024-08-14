import type { Meta, StoryObj } from "@storybook/vue3";
import EyeDropperRoot from "@/components/Base/EyeDropper/EyeDropperRoot.vue";
import EyeDropperTrigger from "@/components/Base/EyeDropper/EyeDropperTrigger.vue";
import { ref } from "vue";

const meta = {
  title: "Base/EyeDropper/Trigger",
  component: EyeDropperTrigger,
  tags: ["autodocs"],
  argTypes: {
    asChild: { control: false },
    as: { control: false },
    disabled: { control: "boolean" }
  },
  args: {
    asChild: false,
    as: "button",
    disabled: false
  }
} satisfies Meta<typeof EyeDropperTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      EyeDropperRoot,
      EyeDropperTrigger
    },
    setup: () => {
      const modelValue = ref([255, 50, 50]);
      return { args, modelValue };
    },
    template: `<div>{{modelValue}}</div>
      <EyeDropperRoot v-model="modelValue" output-format="rgb">
        <EyeDropperTrigger class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Eye Dropper
        </EyeDropperTrigger> 
      </EyeDropperRoot>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: {
      EyeDropperRoot,
      EyeDropperTrigger
    },
    setup: () => {
      const modelValue = ref([255, 50, 50]);
      return { args, modelValue };
    },
    template: `<div>{{modelValue}}</div>
      <EyeDropperRoot v-model="modelValue" output-format="rgb">
        <EyeDropperTrigger as-child>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Eye Dropper
          </button>
        </EyeDropperTrigger> 
      </EyeDropperRoot>`
  })
};
