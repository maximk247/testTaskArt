<script lang="ts" setup>
import { reactive } from 'vue';
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore();

const post = reactive({ title: '', body: '' });

function submitPost() {
  postStore.createPost(post);
  post.title = '';
  post.body = '';
}

function toggleModal() {
  postStore.toggleModal();
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h3 class="text-2xl font-semibold mb-4 text-gray-800">Create Post</h3>
      <form @submit.prevent="submitPost">
        <div class="mb-4">
          <input
            v-model="post.title"
            type="text"
            placeholder="Title"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <textarea
            v-model="post.body"
            placeholder="Body"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="5"
            required
          />
        </div>

        <div class="mt-4 flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            @click="toggleModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
