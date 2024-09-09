<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();

function openModal() {
  postStore.toggleModal();
}
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <button
      class="bg-blue-500 text-white w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300"
      @click="openModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  </div>
</template>
