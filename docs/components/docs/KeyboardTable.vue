<script setup lang="ts">
type KeyboardDef = {
  keys: string[];
  description: string;
};

interface DataAttributesTableProps {
  data: KeyboardDef[];
}
const props = defineProps<DataAttributesTableProps>();
</script>

<template>
  <div class="-mx-6 md:mx-0 overflow-x-auto mb-12 mt-5 relative rounded-lg">
    <table class="w-full !table border-b border-[var(--vp-c-divider)] border-x !my-0">
      <thead>
        <tr class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)]">
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <span>Key</span>
          </th>
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <span>Description</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(prop, index) in props.data"
          :key="`${prop}-${index}`"
          class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)]"
        >
          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <div class="flex items-center gap-1">
              <kbd
                v-for="(key, propIndex) in prop.keys"
                :key="`${key}-${propIndex}`"
                class="font-sans rounded-md border bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 border-b-2 px-1.5 py-[1px]"
              >
                {{ key }}
              </kbd>
            </div>
          </td>
          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <div class="flex items-center gap-1">
              <span v-html="prop.description" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
th > * {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
