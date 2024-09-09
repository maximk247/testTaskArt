import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    postsPerPage: 10,
    totalposts: 0,
    sortOrder: 'none' as 'asc' | 'desc' | 'none',
    showModal: false,
  }),
  getters: {
    // Получаем отсортированные посты
    sortedPosts(state) {
      switch (state.sortOrder) {
        case 'asc':
          return [...state.posts].sort((a, b) => a.id - b.id);
        case 'desc':
          return [...state.posts].sort((a, b) => b.id - a.id);
        case 'none':
          // Перемешиваем посты случайным образом
          return [...state.posts].sort(() => Math.random() - 0.5);
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
          this.sortOrder = 'none';
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
      // Определяем, на какую страницу переключиться после добавления поста
      if (this.sortOrder === 'asc') {
        // Если сортировка по возрастанию, переключаемся на последнюю страницу
        if (this.currentPage !== this.totalPages) {
          this.setCurrentPage(this.totalPages);
        }
      } else {
        // Если сортировка по убыванию, переключаемся на первую страницу
        this.setCurrentPage(1);
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
