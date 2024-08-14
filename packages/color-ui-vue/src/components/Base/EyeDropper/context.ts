import { createContext } from "radix-vue";
import type { EyeDropperRootProvider } from "@/components/Base/EyeDropper/EyeDropperRoot.vue";

export const [injectEyeDropperRootContext, provideEyeDropperRootContext] =
  createContext<EyeDropperRootProvider>("EyeDropperRoot");
