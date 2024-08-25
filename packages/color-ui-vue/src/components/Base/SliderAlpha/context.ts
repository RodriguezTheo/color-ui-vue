import { createContext } from "radix-vue";
import type { SliderAlphaProvider } from "@/components/Base/SliderAlpha/SliderAlphaRoot.vue";

export const [injectSliderAlphaRootContext, provideSliderAlphaRootContext] =
  createContext<SliderAlphaProvider>("SliderAlphaRoot");
