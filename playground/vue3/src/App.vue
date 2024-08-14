<script setup lang="ts">
import PickerUi from '@/components/PickerUi.vue'
</script>

<template>
  <main class="flex justify-center items-center h-screen dark:bg-background">
    <div class="w-80 border p-4 rounded">
      <PickerUi />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
