<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-ohos-4">
    <!-- 遮罩层 -->
    <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-ohos"
        @click="handleClose"
    ></div>

    <!-- 对话框内容 -->
    <div class="relative w-full max-w-md bg-ohos-bg-primary rounded-ohos-lg shadow-ohos-lg overflow-hidden transform transition-all duration-ohos">
      <!-- 标题区域 -->
      <div v-if="title" class="p-ohos-4 border-b border-ohos-bg-tertiary">
        <h3 class="text-ohos-lg font-semibold">{{ title }}</h3>
      </div>

      <!-- 内容区域 -->
      <div class="p-ohos-4">
        <slot>{{ message }}</slot>
      </div>

      <!-- 按钮区域 -->
      <div class="p-ohos-4 border-t border-ohos-bg-tertiary flex justify-end gap-ohos-3">
        <OhosButton
            v-if="showCancel"
            type="secondary"
            size="small"
            @click="handleCancel"
        >
          {{ cancelText }}
        </OhosButton>
        <OhosButton
            type="primary"
            size="small"
            @click="handleConfirm"
        >
          {{ confirmText }}
        </OhosButton>
      </div>

      <!-- 关闭按钮 -->
      <button
          v-if="closable"
          class="absolute top-ohos-3 right-ohos-3 text-ohos-text-secondary hover:text-ohos-text-primary"
          @click="handleClose"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import OhosButton from './OhosButton.vue'

const props = defineProps<{
  // 控制对话框显示/隐藏
  modelValue: boolean
  // 对话框标题
  title?: string
  // 对话框内容
  message?: string
  // 是否显示关闭按钮
  closable?: boolean
  // 是否显示取消按钮
  showCancel?: boolean
  // 确认按钮文本
  confirmText?: string
  // 取消按钮文本
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// 关闭对话框
const handleClose = () => {
  emit('update:modelValue', false)
}

// 点击确认按钮
const handleConfirm = () => {
  emit('confirm')
  handleClose()
}

// 点击取消按钮
const handleCancel = () => {
  emit('cancel')
  handleClose()
}
</script>
