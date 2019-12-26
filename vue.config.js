module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/variables.scss";`
      }
    }
  },

  build: {
    assetsPublicPath: "/",
    assetsSubDirectory: "static"
  }
};
