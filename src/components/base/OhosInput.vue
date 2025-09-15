<template>
  <div class="relative">
    <input
      class="ohos-input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @keydown.enter="$emit('enter')"
    >
    
    <!-- 清除按钮 -->
    <button
      v-if="clearable && modelValue && !disabled && !readonly"
      class="absolute right-ohos-2 top-1/2 transform -translate-y-1/2 text-ohos-text-tertiary hover:text-ohos-text-primary"
      @click.stop="$emit('update:modelValue', '')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: 'text' | 'password' | 'number' | 'tel' | 'email'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  maxlength?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'enter'): void
}>()
</script>
    