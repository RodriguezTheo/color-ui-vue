import { createContext } from "radix-vue";
import type { PickerUiHistoryRootProvider } from "@/components/PickerUi/PickerUiHistory/PickerUiHistoryRoot.vue";

export const [injectPickerUiHistoryRootContext, providePickerUiHistoryContext] =
  createContext<PickerUiHistoryRootProvider>("PickerUiMode");
