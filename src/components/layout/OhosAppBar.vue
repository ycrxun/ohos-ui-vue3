<template>
  <header 
    class="bg-ohos-bg-primary border-b border-ohos-bg-tertiary shadow-sm z-10"
    :class="{ 'fixed top-0 left-0 right-0': fixed }"
  >
    <div class="max-w-7xl mx-auto px-ohos-4 sm:px-ohos-6 lg:px-ohos-8">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧区域 - 返回按钮和标题 -->
        <div class="flex items-center">
          <button
            v-if="showBack"
            class="p-ohos-2 mr-ohos-2 rounded-ohos-sm hover:bg-ohos-bg-secondary transition-colors"
            @click="$emit('back')"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L8 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <h1 class="text-ohos-lg font-semibold">
            <slot name="title">{{ title }}</slot>
          </h1>
        </div>
        
        <!-- 右侧区域 - 操作按钮 -->
        <div class="flex items-center gap-ohos-1">
          <slot name="actions">
            <button
              v-for="(action, index) in actions"
              :key="index"
              class="p-ohos-2 rounded-ohos-sm hover:bg-ohos-bg-secondary transition-colors"
              @click="action.handler"
            >
              <svg 
                :width="action.iconSize || 20" 
                :height="action.iconSize || 20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  :d="action.icon" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </slot>
        </div>
      </div>
    </div>
  </header>
  
  <!-- 占位元素（当AppBar固定时使用，避免内容被遮挡） -->
  <div v-if="fixed" class="h-16"></div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 操作按钮类型
interface AppBarAction {
  icon: string
  handler: () => void
  iconSize?: number
}

const props = defineProps<{
  // 标题
  title?: string
  // 是否显示返回按钮
  showBack?: boolean
  // 操作按钮
  actions?: AppBarAction[]
  // 是否固定在顶部
  fixed?: boolean
}>()

const emit = defineEmits<{
  (e: 'back'): void
}>()
</script>
    