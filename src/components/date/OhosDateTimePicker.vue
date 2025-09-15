<template>
  <div class="relative">
    <!-- 输入框触发器 -->
    <div
        class="ohos-input flex items-center justify-between cursor-pointer"
        :class="{ 'border-ohos-primary': isOpen, 'opacity-70 cursor-not-allowed': disabled }"
        @click="handleOpen"
    >
          <span>
            {{ displayValue || placeholder }}
          </span>
      <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="text-ohos-text-secondary transition-transform duration-ohos"
          :class="isOpen ? 'rotate-180' : ''"
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- 选择器弹窗 -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-ohos-4">
      <!-- 遮罩层 -->
      <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-ohos"
          @click="handleClose"
      ></div>

      <!-- 选择器内容 -->
      <div class="relative w-full max-w-2xl bg-ohos-bg-primary rounded-t-ohos-lg md:rounded-ohos-lg shadow-ohos-lg overflow-hidden transform transition-all duration-ohos">
        <!-- 标题和按钮 -->
        <div class="p-ohos-4 border-b border-ohos-bg-tertiary flex justify-between items-center">
          <h3 class="text-ohos-base font-medium">
            {{ type === 'date' ? '选择日期' : type === 'time' ? '选择时间' : '选择日期时间' }}
          </h3>
          <div class="flex gap-ohos-2">
            <OhosButton type="text" size="small" @click="handleCancel">取消</OhosButton>
            <OhosButton type="primary" size="small" @click="handleConfirm">确认</OhosButton>
          </div>
        </div>

        <!-- 选择内容区域 -->
        <div class="p-ohos-4">
          <!-- 仅日期模式 -->
          <div v-if="type === 'date'" class="w-full">
            <OhosCalendar
                v-model="internalValue"
                :minDate="minDate"
                :maxDate="maxDate"
            />
          </div>

          <!-- 仅时间模式 -->
          <div v-if="type === 'time'" class="flex justify-center py-ohos-4">
            <div class="flex items-center gap-ohos-2">
              <!-- 小时选择 -->
              <select
                  v-model="hour"
                  class="h-12 w-16 text-ohos-lg text-center rounded-ohos border border-ohos-bg-tertiary focus:outline-none focus:border-ohos-primary"
                  @change="updateTime"
              >
                <option v-for="h in 23" :key="h" :value="h">{{ formatNumber(h) }}</option>
              </select>

              <span class="text-ohos-lg">:</span>

              <!-- 分钟选择 -->
              <select
                  v-model="minute"
                  class="h-12 w-16 text-ohos-lg text-center rounded-ohos border border-ohos-bg-tertiary focus:outline-none focus:border-ohos-primary"
                  @change="updateTime"
              >
                <option v-for="m in 59" :key="m" :value="m">{{ formatNumber(m) }}</option>
              </select>
            </div>
          </div>

          <!-- 日期时间模式 -->
          <div v-if="type === 'datetime'" class="space-y-ohos-4">
            <OhosCalendar
                v-model="internalValue"
                :minDate="minDate"
                :maxDate="maxDate"
            />
            <div class="flex justify-center py-ohos-2">
              <div class="flex items-center gap-ohos-2">
                <select
                    v-model="hour"
                    class="h-10 w-14 text-ohos-base text-center rounded-ohos border border-ohos-bg-tertiary focus:outline-none focus:border-ohos-primary"
                    @change="updateTime"
                >
                  <option v-for="h in 23" :key="h" :value="h">{{ formatNumber(h) }}</option>
                </select>
                <span class="text-ohos-base">:</span>
                <select
                    v-model="minute"
                    class="h-10 w-14 text-ohos-base text-center rounded-ohos border border-ohos-bg-tertiary focus:outline-none focus:border-ohos-primary"
                    @change="updateTime"
                >
                  <option v-for="m in 59" :key="m" :value="m">{{ formatNumber(m) }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch, onMounted } from 'vue'
import OhosButton from '../base/OhosButton.vue'
import OhosCalendar from './OhosCalendar.vue'
import { useClickOutside } from '@/composables/useClickOutside.js'

// 日期时间类型定义
interface DateTimeObj {
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
}

const props = defineProps<{
  // 绑定的值
  modelValue?: DateTimeObj
  // 选择类型：日期/时间/日期时间
  type?: 'date' | 'time' | 'datetime'
  // 占位符
  placeholder?: string
  // 最小可选日期时间
  minDate?: DateTimeObj
  // 最大可选日期时间
  maxDate?: DateTimeObj
  // 是否禁用
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateTimeObj): void
  (e: 'change', value: DateTimeObj): void
}>()

// 状态管理
const isOpen = ref(false)
const internalValue = ref<DateTimeObj>({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hour: new Date().getHours(),
  minute: new Date().getMinutes()
})
const hour = ref(internalValue.value.hour || 0)
const minute = ref(internalValue.value.minute || 0)

// 引用DOM元素用于点击外部关闭
const pickerRef = ref<HTMLElement | null>(null)
useClickOutside(pickerRef, () => {
  if (isOpen.value && !props.disabled) {
    handleCancel()
  }
})

// 初始化值
onMounted(() => {
  if (props.modelValue) {
    internalValue.value = { ...props.modelValue }
    if (props.modelValue.hour !== undefined) {
      hour.value = props.modelValue.hour
    }
    if (props.modelValue.minute !== undefined) {
      minute.value = props.modelValue.minute
    }
  }
})

// 监听外部值变化
watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal) {
        internalValue.value = { ...newVal }
        if (newVal.hour !== undefined) {
          hour.value = newVal.hour
        }
        if (newVal.minute !== undefined) {
          minute.value = newVal.minute
        }
      }
    },
    { deep: true }
)

// 格式化显示值
const displayValue = computed(() => {
  if (!internalValue.value) return ''

  const { year, month, day, hour, minute } = internalValue.value
  let result = `${year}年${month + 1}月${day}日`

  if (props.type === 'time' || props.type === 'datetime') {
    result += ` ${formatNumber(hour || 0)}:${formatNumber(minute || 0)}`
  }

  return result
})

// 格式化数字为两位数
const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0')
}

// 更新时间
const updateTime = () => {
  internalValue.value = {
    ...internalValue.value,
    hour: hour.value,
    minute: minute.value
  }
}

// 打开选择器
const handleOpen = () => {
  if (!props.disabled) {
    isOpen.value = true
  }
}

// 关闭选择器
const handleClose = () => {
  isOpen.value = false
}

// 取消选择
const handleCancel = () => {
  // 重置为之前的值
  if (props.modelValue) {
    internalValue.value = { ...props.modelValue }
    if (props.modelValue.hour !== undefined) {
      hour.value = props.modelValue.hour
    }
    if (props.modelValue.minute !== undefined) {
      minute.value = props.modelValue.minute
    }
  }
  handleClose()
}

// 确认选择
const handleConfirm = () => {
  emit('update:modelValue', internalValue.value)
  emit('change', internalValue.value)
  handleClose()
}
</script>
