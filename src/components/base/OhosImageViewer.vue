<template>
  <div v-if="visible" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-ohos-4">
    <!-- 关闭按钮 -->
    <button 
      class="absolute top-ohos-4 right-ohos-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      @click="handleClose"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    
    <!-- 左右切换按钮 -->
    <button 
      v-if="images.length > 1"
      class="absolute left-ohos-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      @click="prevImage"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16L8 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <button 
      v-if="images.length > 1"
      class="absolute right-ohos-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      @click="nextImage"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4L12 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <!-- 操作按钮 -->
    <div class="absolute bottom-ohos-4 left-1/2 transform -translate-x-1/2 flex gap-ohos-2 bg-black/30 rounded-ohos-full px-ohos-3 py-ohos-1">
      <button 
        class="w-8 h-8 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-colors"
        @click="rotate"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V4M8 12V14M2 8H4M12 8H14M9.5 4.5L11 6M6 11L4.5 9.5M11 10L9.5 11.5M6 5L4.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <button 
        class="w-8 h-8 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-colors"
        @click="zoomOut"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M5 8H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <button 
        class="w-8 h-8 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-colors"
        @click="resetTransform"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8C2 11.3137 4.68629 14 8 14C9.45489 14 10.8134 13.4732 11.8787 12.6169L13.293 14.0312C11.4821 15.5469 9.15042 16.5 6.5 16.5C2.85474 16.5 0 13.6453 0 10C0 7.34958 0.953125 5.01787 2.46875 3.20703L3.88306 4.62132C3.02681 5.68657 2.5 7.04511 2.5 8.5C2.5 10.9853 4.51472 13 7 13C8.43299 13 9.73479 12.1335 10.5355 10.8665L11.9492 12.2803C10.6532 14.1664 8.46154 15.5 6 15.5C2.41015 15.5 0 13.0899 0 9.5C0 7.03846 1.33362 4.8468 3.2207 3.55083L4.63445 4.96457C3.36748 6.26521 2.5 7.56701 2.5 9C2.5 11.4853 4.51472 13.5 7 13.5C9.48528 13.5 11.5 11.4853 11.5 9C11.5 6.51472 9.48528 4.5 7 4.5C5.56701 4.5 4.26521 5.36652 3.46447 6.63348L2.05083 5.2207C3.3468 3.33462 5.53846 2 8 2C11.5899 2 14 4.41015 14 8C14 10.5384 12.6664 12.7301 10.7793 14.0261L12.193 15.4398C14.3585 13.8315 16 11.3425 16 8C16 4.68629 13.3137 2 10 2C6.68629 2 4 4.68629 4 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <button 
        class="w-8 h-8 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-colors"
        @click="zoomIn"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 5V11M5 8H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <!-- 图片指示器 -->
    <div v-if="images.length > 1" class="absolute top-ohos-4 left-1/2 transform -translate-x-1/2 flex gap-ohos-1">
      <div 
        v-for="(img, i) in images" 
        :key="i"
        class="w-2 h-2 rounded-full transition-all"
        :class="{ 'bg-white w-6': currentIndex === i, 'bg-white/50': currentIndex !== i }"
        @click="currentIndex = i"
      ></div>
    </div>
    
    <!-- 图片容器 -->
    <div 
      class="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center"
      @click="handleCloseOnClickOutside"
    >
      <img
        ref="imageRef"
        :src="currentImage"
        alt="大图预览"
        class="max-w-full max-h-full transition-transform duration-300"
        :style="{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          cursor: scale > 1 ? 'grab' : 'default'
        }"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @click.stop
        @wheel.prevent="handleWheel"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  // 控制显示/隐藏
  visible: boolean
  // 图片列表
  images: string[]
  // 当前显示的图片索引
  initialIndex?: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update:initialIndex', index: number): void
}>()

// 状态管理
const currentIndex = ref(props.initialIndex || 0)
const scale = ref(1)
const rotation = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const startPos = ref({ x: 0, y: 0 })
const imageRef = ref<HTMLImageElement | null>(null)

// 当前显示的图片
const currentImage = computed(() => {
  return props.images[currentIndex.value] || ''
})

// 监听初始索引变化
onMounted(() => {
  currentIndex.value = props.initialIndex || 0
})

// 键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.visible) return
  
  switch (e.key) {
    case 'Escape':
      handleClose()
      break
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
    case '+':
      zoomIn()
      break
    case '-':
      zoomOut()
      break
    case '0':
      resetTransform()
      break
    case 'r':
      rotate()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// 关闭查看器
const handleClose = () => {
  emit('update:visible', false)
  emit('update:initialIndex', currentIndex.value)
}

// 点击外部关闭
const handleCloseOnClickOutside = (e: MouseEvent) => {
  if (scale.value === 1 && rotation.value === 0) {
    handleClose()
  } else {
    resetTransform()
  }
}

// 上一张图片
const prevImage = () => {
  resetTransform()
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// 下一张图片
const nextImage = () => {
  resetTransform()
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

// 放大
const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.2, 5)
}

// 缩小
const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.2, 0.2)
}

// 旋转
const rotate = () => {
  rotation.value = (rotation.value + 90) % 360
}

// 重置变换
const resetTransform = () => {
  scale.value = 1
  rotation.value = 0
  position.value = { x: 0, y: 0 }
}

// 鼠标按下
const handleMouseDown = (e: MouseEvent) => {
  if (scale.value <= 1) return
  
  isDragging.value = true
  startPos.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }
  
  if (imageRef.value) {
    imageRef.value.style.cursor = 'grabbing'
  }
}

// 鼠标移动
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  position.value = {
    x: e.clientX - startPos.value.x,
    y: e.clientY - startPos.value.y
  }
}

// 鼠标释放
const handleMouseUp = () => {
  isDragging.value = false
  if (imageRef.value) {
    imageRef.value.style.cursor = 'grab'
  }
}

// 鼠标滚轮缩放
const handleWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}
</script>
    