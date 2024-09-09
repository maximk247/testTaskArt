<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement | null;
  if (target) {
    emit('update:modelValue', target.value);
  }
}
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    rows="5"
    required
    @input="handleInput"
  />
</template>
