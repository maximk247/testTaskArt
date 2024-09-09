<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePostStore } from '~/store/postStore';
import PostModal from '../PostModal/PostModal.vue';
import Loading from '../UI/Loading.vue';
import ModalOpenButton from '../UI/ModalOpenButton.vue';
import PostTableContent from './Content/PostTableContent.vue';
import PostTablePagination from './PostTablePagination.vue';
const postStore = usePostStore();
const { paginatedPosts, totalPages, loading, showModal } =
  storeToRefs(postStore);

onMounted(async () => {
  await postStore.fetchPosts();
});
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold mb-4 select-none">Post Table</h1>
    </div>

    <!-- Показать индикатор загрузки при изменении страницы или при первой загрузке -->
    <Loading />

    <!-- Отображаем таблицу, пагинацию и возможность добавления поста только если данные загружены и есть посты -->
    <div v-if="!loading && paginatedPosts.length > 0 && totalPages > 0">
      <PostTableContent />
      <PostTablePagination />
      <ModalOpenButton />
    </div>

    <PostModal v-if="showModal" />
  </div>
</template>
