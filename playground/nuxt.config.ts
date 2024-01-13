export default defineNuxtConfig({
  modules: ["../src/module"],
  orama: {
    schemas: [
      {
        schema: {
          id: "string",
          username: "string",
          user: {
            firstName: "string",
            lastName: "string",
          },
        },
      },
    ],
  },
  devtools: { enabled: true },
});
