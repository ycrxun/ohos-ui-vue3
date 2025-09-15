<template>
  <div class="ohos-calendar">
    <!-- 头部导航 -->
    <div class="flex items-center justify-between mb-ohos-4 px-ohos-2">
      <button 
        class="p-ohos-1 hover:bg-ohos-bg-secondary rounded"
        @click="prevMonth"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <h3 class="text-ohos-lg font-medium">
        {{ currentYear }}年 {{ currentMonth + 1 }}月
      </h3>
      
      <button 
        class="p-ohos-1 hover:bg-ohos-bg-secondary rounded"
        @click="nextMonth"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <!-- 星期标题 -->
    <div class="grid grid-cols-7 mb-ohos-2">
      <div class="text-center text-ohos-sm text-ohos-text-secondary">日</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">一</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">二</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">三</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">四</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">五</div>
      <div class="text-center text-ohos-sm text-ohos-text-secondary">六</div>
    </div>
    
    <!-- 日期网格 -->
    <div class="grid grid-cols-7 gap-ohos-1">
      <!-- 上月日期 -->
      <div 
        v-for="(day, index) in prevMonthDays" 
        :key="'prev-' + index"
        class="h-ohos-10 flex items-center justify-center text-ohos-sm text-ohos-text-placeholder"
      >
        {{ day }}
      </div>
      
      <!-- 本月日期 -->
      <div 
        v-for="(day, index) in currentMonthDays" 
        :key="'current-' + index"
        class="h-ohos-10 flex items-center justify-center text-ohos-sm rounded-full cursor-pointer transition-colors"
        :class="[
          isToday(currentYear, currentMonth, day) ? 'bg-ohos-primary/10 font-medium' : '',
          isSelected(currentYear, currentMonth, day) ? 'bg-ohos-primary text-white' : '',
          hoverable ? 'hover:bg-ohos-bg-secondary' : ''
        ]"
        @click="handleSelect(currentYear, currentMonth, day)"
      >
        {{ day }}
      </div>
      
      <!-- 下月日期 -->
      <div 
        v-for="(day, index) in nextMonthDays" 
        :key="'next-' + index"
        class="h-ohos-10 flex items-center justify-center text-ohos-sm text-ohos-text-placeholder"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// 定义props
const props = defineProps<{
  modelValue?: Date;
  disabled?: boolean;
  hoverable?: boolean;
}>();

// 定义emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
  (e: 'change', value: Date): void;
}>();

// 当前显示的年月
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

// 选中的日期
const selectedDate = ref<Date | null>(props.modelValue || null);

// 监听外部传入的modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      selectedDate.value = newVal;
      currentYear.value = newVal.getFullYear();
      currentMonth.value = newVal.getMonth();
    }
  },
  { immediate: true }
);

// 获取当月天数
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 获取当月第一天是星期几 (0-6)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

// 计算日历显示的日期
const prevMonthDays = computed(() => {
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);
  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
  const prevMonthDaysCount = getDaysInMonth(prevYear, prevMonth);
  
  return Array.from({ length: firstDay }, (_, i) => prevMonthDaysCount - firstDay + i + 1);
});

const currentMonthDays = computed(() => {
  const days = getDaysInMonth(currentYear.value, currentMonth.value);
  return Array.from({ length: days }, (_, i) => i + 1);
});

const nextMonthDays = computed(() => {
  const totalDays = prevMonthDays.value.length + currentMonthDays.value.length;
  const remaining = 42 - totalDays; // 6行 × 7列 = 42
  return Array.from({ length: remaining }, (_, i) => i + 1);
});

// 切换到上月
const prevMonth = () => {
  if (props.disabled) return;
  
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

// 切换到下月
const nextMonth = () => {
  if (props.disabled) return;
  
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

// 判断是否为今天
const isToday = (year: number, month: number, day: number) => {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
};

// 判断是否为选中日期
const isSelected = (year: number, month: number, day: number) => {
  if (!selectedDate.value) return false;
  return selectedDate.value.getFullYear() === year && 
         selectedDate.value.getMonth() === month && 
         selectedDate.value.getDate() === day;
};

// 选择日期
const handleSelect = (year: number, month: number, day: number) => {
  if (props.disabled) return;
  
  const newDate = new Date(year, month, day);
  selectedDate.value = newDate;
  emit('update:modelValue', newDate);
  emit('change', newDate);
};
</script>
    