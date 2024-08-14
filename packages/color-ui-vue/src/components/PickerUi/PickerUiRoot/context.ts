import type { PickerUiRootProvider } from "@/components/PickerUi/PickerUiRoot";
import { createContext } from "radix-vue";

export const [injectPickerUiRootContext, providePickerUiRootContext] =
  createContext<PickerUiRootProvider>("PickerUiRoot");
