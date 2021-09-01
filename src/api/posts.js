export default function (api) {
  return {
    getPosts(params) {
      return api.get("/posts", {
        params
      });
    },

    get(id) {
      return api.get(`/posts/${id}`);
    },

    create(data) {
      return api.post("/posts", data);
    },

    update(id, data) {
      return api.put(`/posts/${id}`, data);
    },

    delete(id) {
      return api.delete(`/posts/${id}`);
    },

    deleteAll() {
      return api.delete(`/posts`);
    },

    findByTitle(title) {
      return api.get(`/posts?title=${title}`);
    }
  }
}