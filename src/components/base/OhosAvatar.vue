<template>
  <div 
    class="relative overflow-hidden flex items-center justify-center transition-all"
    :class="[
      size === 'small' ? 'w-8 h-8' : '',
      size === 'medium' ? 'w-12 h-12' : '',
      size === 'large' ? 'w-16 h-16' : '',
      size === 'xlarge' ? 'w-24 h-24' : '',
      shape === 'circle' ? 'rounded-full' : 'rounded-ohos',
      bordered ? 'border-2 border-ohos-bg-tertiary' : '',
      disabled ? 'opacity-60' : ''
    ]"
    :style="{ backgroundColor: bgColor }"
  >
    <!-- 图片头像 -->
    <img
      v-if="src"
      :src="src"
      :alt="alt || '头像'"
      class="w-full h-full object-cover"
      @error="handleImageError"
    >
    
    <!-- 文本头像（图片加载失败或无图片时显示） -->
    <div v-else class="text-center">
      <span 
        class="font-medium"
        :class="[
          size === 'small' ? 'text-ohos-sm' : '',
          size === 'medium' ? 'text-ohos-base' : '',
          size === 'large' ? 'text-ohos-lg' : '',
          size === 'xlarge' ? 'text-ohos-xl' : ''
        ]"
      >
        {{ text || getInitials(name) }}
      </span>
    </div>
    
    <!-- 状态指示器 -->
    <div 
      v-if="status"
      class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-ohos-bg-primary"
      :class="{
        'bg-ohos-success': status === 'online',
        'bg-ohos-warning': status === 'away',
        'bg-ohos-danger': status === 'offline'
      }"
    ></div>
    
    <!-- 上传按钮（仅在可上传且非禁用状态显示） -->
    <div 
      v-if="uploadable && !disabled"
      class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
      @click.stop="handleUploadClick"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileChange"
      />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5V13M9 13L5 9M9 13L13 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{
  // 头像图片地址
  src?: string
  // 替代文本
  alt?: string
  // 名称（用于生成首字母）
  name?: string
  // 自定义文本（优先级高于name）
  text?: string
  // 尺寸
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  // 形状
  shape?: 'circle' | 'square'
  // 背景色
  bgColor?: string
  // 是否显示边框
  bordered?: boolean
  // 状态指示器
  status?: 'online' | 'away' | 'offline'
  // 是否可上传
  uploadable?: boolean
  // 是否禁用
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'error'): void
  (e: 'upload', file: File): void
}>()

// 引用
const fileInput = ref<HTMLInputElement | null>(null)

// 处理图片加载失败
const handleImageError = () => {
  emit('error')
}

// 获取姓名首字母
const getInitials = (name?: string) => {
  if (!name) return '?'
  
  // 提取中文姓氏或英文首字母
  const chineseRegex = /^[\u4e00-\u9fa5]/
  if (chineseRegex.test(name)) {
    return name.charAt(0)
  }
  
  return name.charAt(0).toUpperCase()
}

// 触发上传
const handleUploadClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 处理文件选择
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    emit('upload', target.files[0])
    target.value = '' // 允许重复选择同一文件
  }
}
</script>
    