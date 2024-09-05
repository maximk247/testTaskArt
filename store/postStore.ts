import axios from 'axios';
import type { Post } from '~/interfaces/post.interface';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 10,
    postsPerPage: 10,
  }),
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
        this.posts = response.data;
        const totalPosts = parseInt(response.headers['x-total-count'], 10);
        this.totalPages = Math.ceil(totalPosts / this.postsPerPage);
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
        this.posts.push(response.data);
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
