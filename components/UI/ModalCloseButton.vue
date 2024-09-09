<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();

function closeModal() {
  postStore.toggleModal();
}
</script>

<template>
  <button
    class="absolute top-3 right-3 text-white hover:text-gray-500 transition duration-300"
    @click="closeModal"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
