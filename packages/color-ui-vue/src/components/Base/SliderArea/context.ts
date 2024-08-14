import { createContext } from "radix-vue";
import type { SliderAreaRootProvider } from "@/components/Base/SliderArea/SliderAreaRoot.vue";

export const [injectSliderAreaRootContext, provideSliderAreaRootContext] =
  createContext<SliderAreaRootProvider>("SliderArea");
