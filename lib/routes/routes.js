export const routes = {
  auth: {
    login: "/auth/login",
  },

  panel: {
    users: "/users",
    user: (id) => `/users/${id}`,
  },
};
