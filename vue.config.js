module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/variables.scss";`
      }
    }
  },

  assetsDir: "static"
};
