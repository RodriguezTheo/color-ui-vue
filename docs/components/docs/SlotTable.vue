<script setup lang="ts">
type PropDef = {
  name?: string;
  required?: boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

interface PropsTableProps {
  data: PropDef[];
}
const props = defineProps<PropsTableProps>();
</script>

<template>
  <div class="-mx-6 md:mx-0 overflow-x-auto mb-12 mt-5 relative rounded-lg">
    <table class="w-full !table border-b border-border border-x my-0 rounded-lg">
      <thead class="rounded-lg">
        <tr class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)] *:my-0">
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left w-1/3">
            <span>Slots (default)</span>
          </th>
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <span>Payload</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)]"
          v-for="(prop, index) in props.data"
          :key="`${prop.name}-${index}`"
        >
          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <div class="flex h-full items-start gap-1">
              <code
                class="py-0.5 px-1 rounded-none inline dark:!bg-primary/10 dark:!text-primary !text-[13px]"
              >
                {{ prop.name }}
              </code>
            </div>
          </td>

          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <div class="flex items-center gap-1">
              <div>
                <code
                  class="py-0.5 px-1 rounded-none inline dark:!bg-neutral-600/30 dark:!text-neutral-400"
                >
                  {{ prop.type }}
                </code>
                <div
                  class="vp-raw [&_a]:underline flex flex-col gap-2 mt-2 text-sm dark:text-neutral-300"
                  v-html="prop.description"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
