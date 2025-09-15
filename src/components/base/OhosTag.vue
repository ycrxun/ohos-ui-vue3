<template>
  <div 
    class="inline-flex items-center rounded-full px-ohos-2 py-ohos-1 text-ohos-xs font-medium"
    :class="[
      type === 'primary' ? 'bg-ohos-primary/10 text-ohos-primary' : '',
      type === 'success' ? 'bg-ohos-success/10 text-ohos-success' : '',
      type === 'warning' ? 'bg-ohos-warning/10 text-ohos-warning' : '',
      type === 'danger' ? 'bg-ohos-danger/10 text-ohos-danger' : '',
      type === 'default' ? 'bg-ohos-bg-secondary text-ohos-text-secondary' : '',
      closable ? 'pr-ohos-1' : ''
    ]"
  >
    <slot></slot>
    
    <!-- 关闭按钮 -->
    <button
      v-if="closable"
      class="ml-ohos-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-current hover:bg-opacity-20 transition-colors"
      @click.stop="$emit('close')"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L2 6M2 2L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
    