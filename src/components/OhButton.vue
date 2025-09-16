<template>
  <button class="oh-button" :class="`oh-button--${type}`" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.oh-button {
  @apply px-4 py-2 rounded text-white font-medium transition;
}
.oh-button--default {
  @apply bg-gray-500 hover:bg-gray-600;
}
.oh-button--primary {
  @apply bg-blue-500 hover:bg-blue-600;
}
.oh-button--danger {
  @apply bg-red-500 hover:bg-red-600;
}
</style>