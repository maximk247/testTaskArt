import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],  // Отсортированный массив, который мы получаем с сервера
    shuffledPosts: [] as Post[],  // Перемешанный массив, который мы перемешаем один раз
    loading: false,
    error: null as string | null,
    currentPage: 1,
    postsPerPage: 10,
    totalposts: 0,
    sortOrder: 'none' as 'asc' | 'desc' | 'none',
    showModal: false,
    postsShuffled: false,  // Флаг для контроля однократного перемешивания
  }),
  getters: {
    // Получаем отсортированные или перемешанные посты
    sortedPosts(state) {
      switch (state.sortOrder) {
        case 'asc':
          return [...state.posts].sort((a, b) => a.id - b.id);
        case 'desc':
          return [...state.posts].sort((a, b) => b.id - a.id);
        case 'none':
          // Возвращаем перемешанные посты (один раз)
          return state.shuffledPosts.length ? state.shuffledPosts : [...state.posts];
        default:
          return state.posts;
      }
    },
    // Возвращаем посты, которые должны отображаться на текущей странице
    paginatedPosts(state): Post[] {
      const sorted = this.sortedPosts;
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = state.currentPage * state.postsPerPage;
      return sorted.slice(start, end); // Используем отсортированные посты
    },
    // Общее количество страниц
    totalPages(state) {
      const totalPosts = state.posts.length;
      return Math.ceil(totalPosts / state.postsPerPage);
    },

    // Максимальный ID
    maxTotalId(state) {
      return state.posts.length
        ? Math.max(...state.posts.map((post) => post.id))
        : 0;
    },
  },
  actions: {
    // Функция получения постов
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts',
        );
        this.posts = response.data;
        this.totalposts = this.posts.length;

        // Один раз перемешиваем посты
        if (!this.postsShuffled) {
          this.shuffledPosts = [...this.posts].sort(() => Math.random() - 0.5);
          this.postsShuffled = true; // Устанавливаем флаг, что перемешивание выполнено
        }

      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = String(e);
        }
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляция загрузки
        this.loading = false;
      }
    },

    // Функция переключения сортировки
    toggleSortOrder() {
      switch (this.sortOrder) {
        case 'asc':
          this.sortOrder = 'desc';
          break;
        case 'desc':
          this.sortOrder = 'none'; // При возвращении к "none" возвращаемся к перемешанному списку
          break;
        case 'none':
          this.sortOrder = 'asc';
          break;
        default:
          this.sortOrder = 'asc';
      }
    },

    // Функция добавления поста
    createPost(postData: Omit<Post, 'id' | 'userId'>) {
      const nextPostId = this.maxTotalId + 1; // Определяем следующий ID поста
      const userId = Math.ceil(nextPostId / 10); // Определяем userId по числу десятков
      const newPost: Post = {
        ...postData,
        id: nextPostId,
        userId,
      };
      this.posts.push(newPost);
      this.shuffledPosts.push(newPost); // Добавляем пост и в перемешанный массив

      // Определяем, на какую страницу переключиться после добавления поста
      if (this.sortOrder === 'asc') {
        this.setCurrentPage(this.totalPages); // Если сортировка по возрастанию, переключаемся на последнюю страницу
      } else if (this.sortOrder === 'desc') {
        this.setCurrentPage(1); // Если сортировка по убыванию, переключаемся на первую страницу
      } else {
        // Если сортировка отключена
        const shuffledPosts = this.sortedPosts; // Получаем перемешанные посты
        const postIndex = shuffledPosts.findIndex(
          (post) => post.id === newPost.id,
        ); // Находим индекс нового поста
        const newPostPage = Math.floor(postIndex / this.postsPerPage) + 1; // Определяем страницу, где находится пост
        this.setCurrentPage(newPostPage); // Устанавливаем текущую страницу на страницу с новым постом
      }
    },

    // Устанавливаем текущую страницу с индикацией загрузки
    async setCurrentPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.loading = true;
        this.currentPage = page;
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляция загрузки
        this.loading = false;
      }
    },

    // Функция открытия/закрытия модального окна
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
