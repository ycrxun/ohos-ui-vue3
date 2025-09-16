<template>
  <div class="oh-grid">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({});
</script>

<style scoped>
.oh-grid {
  @apply grid grid-cols-2 gap-4;
}
</style>