<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';
import PostTableHeader from './PostTableHeader.vue';
import PostTableRow from './PostTableRow.vue';

const postStore = usePostStore();
const { paginatedPosts } = storeToRefs(postStore);
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full bg-white table-fixed border-separate border-spacing-0"
    >
      <!-- Шапка таблицы -->
      <PostTableHeader />

      <!-- Содержимое таблицы -->
      <tbody>
        <PostTableRow
          v-for="post in paginatedPosts"
          :key="post.id"
          :post="post"
        />
      </tbody>
    </table>
  </div>
</template>
