<script lang="ts" setup>
import type { Post } from '~/interfaces/post.interface';
import { usePostStore } from '~/store/postStore';
import PostModal from './PostModal.vue';

const postStore = usePostStore();
const { loading, paginatedPosts, currentPage, totalPages } =
  storeToRefs(postStore);
const showModal = ref(false);

onMounted(() => {
  postStore.fetchPosts();
});

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

function createPost(postData: Omit<Post, 'id'>) {
  postStore.createPost(postData);
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Post Table</h1>
    <button class="mb-4" @click="showModal = true">Create New Post</button>

    <div v-if="loading" class="text-center">Loading...</div>

    <table v-if="!loading">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in paginatedPosts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center gap-2 mt-4">
      <button :disabled="currentPage === 1" @click="firstPage">First</button>
      <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        Next
      </button>
      <button :disabled="currentPage === totalPages" @click="lastPage">
        Last
      </button>
    </div>

    <PostModal
      v-if="showModal"
      @submit="createPost"
      @cancel="showModal = false"
    />
  </div>
</template>
