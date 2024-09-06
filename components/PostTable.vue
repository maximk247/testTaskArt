<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePostStore } from '~/store/postStore';
import PostModal from './PostModal.vue';
import PostTablePagination from './PostTablePagination.vue';
import type { Post } from '~/interfaces/post.interface';

const postStore = usePostStore();
const { paginatedPosts } = storeToRefs(postStore);
const showModal = ref(false);
const showLoading = ref(true);

onMounted(async () => {
  await lazyLoad();
});

async function lazyLoad() {
  await postStore.fetchPosts(); 
  setTimeout(() => {
    showLoading.value = false; 
  }, 300);
}

function createPost(postData: Omit<Post, 'id'>) {
  postStore.createPost(postData);
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Post Table</h1>
    <button class="mb-4 bg-blue-500 text-white py-2 px-4 rounded" @click="showModal = true">Create New Post</button>

    <div v-if="showLoading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <span class="ml-4"> Loading... </span>
    </div>

    <!-- Отображаем таблицу и пагинацию только если данные загружены -->
    <div v-else>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-2">Id</th>
            <th class="py-2">Title</th>
            <th class="py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in paginatedPosts" :key="post.id" class="bg-gray-100 border-b">
            <td class="py-2 px-4">{{ post.id }}</td>
            <td class="py-2 px-4">{{ post.title }}</td>
            <td class="py-2 px-4">{{ post.body }}</td>
          </tr>
        </tbody>
      </table>

      <PostTablePagination />
    </div>

    <PostModal v-if="showModal" @submit="createPost" @cancel="showModal = false" />
  </div>
</template>
