<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';
import ModalCloseButton from '../UI/ModalCloseButton.vue';
import PostModalForm from './PostModalForm.vue';

const postStore = usePostStore();

function handleFormSubmit() {
  postStore.toggleModal();
}

function handleFormCancel() {
  postStore.toggleModal();
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      <!-- Кнопка закрытия "X" -->
      <ModalCloseButton />

      <h3 class="text-2xl font-semibold mb-4 text-gray-800">Create Post</h3>

      <!-- Форма создания поста -->
      <PostModalForm @submitted="handleFormSubmit" @cancel="handleFormCancel" />
    </div>
  </div>
</template>
