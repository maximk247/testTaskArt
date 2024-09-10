<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { usePostStore } from '~/store/postStore';
import ButtonComponent, {
  type ButtonComponentInstance,
} from '../UI/ButtonComponent.vue';
import InputComponent from '../UI/InputComponent.vue';
import TextareaComponent from '../UI/TextareaComponent.vue';

const postStore = usePostStore();

const post = reactive({ title: '', body: '' });
const submitButtonRef = ref<ButtonComponentInstance | null>(null); // Ссылка на экземпляр компонента ButtonComponent

const emit = defineEmits(['submitted', 'cancel']);

function submitPost() {
  postStore.createPost(post);
  post.title = '';
  post.body = '';
  emit('submitted');
}

// Обработка нажатия клавиши Enter внутри полей
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitButtonRef.value?.focusAndClickedButton();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <form @submit.prevent="submitPost">
    <div class="mb-4">
      <InputComponent
        v-model="post.title"
        placeholder="Title"
        @keydown="handleKeyDown"
      />
    </div>

    <div class="mb-4">
      <TextareaComponent
        v-model="post.body"
        placeholder="Body"
        @keydown="handleKeyDown"
      />
    </div>

    <div class="mt-4 flex justify-end space-x-4">
      <ButtonComponent
        ref="submitButtonRef"
        type="submit"
        bg-color="bg-blue-500"
        text-color="text-white"
      >
        Submit
      </ButtonComponent>
      <ButtonComponent
        type="button"
        bg-color="bg-gray-500"
        text-color="text-white"
        @click="$emit('cancel')"
      >
        Cancel
      </ButtonComponent>
    </div>
  </form>
</template>
