import POST_API from "@api/posts.ts";

export default {
  state: {
    posts: [],
    totalPages: 0,
    totalItems: 0
  },
  getters: {
    allPosts(state) {
      return state.posts;
    },
    totalPages(state) {
      return state.totalPages;
    },
    totalItems(state) {
      return state.totalItems;
    },
  },
  mutations: {
    setPostsData(state, data) {
      const {
        posts,
        totalPages,
        totalItems
      } = data;

      state.posts = posts;
      state.totalPages = totalPages;
      state.totalItems = totalItems;
    }
  },
  actions: {
    // Get All Posts
    async getPosts({
      commit
    }, params) {
      let response;
      try {
        response = await POST_API.getPosts(params);
      } catch (error) {
        return;
      }

      commit('setPostsData', response.data);
    },

    // Remove All Posts
    async removeAllPosts({
      commit
    }) {
      try {
        await POST_API.deleteAll();
        commit('setPostsData', {
          posts: [],
          totalPages: 0,
          totalItems: 0
        });
      } catch (error) {
        console.log(error);
        return;
      }
    },

    // Search By Title
    async searchPost({
      commit
    }, {
      title
    }) {
      try {
        const response = await POST_API.findByTitle(title);
        commit('setPostsData', response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        return;
      }
    },
  },
}