<template>
  <div class="max-w-5xl mx-auto p-4">
    <div v-if="post">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <button class="mt-4 bg-gray-300 p-2 rounded" @click="goBack">
        Go Back
      </button>
    </div>
    <div v-else class="text-center mt-10">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '~/store/postStore';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();

// Получаем конкретный пост по id из маршрута
const post = computed(() => {
  return postStore.posts.find((p) => p.id === Number(route.params.id));
});

// Если нет постов в сторе, загружаем их при монтировании
onMounted(async () => {
  if (!postStore.posts.length) {
    await postStore.fetchPosts();
  }
});

// Функция для возврата на предыдущую страницу
function goBack() {
  router.back();
}
</script>
