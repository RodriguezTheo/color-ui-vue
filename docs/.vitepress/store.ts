import { computed, ref } from "vue";
import type { PackageManager } from "../shared/types";
import { PACKAGE_MANAGERS } from "./config/package-manager.config";

export const useStore = () => {
  const packageManager = ref<PackageManager>(PACKAGE_MANAGERS.NPM);

  const setPackageManager = (manager: PackageManager) => (packageManager.value = manager);

  const getPackageManager = computed(() => packageManager.value);

  const cssFramework = ref<"css" | "tailwind">("tailwind");

  const setCssFramework = (framework: "css" | "tailwind") => (cssFramework.value = framework);

  const getCssFramework = computed(() => cssFramework.value);

  return {
    packageManager,
    setPackageManager,
    getPackageManager,
    cssFramework,
    setCssFramework,
    getCssFramework
  };
};
