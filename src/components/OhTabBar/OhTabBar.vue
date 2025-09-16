<template>
  <div class="oh-tabbar">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({});
</script>

<style scoped>
.oh-tabbar {
  @apply fixed bottom-0 w-full bg-gray-800 text-white flex justify-around py-2;
}
</style>
