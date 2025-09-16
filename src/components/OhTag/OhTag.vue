<template>
  <span class="oh-tag" :class="`oh-tag--${type}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
});
</script>

<style scoped>
.oh-tag {
  @apply px-2 py-1 text-sm rounded font-medium;
}
.oh-tag--default {
  @apply bg-gray-500 text-white;
}
.oh-tag--success {
  @apply bg-green-500 text-white;
}
.oh-tag--warning {
  @apply bg-yellow-500 text-white;
}
.oh-tag--error {
  @apply bg-red-500 text-white;
}
</style>