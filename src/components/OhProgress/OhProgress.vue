<template>
  <div class="oh-progress">
    <div class="oh-progress__bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.oh-progress {
  @apply w-full h-4 bg-gray-200 rounded overflow-hidden;
}
.oh-progress__bar {
  @apply h-full bg-blue-500 transition-all;
}
</style>