<template>
  <div class="oh-collapse">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({});
</script>

<style scoped>
.oh-collapse {
  @apply border rounded;
}
</style>