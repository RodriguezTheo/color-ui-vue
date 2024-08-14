import { createContext } from "radix-vue";
import type { RenderRootProvider } from "@/components/Base/Render/RenderRoot.vue";

export const [injectRenderRootContext, provideRenderRootContext] =
  createContext<RenderRootProvider>("RenderRoot");
