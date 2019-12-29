<template>
  <div class="Footer">
    <div class="Wrapper Footer-Wrapper">
      <div class="Footer-Links">
        <router-link class="Link Footer-Item" to="/">
          Главная
        </router-link>
        <router-link class="Link Footer-Item" to="/calendar">
          Календарь
        </router-link>
        <router-link class="Link Footer-Item" to="/stat">
          Статистика
        </router-link>
      </div>
      <div class="Footer-Info">
        <div class="Footer-Item">
          <a :href="`tel:${phone}`" class="Link">{{ phone }}</a>
        </div>
        <div class="Footer-Item">
          <a :href="`mailto:${email}`" class="Link">
            {{ email }}
          </a>
        </div>
        <div class="Footer-Item">
          (c) {{ copyright }}, {{ copyrightFrom }}-{{
            new Date().getFullYear()
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",

  data() {
    return {
      phone: "",
      email: "",
      copyright: "",
      copyrightFrom: ""
    };
  },

  watch: {
    blogInfo() {
      if (this.blogInfo) {
        this.phone = this.blogInfo.phone;
        this.email = this.blogInfo.email;
        this.copyright = this.blogInfo.copyright;
        this.copyrightFrom = this.blogInfo.copyrightFrom;
      }
    }
  },

  computed: {
    ...mapGetters(["blogInfo"])
  }
};
</script>

<style lang="scss">
.Footer {
  margin-top: auto;
  padding: 15px 0;
  border-top: 1px solid var(--color-layout-primary);

  &-Wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: $screen-tablet) {
      flex-direction: column;
      align-items: center;
    }
  }

  &-Item {
    display: block;
    margin-bottom: 16px;
    font-size: 1.4rem;
    line-height: 1.2;
    color: var(--color-black);

    @media (max-width: $screen-tablet) {
      margin-right: 15px;
      margin-bottom: 10px;
      text-align: center;

      &:last-child {
        margin-right: 0;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Links {
    @media (max-width: $screen-tablet) {
      display: flex;
      margin-bottom: 10px;
    }
  }
}
</style>
