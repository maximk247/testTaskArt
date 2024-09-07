<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePostStore } from '~/store/postStore';
import PostModal from './PostModal.vue';
import PostTablePagination from './PostTablePagination.vue';

const postStore = usePostStore();
const { paginatedPosts, loading, totalPages, showModal } =
  storeToRefs(postStore);

onMounted(async () => {
  await postStore.fetchPosts();
});

function toggleSort() {
  postStore.toggleSortOrder();
}

function toggleModal() {
  postStore.toggleModal();
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Post Table</h1>
    <button
      class="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      @click="toggleModal"
    >
      Create New Post
    </button>

    <!-- Показать индикатор загрузки при изменении страницы или при первой загрузке -->
    <div v-if="loading" class="flex justify-center items-center">
      <div
        class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
      />
    </div>

    <!-- Отображаем таблицу и пагинацию только если данные загружены и есть посты -->
    <div v-else-if="paginatedPosts.length && totalPages > 0">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-2 cursor-pointer" @click="toggleSort">
              Id
              <span v-if="postStore.sortOrder === 'asc'">▲</span>
              <span v-else>▼</span>
            </th>
            <th class="py-2">Title</th>
            <th class="py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in paginatedPosts"
            :key="post.id"
            class="bg-gray-100 border-b"
          >
            <td class="py-2 px-4">{{ post.id }}</td>
            <td class="py-2 px-4">{{ post.title }}</td>
            <td class="py-2 px-4">{{ post.body }}</td>
          </tr>
        </tbody>
      </table>

      <PostTablePagination />
    </div>

    <PostModal v-if="showModal" />
  </div>
</template>
