<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger
} from "radix-vue";

import { useStore } from "../../.vitepress/store";
import { capitalize, computed, onMounted, ref, watch, nextTick } from "vue";

const { cssFramework } = useStore();

type InstallationTabsProps = {
  value: string;
};

defineProps<InstallationTabsProps>();

const slotsTabs = ["indexCss", "styleCss", "indexVue", "tailwind"] as const;

const vModel = ref<"indexCss" | "styleCss" | "tailwind" | "indexVue">("indexVue");

const tabsLabel = {
  indexVue: "index.vue",
  tailwind: "tailwind.config.ts",
  styleCss: "style.css",
  indexCss: "index.vue"
} as const;

const tabs = computed(() => {
  if (cssFramework.value === "tailwind") {
    return ["indexVue", "tailwind"] as const;
  }
  return ["indexCss", "styleCss"] as const;
});

const cssFrameworkOptions = computed(() => [
  { label: "TailwindCSS", value: "tailwind" },
  { label: "CSS", value: "css" }
]);

const open = ref(false);
const isMountAnimationPrevented = ref(open.value);

const codeScrollWrapper = ref<HTMLElement[] | undefined>();
const tabsPreview = ref<HTMLElement | undefined>();

const height = ref(0);

const computedStyle = computed(() => {
  return `${height.value}px`;
});

const toggleCollapseCode = () => {
  open.value = !open.value;
};

const updateHeight = async () => {
  await nextTick();
  if (!codeScrollWrapper.value) return;
  const el = codeScrollWrapper.value.find((el) => el.dataset.state === "open");
  if (el) {
    el.scrollTo({ top: 0, behavior: "auto" });
  }
  const elHeight = getComputedStyle(el as HTMLElement).height;
  requestAnimationFrame(() => {
    height.value = Math.min(parseInt(elHeight), 600);
  });
};

watch([open, vModel], async () => {
  if (open.value) isMountAnimationPrevented.value = true;

  await updateHeight();
});

onMounted(() => {
  if (!tabsPreview.value) return;
  const el = tabsPreview.value.querySelector('[data-state="open"]');
  if (el) {
    const test = getComputedStyle(el.children[0] as HTMLElement).height;
    height.value = Math.max(parseInt(test), 600);
  }
});
</script>

<template>
  <TabsRoot
    v-model="vModel"
    class="bg-[var(--vp-code-block-bg)] border border-neutral-700/40 rounded-lg overflow-hidden"
  >
    <div class="bg-[var(--vp-code-block-bg)] border-b-2 border-[#272727] flex pr-2">
      <div class="flex relative justify-between items-center w-full text-[13px]">
        <TabsList class="flex">
          <TabsIndicator
            class="absolute z-50 left-0 h-[2px] -bottom-0.5 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-150"
          >
            <div class="bg-primary w-full h-full" />
          </TabsIndicator>
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab"
            :value="tab"
            tabindex="-1"
            class="text-white/70 py-2.5 px-4 border-box data-[state=active]:font-medium data-[state=active]:text-primary"
          >
            {{ tabsLabel[tab] }}
          </TabsTrigger>
        </TabsList>
        <div>
          <SelectRoot
            v-model="cssFramework"
            @update:model-value="vModel = cssFramework === 'tailwind' ? 'indexVue' : 'indexCss'"
          >
            <SelectTrigger
              class="flex items-center justify-between bg-stone-800 rounded w-[115px] text-white text-xs py-1 px-2"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                position="popper"
                side="bottom"
                :side-offset="4"
                class="border border-stone-700 min-w-[115px] bg-stone-800 rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
              >
                <SelectViewport class="p-[5px]">
                  <SelectItem
                    v-for="framework in cssFrameworkOptions"
                    :key="framework.label"
                    class="text-xs leading-none text-white rounded-[3px] flex items-center h-[25px] px-2 relative select-none data-[disabled]:text-red-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary"
                    :value="framework.value"
                  >
                    <SelectItemText>
                      {{ capitalize(framework.label) }}
                    </SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>
    </div>

    <div
      ref="tabsPreview"
      class="relative"
      :class="{
        'data-[state=open]:animate-code-down data-[state=closed]:animate-code-up':
          isMountAnimationPrevented,
        [`--code-content-height`]: `${computedStyle}`
      }"
      :data-state="open ? 'open' : 'closed'"
    >
      <template v-for="slotTab in slotsTabs" :key="slotTab">
        <div
          ref="codeScrollWrapper"
          v-show="vModel === slotTab"
          :data-state="vModel === slotTab ? 'open' : 'closed'"
          class="custom w-full"
          :class="[open ? `max-h-[600px] overflow-auto` : 'h-40 overflow-hidden']"
        >
          <slot v-if="tabs.includes(slotTab as never)" :name="slotTab" />
        </div>
      </template>

      <div
        v-if="!open"
        class="bg-gradient-to-t z-20 from-[#161618FF] to-[#16161800] bottom-[1px] left-[1px] right-[1px] h-20 flex items-center justify-center absolute rounded-b-lg"
      />
    </div>
  </TabsRoot>
  <div class="flex justify-center mt-4">
    <button
      class="bg-primary/10 text-primary hover:bg-primary-hover/10 hover:text-primary-hover transition-all ease-in cursor-pointer px-3 py-1 rounded border duration-150"
      @click="() => toggleCollapseCode()"
    >
      {{ open ? "Collapse code" : "Expand code" }}
    </button>
  </div>
</template>

<style scoped>
:slotted(.vp-doc div[class*="language-"]:not(:where(.vp-raw, .vp-raw *))),
:slotted(.vp-block:not(:where(.vp-raw, .vp-raw *))) {
  overflow-x: initial;
}

:slotted(.shiki.vp-code) {
  width: 100%;
  overflow-x: inherit;
}
</style>

<style>
:root {
  --code-content-height: v-bind(computedStyle);
}
</style>
