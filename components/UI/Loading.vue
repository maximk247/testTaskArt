<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();
const {  loading } =
  storeToRefs(postStore);
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
      />
    </div>
</template>
