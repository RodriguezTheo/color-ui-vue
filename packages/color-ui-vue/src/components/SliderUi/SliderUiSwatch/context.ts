import { createContext } from "radix-vue";
import type { SliderUiSwatchRootProvider } from "@/components/SliderUi/SliderUiSwatch/SliderUiSwatchRoot.vue";

export const [injectSliderUiSwatchContext, provideSliderUiSwatchContext] =
  createContext<SliderUiSwatchRootProvider>("SliderUiSwatch");
