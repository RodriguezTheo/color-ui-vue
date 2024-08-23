<script setup lang="ts">
type PropDef = {
  name?: string;
  required?: boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

interface EmitsTableProps {
  data: PropDef[];
}
const props = defineProps<EmitsTableProps>();
</script>

<template>
  <div class="-mx-6 md:mx-0 overflow-x-auto mb-12 mt-5 relative rounded-lg">
    <table class="w-full !table border-b border-[var(--vp-c-divider)] border-x !my-0">
      <thead>
        <tr class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)]">
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <span>Emit</span>
          </th>
          <th class="h-10 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <span>Payload</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(prop, index) in props.data"
          :key="`${prop.name}-${index}`"
          class="rounded-md overflow-hidden dark:!bg-[var(--vp-code-block-bg)]"
        >
          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <div class="flex items-center gap-1">
              <code class="py-0.5 px-1 rounded-none inline dark:!bg-primary/10 dark:!text-primary">
                {{ prop.name }}{{ prop.required ? "*" : null }}
              </code>
            </div>
          </td>
          <td class="h-12 pb-1 [&:not(:first-child)]:pl-4 text-left">
            <code
              class="py-0.5 px-1 rounded-none inline dark:!bg-neutral-600/30 dark:!text-neutral-400"
            >
              {{ prop.type }}
            </code>
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
