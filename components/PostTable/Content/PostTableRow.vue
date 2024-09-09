<script lang="ts" setup>
import type { Post } from '~/interfaces/post.interface';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <tr class="bg-gray-100 border-b" style="height: 50px">
    <td class="py-2 px-4 border border-gray-300 text-center">
      {{ post.id }}
    </td>
    <td class="py-2 px-4 border border-gray-300">
      <nuxt-link :to="`/posts/${post.id}`" class="text-blue-500 underline">
        {{ post.title }}
      </nuxt-link>
    </td>
    <td class="py-2 px-4 border border-gray-300">{{ post.body }}</td>
  </tr>
</template>
