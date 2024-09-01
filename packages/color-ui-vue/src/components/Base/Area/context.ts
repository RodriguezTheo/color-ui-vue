import type { AreaRootProvider } from "@/components/Base/Area/AreaRoot.vue";
import { createContext } from "radix-vue";
import type { AreaOrientationPrivateProps } from "@/components/Base/Area/utils";

export const [injectAreaRootContext, provideAreaRootContext] =
  createContext<AreaRootProvider>("AreaRoot");

export const [injectAreaOrientationContext, provideAreaOrientationContext] =
  createContext<AreaOrientationPrivateProps>(["SliderVertical", "SliderHorizontal"]);
