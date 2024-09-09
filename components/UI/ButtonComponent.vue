<script lang="ts" setup>
defineProps({
  type: {
    type: String as () => 'reset' | 'submit' | 'button',
    default: 'button',
  },
  label: {
    type: String,
    required: true,
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
</script>

<template>
  <button
    :type="type"
    :class="[
      `${bgColor} ${textColor} py-2 px-4 rounded-md transition duration-300 select-none font-bold`,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80',
    ]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>
