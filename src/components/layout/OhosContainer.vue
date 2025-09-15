<template>
  <div 
    class="mx-auto px-ohos-4"
    :class="{
      'max-w-xs': size === 'xs',
      'max-w-sm': size === 'sm',
      'max-w-md': size === 'md',
      'max-w-lg': size === 'lg',
      'max-w-xl': size === 'xl',
      'max-w-2xl': size === '2xl',
      'max-w-3xl': size === '3xl',
      'max-w-4xl': size === '4xl',
      'max-w-5xl': size === '5xl',
      'max-w-6xl': size === '6xl',
      'max-w-7xl': size === '7xl',
      'max-w-none': size === 'full'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  // 容器大小
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}>()
</script>
    