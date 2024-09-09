<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePostStore } from '~/store/postStore';
import PostModal from '../PostModal/PostModal.vue';
import ModalOpenButton from '../UI/ModalOpenButton.vue';
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
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold mb-4">Post Table</h1>
    </div>

    <!-- Показать индикатор загрузки при изменении страницы или при первой загрузке -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
      />
    </div>

    <!-- Отображаем таблицу, пагинацию и возможность добавления поста только если данные загружены и есть посты -->
    <div v-else-if="paginatedPosts.length && totalPages > 0">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th
                class="py-2 px-4 cursor-pointer flex items-center space-x-1"
                @click="toggleSort"
              >
                <span>Id</span>
                <span v-if="postStore.sortOrder === 'asc'">▲</span>
                <span v-else-if="postStore.sortOrder === 'desc'">▼</span>
              </th>
              <th class="py-2 px-4">Title</th>
              <th class="py-2 px-4">Body</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in paginatedPosts"
              :key="post.id"
              class="bg-gray-100 border-b"
            >
              <td class="py-2 px-4">{{ post.id }}</td>
              <td class="py-2 px-4">
                <nuxt-link
                  :to="`/posts/${post.id}`"
                  class="text-blue-500 underline"
                >
                  {{ post.title }}
                </nuxt-link>
              </td>
              <td class="py-2 px-4">{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PostTablePagination />

      <!-- Кнопка для вызова модалки создания поста -->
      <ModalOpenButton />
    </div>

    <PostModal v-if="showModal" />
  </div>
</template>
