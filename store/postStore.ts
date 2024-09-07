import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    postsPerPage: 10,
    maxTotalId: 100,
    totalposts: 0,
    sortOrder: 'asc' as 'asc' | 'desc',
    showModal: false,
  }),
  getters: {
    // Получаем отсортированные посты
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        if (state.sortOrder === 'asc') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
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
        const maxServerId = Math.max(...this.posts.map((post) => post.id));
        this.maxTotalId = Math.max(this.maxTotalId, maxServerId);
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
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    // Функция добавления поста
    createPost(postData: Omit<Post, 'id'>) {
      const newPost: Post = {
        ...postData,
        id: ++this.maxTotalId,
        userId: 1,
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

      this.toggleModal(); // Закрываем модальное окно после создания поста
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

    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
