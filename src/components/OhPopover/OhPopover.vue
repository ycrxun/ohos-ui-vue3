<template>
  <div class="oh-popover">
    <slot name="trigger" />
    <div v-if="visible" class="oh-popover__content">
      <slot />
    </div>
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
.oh-popover {
  @apply relative;
}
.oh-popover__content {
  @apply absolute bg-white border p-2 shadow rounded;
}
</style>