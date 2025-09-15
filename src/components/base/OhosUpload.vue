<template>
  <div class="space-y-ohos-3">
    <!-- 上传区域 -->
    <div
      class="border-2 border-dashed border-ohos-bg-tertiary rounded-ohos-lg p-ohos-6 text-center cursor-pointer transition-colors"
      :class="{
        'border-ohos-primary bg-ohos-primary/5': isDragging,
        'opacity-70 cursor-not-allowed': disabled
      }"
      @click="handleClick"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      v-if="!disabled"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        :multiple="multiple"
        @change="handleFileChange"
      />
      
      <div class="flex flex-col items-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="text-ohos-text-secondary mb-ohos-2"
        >
          <path d="M20 12L20 28M20 28L12 20M20 28L28 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="text-ohos-sm text-ohos-primary">点击上传图片或拖放至此</p>
        <p v-if="maxSize" class="text-ohos-xs text-ohos-text-secondary mt-ohos-1">
          支持 JPG、PNG 格式，最大 {{ maxSize / 1024 / 1024 }}MB
        </p>
      </div>
    </div>
    
    <!-- 预览区域 -->
    <div v-if="previewList.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-ohos-3">
      <div 
        v-for="(file, index) in previewList" 
        :key="file.uid || index"
        class="relative group"
      >
        <!-- 预览图 -->
        <div class="aspect-square bg-ohos-bg-secondary rounded-ohos overflow-hidden">
          <img 
            :src="file.url" 
            alt="预览图"
            class="w-full h-full object-cover"
            @load="handleImageLoad(index)"
          >
          
          <!-- 上传进度 -->
          <div v-if="file.status === 'uploading'" class="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <!-- 错误状态 -->
          <div v-if="file.status === 'error'" class="absolute inset-0 bg-black/50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="red" stroke-width="2"/>
              <path d="M15 9L9 15M9 9L15 15" stroke="red" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        
        <!-- 删除按钮 -->
        <button
          v-if="!disabled && file.status !== 'uploading'"
          class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-ohos-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
          @click.stop="handleRemove(index)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

// 文件信息类型
interface UploadFile {
  uid: string
  file?: File
  url: string
  status: 'ready' | 'uploading' | 'success' | 'error'
  progress?: number
}

const props = defineProps<{
  // 已上传文件列表
  modelValue?: UploadFile[]
  // 是否支持多文件上传
  multiple?: boolean
  // 最大文件大小(字节)
  maxSize?: number
  // 是否禁用
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', files: UploadFile[]): void
  (e: 'upload', files: File[]): void
  (e: 'remove', index: number): void
  (e: 'error', message: string): void
}>()

// 状态管理
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const previewList = ref<UploadFile[]>(props.modelValue || [])

// 监听外部文件列表变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) previewList.value = newVal
  }
)

// 生成唯一ID
const generateUid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 点击上传区域
const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 处理文件选择
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    handleFiles(target.files)
    target.value = '' // 允许重复选择同一文件
  }
}

// 处理拖放文件
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files.length > 0) {
    handleFiles(e.dataTransfer.files)
  }
}

// 处理文件
const handleFiles = (files: FileList) => {
  const fileList = Array.from(files)
  
  // 验证文件
  for (const file of fileList) {
    // 验证类型
    if (!file.type.startsWith('image/')) {
      emit('error', '请上传图片文件')
      return
    }
    
    // 验证大小
    if (props.maxSize && file.size > props.maxSize) {
      emit('error', `文件大小不能超过 ${props.maxSize / 1024 / 1024}MB`)
      return
    }
  }
  
  // 生成预览并添加到列表
  const newFiles: UploadFile[] = fileList.map(file => {
    return {
      uid: generateUid(),
      file,
      url: URL.createObjectURL(file),
      status: 'ready'
    }
  })
  
  const updatedList = props.multiple 
    ? [...previewList.value, ...newFiles]
    : newFiles
  
  previewList.value = updatedList
  emit('update:modelValue', updatedList)
  emit('upload', fileList)
}

// 处理图片加载完成（释放URL对象）
const handleImageLoad = (index: number) => {
  const file = previewList.value[index]
  if (file.file) {
    URL.revokeObjectURL(file.url)
  }
}

// 移除文件
const handleRemove = (index: number) => {
  const newList = [...previewList.value]
  newList.splice(index, 1)
  previewList.value = newList
  emit('update:modelValue', newList)
  emit('remove', index)
}
</script>
    