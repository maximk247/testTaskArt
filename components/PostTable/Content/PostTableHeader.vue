<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();

function toggleSort() {
  postStore.toggleSortOrder();
}
</script>

<template>
  <thead class="bg-gray-800 text-white">
    <tr>
      <th
        class="relative py-2 px-4 cursor-pointer flex items-center justify-center text-center select-none"
        @click="toggleSort"
      >
        <span>Id</span>
        <span v-if="postStore.sortOrder === 'asc'" class="absolute right-2">▲</span>
        <span v-else-if="postStore.sortOrder === 'desc'" class="absolute right-2">▼</span>
      </th>
      <th class="w-4/12 py-2 px-4 select-none">Title</th>
      <th class="w-6/12 py-2 px-4 select-none">Body</th>
    </tr>
  </thead>
</template>
