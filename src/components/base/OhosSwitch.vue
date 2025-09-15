<template>
  <div
      class="relative w-12 h-6 rounded-ohos-full cursor-pointer transition-all duration-ohos ease-ohos"
      :class="[
          modelValue ? 'bg-ohos-primary' : 'bg-ohos-bg-tertiary',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
      @click="handleToggle"
  >
    <!-- 开关圆点 -->
    <div
        class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-ohos ease-ohos"
        :class="modelValue ? 'translate-x-6' : ''"
    ></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const handleToggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>
