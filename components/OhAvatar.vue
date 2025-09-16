<template>
  <div class="oh-avatar" :style="{ width: size + 'px', height: size + 'px' }">
    <img class="oh-avatar__image" :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 40,
  },
});
</script>

<style scoped>
.oh-avatar {
  @apply rounded-full overflow-hidden;
}
.oh-avatar__image {
  @apply w-full h-full object-cover;
}
</style>