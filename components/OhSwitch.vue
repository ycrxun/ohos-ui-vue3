<template>
  <label class="oh-switch">
    <input class="oh-switch__input" type="checkbox" v-model="modelValue" />
    <span class="oh-switch__slider" />
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.oh-switch {
  @apply inline-flex items-center;
}
.oh-switch__input {
  @apply hidden;
}
.oh-switch__slider {
  @apply w-10 h-5 bg-gray-200 rounded-full relative transition;
}
.oh-switch__input:checked + .oh-switch__slider {
  @apply bg-blue-500;
}
.oh-switch__slider::after {
  @apply content-[''] w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition;
}
.oh-switch__input:checked + .oh-switch__slider::after {
  @apply translate-x-5;
}
</style>