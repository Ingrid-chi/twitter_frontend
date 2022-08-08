module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_reset.scss";
          @import "@/styles/_mixin.scss";
          @import "@/styles/_variables.scss";
          @import "@/styles/_font.scss";
          @import "@/styles/_common.scss";
          @import "@/styles/_style.scss";
        `,
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/forum-front-end-vue/" : "/",
};
