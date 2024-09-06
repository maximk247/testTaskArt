import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    serverPosts: [] as Post[], // Посты с сервера
    localPosts: [] as Post[], // Посты, созданные локально
    loading: false,
    error: null as string | null,
    currentPage: 1,
    postsPerPage: 10,
    maxTotalId: 100, // Максимальный ID для постов
    totalServerPosts: 0,
  }),
  getters: {
    // Возвращаем посты, которые должны отображаться на текущей странице
    paginatedPosts(state) {
      // Если текущая страница - последняя, добавляем локальные посты
      if (
        state.currentPage ===
        Math.ceil(
          (state.totalServerPosts + state.localPosts.length) /
            state.postsPerPage,
        )
      ) {
        return [...state.serverPosts, ...state.localPosts];
      }
      return state.serverPosts;
    },
    // Общее количество страниц
    totalPages(state) {
      return Math.ceil(
        (state.totalServerPosts + state.localPosts.length) / state.postsPerPage,
      );
    },
  },
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.currentPage,
              _limit: this.postsPerPage,
            },
          },
        );
        this.serverPosts = response.data;
        this.totalServerPosts = parseInt(response.headers['x-total-count'], 10);
        const maxServerId = Math.max(
          ...this.serverPosts.map((post) => post.id),
        );
        console.log(maxServerId);
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
        this.localPosts.push(newPost); // Добавляем пост в локальные

        // Переход на последнюю страницу, если новый пост добавляется
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
        this.fetchPosts();
      }
    },
  },
});
