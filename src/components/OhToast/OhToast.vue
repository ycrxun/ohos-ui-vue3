<template>
  <div v-if="visible" class="oh-toast">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.oh-toast {
  @apply fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow;
}
</style>