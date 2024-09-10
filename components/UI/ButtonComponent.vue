<script lang="ts" setup>
import { ref } from 'vue';

// Определение интерфейса для типизации экземпляра ButtonComponent
export interface ButtonComponentInstance {
  focusAndClickedButton: () => void;
}

const buttonRef = ref<HTMLButtonElement | null>(null);

defineProps({
  type: {
    type: String as () => 'reset' | 'submit' | 'button',
    default: 'button',
  },
  bgColor: {
    type: String,
    default: 'bg-gray-500',
  },
  textColor: {
    type: String,
    default: 'text-white',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Экспонируем метод для получения фокуса и клика на кнопке
defineExpose({
  focusAndClickedButton: () => {
    buttonRef.value?.focus();
    buttonRef.value?.click();
  },
});
</script>

<template>
  <button
    ref="buttonRef"
    :type="type"
    :class="[
      `${bgColor} ${textColor} py-2 px-4 rounded-md transition duration-300 select-none font-bold`,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80',
    ]"
    :disabled="disabled"
  >
    <slot/> 
  </button>
</template>
