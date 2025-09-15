<template>
  <div class="flex flex-wrap items-center justify-between gap-ohos-4">
    <!-- 分页信息 -->
    <div class="text-ohos-sm text-ohos-text-secondary">
      共 {{ total }} 条，当前 {{ currentPage }} / {{ totalPages }} 页
    </div>
    
    <!-- 分页控制器 -->
    <div class="flex items-center gap-ohos-1">
      <!-- 每页条数选择 -->
      <select
        class="text-ohos-sm border border-ohos-bg-tertiary rounded-ohos px-ohos-2 py-ohos-1"
        :value="pageSize"
        @change="$emit('update:pageSize', Number($event.target.value))"
      >
        <option value="5">5条/页</option>
        <option value="10">10条/页</option>
        <option value="20">20条/页</option>
        <option value="50">50条/页</option>
      </select>
      
      <!-- 页码按钮 -->
      <button
        class="w-8 h-8 flex items-center justify-center rounded-ohos border border-ohos-bg-tertiary"
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', 1)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11L3 6L8 1M11 11L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <button
        class="w-8 h-8 flex items-center justify-center rounded-ohos border border-ohos-bg-tertiary"
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11L3 6L8 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <!-- 页码列表 -->
      <template v-for="page in pageNumbers" :key="page">
        <button
          class="w-8 h-8 flex items-center justify-center rounded-ohos"
          :class="{
            'bg-ohos-primary text-white': page === currentPage,
            'border border-ohos-bg-tertiary': page !== currentPage
          }"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
      </template>
      
      <button
        class="w-8 h-8 flex items-center justify-center rounded-ohos border border-ohos-bg-tertiary"
        :disabled="currentPage === totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 11L11 6L6 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <button
        class="w-8 h-8 flex items-center justify-center rounded-ohos border border-ohos-bg-tertiary"
        :disabled="currentPage === totalPages"
        @click="$emit('update:currentPage', totalPages)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 11L11 6L6 1M3 11L8 6L3 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  currentPage: number
  pageSize: number
  total: number
  size?: 'small' | 'medium'
  showSizeChanger?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
}>()

// 总页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

// 页码列表（最多显示5个页码）
const pageNumbers = computed(() => {
  const pages = []
  const total = totalPages.value
  
  // 总页数小于等于5时，显示所有页码
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
    return pages
  }
  
  // 当前页小于等于3时，显示1-5
  if (props.currentPage <= 3) {
    return [1, 2, 3, 4, 5]
  }
  
  // 当前页大于等于总页数-2时，显示最后5页
  if (props.currentPage >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total]
  }
  
  // 其他情况，显示当前页前后各2页
  return [
    props.currentPage - 2,
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
    props.currentPage + 2
  ]
})
</script>
    