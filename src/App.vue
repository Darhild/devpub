<template>
  <div id="app">
    <Header />
    <router-view/>
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
  --color-primary: #4B4BEE;
  --color-secondary: #EC4141;

  --color-layout-primary: #F2F2F2;
  --color-layout-dark: #171727;
  --color-white: #fff;
  --color-balck: #000;

  --text-faded: #rgba(23, 23, 39, 0.4);
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
  box-sizing: border-box
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
