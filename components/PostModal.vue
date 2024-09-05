<script lang="ts" setup>
import { reactive } from 'vue';

const emit = defineEmits(['submit', 'cancel']);

const post = reactive({ title: '', body: '' });

function submitPost() {
  emit('submit', post);
  post.title = '';
  post.body = '';
}
</script>


<template>
  <div
    class="fixed inset-0 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="bg-white p-4 rounded-lg">
      <h3 class="text-xl mb-4">Create Post</h3>
      <input
        v-model="post.title"
        type="text"
        placeholder="Title"
        class="mb-4 w-full"
      />
      <textarea v-model="post.body" placeholder="Body" class="w-full" />
      <div class="mt-4 flex justify-end">
        <button @click="submitPost">Submit</button>
        <button @click="emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
