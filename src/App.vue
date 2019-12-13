<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap");

:root {
  --color-primary: #4b4bee;
  --color-secondary: #ec4141;

  --color-layout-primary: #f2f2f2;
  --color-layout-dark: #171727;
  --color-lightest: #fff;
  --color-white: #fff;
  --color-darkest: #000;
  --color-black: #000;

  --text-faded: #rgba(23, 23, 39, 0.4);

  --color-hover: #9595f5;
  --color-active: #6767ed;
}

html {
  font-size: 10px;
  font-weight: 400;
  line-height: 1.2;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-width: $screen-mobile;
  max-width: $screen-desktop;
  min-height: 100vh;
  margin-right: auto;
  margin-left: auto;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

.Link {
  color: inherit;
  text-decoration: none;
}

.Input {
  padding: 4px 16px;
  background-color: var(--color-layout-primary);
  border: none;
  border-radius: 20px;

  &:focus {
    outline: none;
  }

  &:placeholder {
    font-size: 1.2rem;
    color: var(--text-faded);
  }
}

.Title {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>
