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
  --color-light: rgba(0, 0, 0, 0.3);
  --color-white: #fff;
  --color-darkest: #000;
  --color-black: #000;
  --color-border: #c4c4c4;

  --text-faded: rgba(23, 23, 39, 0.4);

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

a {
  text-decoration: none;

  &:visited {
    color: inherit;
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-width: $screen-min;
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

.PageWrapper {
  padding: 15px 30px 15px 50px;

  @media (max-width: $screen-mobile) {
    padding-right: 15px;
    padding-left: 15px;
  }
}

.Link {
  color: inherit;
  text-decoration: none;
}

.Input {
  width: 100%;
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

.ServerInfo {
  font-size: 1.4rem;
}

.Icon {
  width: 22px;
  height: 22px;

  @media (max-width: $screen-tablet) {
    width: 16px;
    height: 16px;
  }

  &--like {
    fill: var(--color-primary);
  }

  &--dislike {
    fill: var(--color-secondary);
    transform: rotate(180deg);
  }

  &--views {
    width: 34px;

    @media (max-width: $screen-tablet) {
      width: 25px;
    }
  }

  &-Google {
    width: 34px;
    height: 32px;
  }

  &-Fb {
    width: 33px;
    height: 32px;
  }

  &-Vk {
    width: 33px;
    height: 31px;
  }
}

.Form {
  &-Row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 31px;

    @media (max-width: 500px) {
      display: block;
    }
  }

  &-Label {
    width: 40%;
    font-size: 1.4rem;

    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  &-Value {
    width: 60%;

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  &-Value--size_min {
    display: flex;
    align-items: center;
  }

  &-Input--size_min {
    flex-shrink: 1;
  }

  &-Captcha {
    margin-right: 16px;
  }

  &-Submit {
    text-align: right;
  }
}
</style>
