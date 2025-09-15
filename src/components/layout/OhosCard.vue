<template>
  <div
      class="ohos-card"
      :class="[
      bordered ? 'border border-ohos-border' : '',
      shadow ? 'shadow-sm' : '',
      disabled ? 'opacity-60' : '',
      size,
      customClass
    ]"
      :style="customStyle"
  >
    <!-- 卡片头部 -->
    <div v-if="header || $slots.header" class="card-header p-ohos-3 border-b border-ohos-border-light flex justify-between items-center">
      <div v-if="header" class="text-ohos-lg font-medium">{{ header }}</div>
      <slot name="header"></slot>
      <slot name="header-extra"></slot>
    </div>

    <!-- 卡片内容 -->
    <div class="card-body p-ohos-3">
      <slot></slot>
    </div>

    <!-- 卡片底部 -->
    <div v-if="$slots.footer" class="card-footer p-ohos-3 border-t border-ohos-border-light">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  // 卡片标题
  header?: string;
  // 是否显示边框
  bordered?: boolean;
  // 是否显示阴影
  shadow?: boolean;
  // 卡片尺寸
  size?: 'small' | 'medium' | 'large';
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  customClass?: string;
  // 自定义样式
  customStyle?: Record<string, string>;
}>();
</script>

<style scoped>
.ohos-card {
  border-radius: var(--ohos-radius-md);
  background-color: var(--ohos-bg-primary);
  transition: all 0.2s ease;
}

.ohos-card.small {
  --ohos-card-padding: var(--ohos-space-2);
}

.ohos-card.medium {
  --ohos-card-padding: var(--ohos-space-3);
}

.ohos-card.large {
  --ohos-card-padding: var(--ohos-space-4);
}

.ohos-card:hover:not(.disabled) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>