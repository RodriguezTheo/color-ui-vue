import { createContext } from "radix-vue";
import type { PickerUiModeRootProvider } from "@/components/PickerUi/PickerUiMode/PickerUiModeRoot.vue";
import type { PickerUiModeItemProvider } from "@/components/PickerUi/PickerUiMode/PickerUiModeItem.vue";

export const [injectPickerUiModeRootContext, providePickerUiModeRootContext] =
  createContext<PickerUiModeRootProvider>("PickerUiMode");

export const [injectPickerUiModeItemContext, providePickerUiModeItemContext] =
  createContext<PickerUiModeItemProvider>("PickerUiModeItem");
