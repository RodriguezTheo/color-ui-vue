import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import PickerUiRoot from "@/components/PickerUi/PickerUiRoot/PickerUiRoot.vue";
import PickerUiHistoryRoot from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryRoot.vue";
import PickerUiHistoryListItem from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryListItem.vue";
import PickerUiHistoryList from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryList.vue";

const meta = {
  title: "PickerUi/History/List",
  component: PickerUiHistoryList,
  tags: ["autodocs"],
  args: {
    as: "div",
    asChild: false
  },
  decorators: [
    () => ({
      components: {
        PickerUiRoot
      },
      setup: () => {
        const colorSelected = ref({ r: 0, g: 98, b: 146, a: 1 });
        return { colorSelected };
      },
      template: `<PickerUiRoot v-model="colorSelected" allowed-alpha>
        <story/>
      </PickerUiRoot>`
    })
  ]
} satisfies Meta<typeof PickerUiHistoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PickerUiHistoryRoot, PickerUiHistoryListItem, PickerUiHistoryList },
    setup: () => {
      return { args };
    },
    template: `<PickerUiHistoryRoot>
      <PickerUiHistoryList class="flex gap-x-2">
        <PickerUiHistoryListItem class="h-10 w-10 rounded-md" />
      </PickerUiHistoryList>
    </PickerUiHistoryRoot>`
  })
};

export const AsChild: Story = {
  render: (args) => ({
    components: { PickerUiHistoryRoot, PickerUiHistoryListItem, PickerUiHistoryList },
    setup: () => {
      return { args };
    },
    template: `<PickerUiHistoryRoot>
      <PickerUiHistoryList class="flex gap-x-2" as-child>
        <section>
        <PickerUiHistoryListItem class="h-10 w-10 rounded-md" />
        </section>
      </PickerUiHistoryList>
    </PickerUiHistoryRoot>`
  })
};
