<template>
  <nav class="oh-navbar">
    <slot name="left" />
    <h1 class="oh-navbar__title"><slot /></h1>
    <slot name="right" />
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.oh-navbar {
  @apply flex items-center justify-between px-4 py-2 bg-gray-800 text-white;
}
.oh-navbar__title {
  @apply text-lg font-bold;
}
</style>
