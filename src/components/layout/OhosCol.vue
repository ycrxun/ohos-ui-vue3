<template>
  <div 
    class="flex-shrink-0"
    :style="{ paddingLeft: `${gutter / 2}px`, paddingRight: `${gutter / 2}px` }"
    :class="colClass"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  // 栅格占据的列数
  span?: number
  //  xs (<576px) 响应式栅格数
  xs?: number
  //  sm (≥576px) 响应式栅格数
  sm?: number
  //  md (≥768px) 响应式栅格数
  md?: number
  //  lg (≥992px) 响应式栅格数
  lg?: number
  //  xl (≥1200px) 响应式栅格数
  xl?: number
  //  xxl (≥1600px) 响应式栅格数
  xxl?: number
  // 左侧偏移格数
  offset?: number
  // 行间距（从Row组件传入）
  gutter?: number
}>()

// 计算列的class
const colClass = computed(() => {
  const classList: string[] = []
  
  // 基础栅格
  if (props.span) {
    classList.push(`w-[${(props.span / 24) * 100}%]`)
  }
  
  // 响应式栅格
  const breakpoints = [
    { key: 'xs', prefix: '' },
    { key: 'sm', prefix: 'sm:' },
    { key: 'md', prefix: 'md:' },
    { key: 'lg', prefix: 'lg:' },
    { key: 'xl', prefix: 'xl:' },
    { key: 'xxl', prefix: 'xxl:' }
  ]
  
  breakpoints.forEach(({ key, prefix }) => {
    const value = props[key as keyof typeof props]
    if (value) {
      classList.push(`${prefix}w-[${(value / 24) * 100}%]`)
    }
  })
  
  // 偏移
  if (props.offset) {
    classList.push(`ml-[${(props.offset / 24) * 100}%]`)
  }
  
  return classList
})
</script>
    