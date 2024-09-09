<script lang="ts" setup>
import { ref } from 'vue';
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

// Делаем модалку перетаскиваемой
const modalRef = ref<HTMLElement | null>(null);
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

function onMouseDown(event: MouseEvent) {
  const modal = modalRef.value;
  if (!modal) return;

  isDragging = true;
  offsetX = event.clientX - modal.offsetLeft;
  offsetY = event.clientY - modal.offsetTop;

  // Добавляем стиль, чтобы предотвратить выделение текста
  document.body.style.userSelect = 'none';

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event: MouseEvent) {
  if (!isDragging) return;

  const modal = modalRef.value;
  if (!modal) return;

  // Вычисляем новые позиции с учетом границ
  const x = Math.min(
    window.innerWidth - modal.offsetWidth,
    Math.max(0, event.clientX - offsetX),
  );
  const y = Math.min(
    window.innerHeight - modal.offsetHeight,
    Math.max(0, event.clientY - offsetY),
  );

  modal.style.left = `${x}px`;
  modal.style.top = `${y}px`;
}

function onMouseUp() {
  isDragging = false;

  // Возвращаем стандартное поведение выделения текста
  document.body.style.userSelect = '';

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      ref="modalRef"
      class="bg-white rounded-lg shadow-lg max-w-lg w-full absolute"
    >
      <!-- Заголовок модалки и кнопка закрытия (только они позволяют перетаскивать модалку) -->
      <div
        class="flex items-center justify-center cursor-move bg-gray-800 p-4 w-full border-b border-gray-300"
        @mousedown="onMouseDown"
      >
        <h3 class="text-2xl font-semibold text-white select-none">Create Post</h3>
        <ModalCloseButton />
      </div>

      <!-- Форма создания поста -->
      <div class="p-6">
        <PostModalForm
          @submitted="handleFormSubmit"
          @cancel="handleFormCancel"
        />
      </div>
    </div>
  </div>
</template>
