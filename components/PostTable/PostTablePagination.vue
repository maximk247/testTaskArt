<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ButtonComponent from '~/components/UI/ButtonComponent.vue';
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
    <ButtonComponent
      label="First"
      :disabled="currentPage === 1"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      @click="firstPage"
    />

    <ButtonComponent
      label="Previous"
      :disabled="currentPage === 1"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      @click="prevPage"
    />

    <span class="py-2 px-4 select-none"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >

    <ButtonComponent
      label="Next"
      :disabled="currentPage === totalPages"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      @click="nextPage"
    />

    <ButtonComponent
      label="Last"
      :disabled="currentPage === totalPages"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      @click="lastPage"
    />
  </div>
</template>
