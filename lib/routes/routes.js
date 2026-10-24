export const routes = {
  root: "/",

  auth: {
    login: "/auth/login",
  },

  panel: {
    users: "/users",
    user: (id) => `/users/${id}`,
  },
};
