import type { SliderUiRootProvider } from "@/components/SliderUi/SliderUiRoot/SliderUiRoot.vue";
import { createContext } from "radix-vue";

export const [injectSliderUiRootContext, provideSliderUiRootContext] =
  createContext<SliderUiRootProvider>("SliderUiRoot");
