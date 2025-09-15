<template>
  <div 
    class="my-ohos-4"
    :class="[
      direction === 'horizontal' ? 'w-full h-px bg-ohos-bg-tertiary' : '',
      direction === 'vertical' ? 'inline-block w-px h-6 bg-ohos-bg-tertiary mx-ohos-2' : '',
      dashed ? 'border-dashed' : 'border-solid'
    ]"
  >
    <div v-if="hasText" class="flex items-center justify-center">
      <div class="w-1/4 h-px bg-ohos-bg-tertiary"></div>
      <span class="mx-ohos-2 text-ohos-sm text-ohos-text-secondary">{{ text }}</span>
      <div class="w-1/4 h-px bg-ohos-bg-tertiary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  // 方向
  direction?: 'horizontal' | 'vertical'
  // 是否虚线
  dashed?: boolean
  // 是否带有文本
  hasText?: boolean
  // 文本内容
  text?: string
}>()
</script>
    