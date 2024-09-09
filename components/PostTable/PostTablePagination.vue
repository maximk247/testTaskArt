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
  <div class="flex justify-center gap-1 mt-2 mb-2 flex-wrap items-center">
    <ButtonComponent
      label="First"
      :disabled="currentPage === 1"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      class="w-auto min-w-[50px] sm:text-base text-xs sm:py-2 py-2 sm:px-4 px-2"
      @click="firstPage"
    />

    <ButtonComponent
      label="Previous"
      :disabled="currentPage === 1"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      class="w-auto min-w-[50px] sm:text-base text-xs sm:py-2 py-2 sm:px-4 px-2"
      @click="prevPage"
    />

    <span class="py-1 sm:px-4 px-1 text-xs sm:text-base select-none">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <ButtonComponent
      label="Next"
      :disabled="currentPage === totalPages"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      class="w-auto min-w-[50px] sm:text-base text-xs sm:py-2 py-2 sm:px-4 px-2"
      @click="nextPage"
    />

    <ButtonComponent
      label="Last"
      :disabled="currentPage === totalPages"
      bg-color="bg-gray-200 hover:bg-gray-400"
      text-color="text-black"
      class="w-auto min-w-[50px] sm:text-base text-xs sm:py-2 py-2 sm:px-4 px-2"
      @click="lastPage"
    />
  </div>
</template>
