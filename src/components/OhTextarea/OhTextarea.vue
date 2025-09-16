<template>
  <textarea
    class="oh-textarea"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.oh-textarea {
  @apply border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none;
}
</style>