<script lang="ts" setup>
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();
const {  loading } =
  storeToRefs(postStore);
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center min-h-96">
      <div
        class="animate-spin rounded-full h-60 w-60 border-b-2 border-gray-900"
      />
    </div>
</template>
