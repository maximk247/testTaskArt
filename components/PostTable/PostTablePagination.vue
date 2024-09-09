<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();
const { currentPage, totalPages } = storeToRefs(postStore);

function nextPage() {
  if (currentPage.value < totalPages.value) {
    postStore.setCurrentPage(currentPage.value + 1);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    postStore.setCurrentPage(currentPage.value - 1);
  }
}

function firstPage() {
  if (currentPage.value > 1) {
    postStore.setCurrentPage(1);
  }
}

function lastPage() {
  if (currentPage.value < totalPages.value) {
    postStore.setCurrentPage(totalPages.value);
  }
}
</script>

<template>
  <div class="flex justify-center gap-2 mt-4">
    <button
      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      :disabled="currentPage === 1"
      @click="firstPage"
    >
      First
    </button>
    <button
      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      Previous
    </button>
    <span class="py-2 px-4">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      Next
    </button>
    <button
      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      :disabled="currentPage === totalPages"
      @click="lastPage"
    >
      Last
    </button>
  </div>
</template>
