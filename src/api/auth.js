export default function (api) {
  return {
    registration(data) {
      return api.post("/auth/registration", data);
    },

    login(data) {
      return api.post("/auth/login", data);
    },

    users() {
      return api.get("/auth/users");
    },

  }
}