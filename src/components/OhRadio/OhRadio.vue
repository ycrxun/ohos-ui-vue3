<template>
  <label class="oh-radio">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />
    <span class="oh-radio__label"><slot /></span>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
});
</script>

<style scoped>
.oh-radio {
  @apply flex items-center cursor-pointer;
}
.oh-radio input {
  @apply hidden;
}
.oh-radio__label {
  @apply ml-2;
}
</style>