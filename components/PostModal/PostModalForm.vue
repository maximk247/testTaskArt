<script lang="ts" setup>
import { reactive } from 'vue';
import { usePostStore } from '~/store/postStore';
import ButtonComponent from '../UI/ButtonComponent.vue';
import InputComponent from '../UI/InputComponent.vue';
import TextareaComponent from '../UI/TextareaComponent.vue';

const postStore = usePostStore();

const post = reactive({ title: '', body: '' });

const emit = defineEmits(['submitted', 'cancel']);

function submitPost() {
  postStore.createPost(post);
  post.title = '';
  post.body = '';
  emit('submitted');
}
</script>

<template>
  <form @submit.prevent="submitPost">
    <div class="mb-4">
      <InputComponent v-model="post.title" placeholder="Title" />
    </div>

    <div class="mb-4">
      <TextareaComponent v-model="post.body" placeholder="Body" />
    </div>

    <div class="mt-4 flex justify-end space-x-4">
      <ButtonComponent
        type="submit"
        label="Submit"
        bg-color="bg-blue-500"
        text-color="text-white"
      />
      <ButtonComponent
        type="button"
        label="Cancel"
        bg-color="bg-gray-500"
        text-color="text-white"
        @click="$emit('cancel')"
      />
    </div>
  </form>
</template>
