<template>
  <nav 
    class="bg-ohos-bg-primary border-t border-ohos-bg-tertiary z-10"
    :class="{ 
      'fixed bottom-0 left-0 right-0': fixed,
      'hidden md:flex': hideOnDesktop
    }"
  >
    <div class="max-w-md mx-auto">
      <div class="flex justify-around">
        <button
          v-for="(item, index) in items"
          :key="index"
          class="flex-1 flex flex-col items-center justify-center py-ohos-2 px-ohos-1"
          :class="{ 'text-ohos-primary': item.active }"
          @click="handleItemClick(index)"
        >
          <svg 
            :width="20" 
            :height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            class="mb-ohos-1"
          >
            <path 
              :d="item.icon" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-ohos-xs">{{ item.text }}</span>
        </button>
      </div>
    </div>
  </nav>
  
  <!-- 占位元素（当NavBar固定时使用，避免内容被遮挡） -->
  <div v-if="fixed" class="h-16 md:hidden"></div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 导航项类型
interface NavBarItem {
  text: string
  icon: string
  active?: boolean
}

const props = defineProps<{
  // 导航项
  items: NavBarItem[]
  // 是否固定在底部
  fixed?: boolean
  // 在桌面端是否隐藏
  hideOnDesktop?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

// 处理导航项点击
const handleItemClick = (index: number) => {
  emit('change', index)
}
</script>
    