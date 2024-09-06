import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    postsPerPage: 10,
    maxTotalId: 100, // Максимальный ID для постов
    totalposts: 0,
  }),
  getters: {
    // Возвращаем посты, которые должны отображаться на текущей странице
    paginatedPosts(state) {
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = state.currentPage * state.postsPerPage;
      return state.posts.slice(start, end);
    },
    // Общее количество страниц
    totalPages(state) {
      const totalPosts = state.posts.length;
      return Math.ceil(totalPosts / state.postsPerPage);
    },
  },
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts',
        );
        this.posts = response.data;
        this.totalposts = this.posts.length;
        const maxServerId = Math.max(
          ...this.posts.map((post) => post.id),
        );
        this.maxTotalId = Math.max(this.maxTotalId, maxServerId);
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = String(e);
        }
      } finally {
        this.loading = false;
      }
    },

    async createPost(postData: Omit<Post, 'id'>) {
      try {
        const response = await axios.post<Post>(
          'https://jsonplaceholder.typicode.com/posts',
          postData,
        );
        const newPost = {
          ...response.data,
          id: ++this.maxTotalId,
        };
        this.posts.push(newPost);

        // Переключаемся на последнюю страницу после добавления поста, если он превышает лимит постов на страницу
        if (this.currentPage !== this.totalPages) {
          this.setCurrentPage(this.totalPages);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = String(e);
        }
      }
    },

    setCurrentPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
});
