<template>
  <div class="relative">
    <div
      class="ohos-input flex items-center justify-between cursor-pointer"
      :class="{ 'opacity-60 cursor-not-allowed': disabled }"
      @click="visible = !visible"
    >
      <span v-if="selectedLabel">{{ selectedLabel }}</span>
      <span v-else class="text-ohos-text-tertiary">{{ placeholder }}</span>
      
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        class="transition-transform"
        :class="{ 'rotate-180': visible }"
      >
        <path d="M3 6L8 11L13 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    
    <!-- 下拉选项 -->
    <div
      v-if="visible && !disabled"
      class="absolute top-full left-0 right-0 mt-ohos-1 bg-ohos-bg-primary border border-ohos-bg-tertiary rounded-ohos shadow-ohos z-10 max-h-60 overflow-y-auto"
    >
      <div 
        v-for="option in options" 
        :key="option.value"
        class="px-ohos-3 py-ohos-2 hover:bg-ohos-bg-secondary cursor-pointer transition-colors"
        :class="{ 'bg-ohos-bg-secondary': option.value === modelValue }"
        @click="handleSelect(option)"
      >
        {{ option.label }}
      </div>
      
      <div v-if="options?.length === 0" class="px-ohos-3 py-ohos-2 text-ohos-text-tertiary text-ohos-sm">
        无选项
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 选项类型
interface SelectOption {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue?: string | number
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number, label: string): void
}>()

// 状态管理
const visible = ref(false)
const selectedLabel = computed(() => {
  if (!props.modelValue) return ''
  const option = props.options?.find(item => item.value === props.modelValue)
  return option?.label || ''
})

// 点击外部关闭下拉框
const handleClickOutside = (e: MouseEvent) => {
  const selectEl = document.querySelector('.ohos-select')
  if (selectEl && !selectEl.contains(e.target as Node)) {
    visible.value = false
  }
}

// 监听点击外部事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 处理选项选择
const handleSelect = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  emit('change', option.value, option.label)
  visible.value = false
}

// 监听值变化
watch(
  () => props.modelValue,
  () => {
    visible.value = false
  }
)
</script>
    