<template>
  <div class="overflow-x-auto bg-ohos-bg-primary rounded-ohos-lg shadow-sm">
    <!-- 表格 -->
    <table class="w-full text-sm">
      <!-- 表头 -->
      <thead>
        <tr class="bg-ohos-bg-secondary/30">
          <th 
            v-for="column in columns" 
            :key="column.key"
            class="px-ohos-4 py-ohos-3 text-left text-ohos-text-secondary font-medium border-b border-ohos-bg-tertiary"
            :width="column.width"
            @click="handleSort(column)"
          >
            <div class="flex items-center gap-ohos-1">
              <span>{{ column.title }}</span>
              <svg 
                v-if="column.sortable" 
                width="14" 
                height="14" 
                viewBox="0 0 14 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                :class="{
                  'text-ohos-primary': sortField === column.key,
                  'rotate-180': sortField === column.key && sortOrder === 'desc'
                }"
              >
                <path d="M3 5L7 1L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      
      <!-- 表体 -->
      <tbody>
        <tr 
          v-for="(row, index) in paginatedData" 
          :key="row[keyField] || index"
          class="hover:bg-ohos-bg-secondary/50 transition-colors"
        >
          <td 
            v-for="column in columns" 
            :key="column.key"
            class="px-ohos-4 py-ohos-3 border-b border-ohos-bg-tertiary"
          >
            <template v-if="column.render">
              <component :is="column.render(row)" />
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
        </tr>
        
        <!-- 空状态 -->
        <tr v-if="paginatedData.length === 0">
          <td :colspan="columns.length" class="px-ohos-4 py-ohos-8 text-center text-ohos-text-secondary">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- 分页 -->
    <div v-if="showPagination && total > 0" class="px-ohos-4 py-ohos-3 border-t border-ohos-bg-tertiary">
      <OhosPagination
        :currentPage="currentPage"
        :pageSize="pageSize"
        :total="total"
        @update:currentPage="handlePageChange"
        @update:pageSize="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue'
import OhosPagination from './OhosPagination.vue'

// 列配置类型
interface TableColumn {
  key: string
  title: string
  width?: string | number
  sortable?: boolean
  render?: (row: any) => any
}

const props = defineProps<{
  // 表格数据
  data: any[]
  // 列配置
  columns: TableColumn[]
  // 数据唯一标识字段
  keyField?: string
  // 是否显示分页
  showPagination?: boolean
  // 当前页码
  currentPage?: number
  // 每页条数
  pageSize?: number
  // 空状态文本
  emptyText?: string
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'sort', field: string, order: 'asc' | 'desc'): void
}>()

// 状态管理
const internalCurrentPage = ref(props.currentPage || 1)
const internalPageSize = ref(props.pageSize || 10)
const sortField = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

// 监听外部页码变化
watch(
  () => props.currentPage,
  (newVal) => {
    if (newVal) internalCurrentPage.value = newVal
  }
)

// 监听外部每页条数变化
watch(
  () => props.pageSize,
  (newVal) => {
    if (newVal) internalPageSize.value = newVal
  }
)

// 总条数
const total = computed(() => props.data.length)

// 排序后的数据
const sortedData = computed(() => {
  if (!sortField.value) return [...props.data]
  
  return [...props.data].sort((a, b) => {
    if (a[sortField.value] < b[sortField.value]) {
      return sortOrder.value === 'asc' ? -1 : 1
    }
    if (a[sortField.value] > b[sortField.value]) {
      return sortOrder.value === 'asc' ? 1 : -1
    }
    return 0
  })
})

// 分页后的数据
const paginatedData = computed(() => {
  if (!props.showPagination) return sortedData.value
  
  const start = (internalCurrentPage.value - 1) * internalPageSize.value
  const end = start + internalPageSize.value
  return sortedData.value.slice(start, end)
})

// 处理排序
const handleSort = (column: TableColumn) => {
  if (!column.sortable) return
  
  if (sortField.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = column.key
    sortOrder.value = 'asc'
  }
  
  emit('sort', sortField.value, sortOrder.value)
}

// 处理页码变化
const handlePageChange = (page: number) => {
  internalCurrentPage.value = page
  emit('update:currentPage', page)
}

// 处理每页条数变化
const handlePageSizeChange = (size: number) => {
  internalPageSize.value = size
  emit('update:pageSize', size)
}
</script>
    