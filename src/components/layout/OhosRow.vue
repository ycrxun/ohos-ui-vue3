<template>
  <div 
    class="flex flex-wrap"
    :style="{ marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` }"
    :class="{
      'justify-start': justify === 'start',
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
      'justify-between': justify === 'space-between',
      'justify-around': justify === 'space-around',
      'items-start': align === 'top',
      'items-center': align === 'middle',
      'items-end': align === 'bottom'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  // 列间距
  gutter?: number
  // 水平对齐方式
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  // 垂直对齐方式
  align?: 'top' | 'middle' | 'bottom'
}>()
</script>
    