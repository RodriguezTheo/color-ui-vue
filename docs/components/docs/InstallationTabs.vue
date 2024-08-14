<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger, TabsIndicator } from "radix-vue";
import { useStore } from "../../.vitepress/store";
import { PACKAGE_MANAGERS_ALLOWED } from "../../.vitepress/config/package-manager.config";

const { packageManager } = useStore();

type InstallationTabsProps = {
  value: string;
};

defineProps<InstallationTabsProps>();
</script>

<template>
  <TabsRoot
    v-model="packageManager"
    class="bg-[var(--vp-code-block-bg)] border border-neutral-700/40 rounded-lg overflow-hidden"
  >
    <div class="bg-[var(--vp-code-block-bg)] border-b-2 border-[#272727] flex pr-2">
      <div class="flex justify-between items-center w-full text-[13px]">
        <TabsList class="shrink-0 flex relative">
          <TabsIndicator
            class="absolute z-50 left-0 h-[2px] -bottom-0.5 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-150"
          >
            <div class="bg-primary w-full h-full" />
          </TabsIndicator>
          <TabsTrigger
            v-for="pkg in PACKAGE_MANAGERS_ALLOWED"
            :key="pkg"
            :value="pkg"
            tabindex="-1"
            class="text-white/70 py-2.5 px-4 border-box data-[state=active]:font-medium data-[state=active]:text-primary"
          >
            {{ pkg }}
          </TabsTrigger>
        </TabsList>
      </div>
    </div>

    <div class="[&_>div]:!m-0 custom">
      <TabsContent v-for="pkg in PACKAGE_MANAGERS_ALLOWED" :key="pkg" :value="pkg" as-child>
        <slot :name="pkg" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>
