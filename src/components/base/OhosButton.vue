<template>
  <button
    class="ohos-btn"
    :class="[
      type === 'primary' ? 'bg-ohos-primary text-white hover:bg-ohos-primary/90' : '',
      type === 'secondary' ? 'bg-ohos-bg-secondary text-ohos-text-primary hover:bg-ohos-bg-tertiary' : '',
      type === 'text' ? 'bg-transparent text-ohos-text-primary hover:bg-ohos-bg-secondary' : '',
      size === 'small' ? 'px-ohos-3 py-ohos-1 text-ohos-sm' : '',
      size === 'medium' ? 'px-ohos-4 py-ohos-2 text-ohos-base' : '',
      size === 'large' ? 'px-ohos-6 py-ohos-3 text-ohos-lg' : '',
      disabled ? 'opacity-60 cursor-not-allowed' : '',
      loading ? 'opacity-80' : '',
      block ? 'w-full' : ''
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <svg 
      v-if="loading" 
      class="w-4 h-4 animate-spin" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  type?: 'primary' | 'secondary' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
    