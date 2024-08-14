import type { Meta, StoryObj } from "@storybook/vue3";
import EyeDropperRoot from "@/components/Base/EyeDropper/EyeDropperRoot.vue";
import EyeDropperTrigger from "@/components/Base/EyeDropper/EyeDropperTrigger.vue";
import { ref } from "vue";

const meta = {
  title: "Base/EyeDropper/Root",
  component: EyeDropperRoot,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "object" },
    disabled: { control: "boolean" },
    outputFormat: { control: "select", options: ["hex", "rgb", "rgba", "hsl", "hsla"] },
    onChange: { control: false }
  },
  args: {
    modelValue: [255, 155, 50],
    disabled: false,
    outputFormat: "hex",
    onChange(value) {
      console.log("onChange", value);
    }
  }
} satisfies Meta<typeof EyeDropperRoot>;

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
      <EyeDropperRoot v-model="modelValue" :disabled="args.disabled" :output-format="args.outputFormat" @change="args.onChange">
        <EyeDropperTrigger class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Eye Dropper
        </EyeDropperTrigger> 
      </EyeDropperRoot>`
  })
};
