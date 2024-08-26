<script setup lang="ts">
type DemoHeroPreviewProps = {
  value: string;
};

defineProps<DemoHeroPreviewProps>();
</script>

<template>
  <div
    class="vp-raw p-4 bg-gradient-primary rounded-lg w-full relative items-center justify-center flex mb-4"
  >
    <div class="w-full max-w-[700px] flex items-center py-12 sm:py-[100px] custom-justify-center">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
