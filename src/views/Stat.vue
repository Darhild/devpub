<template>
  <main class="Stat Wrapper">
    <BaseNavbar
      v-if="isAuth && !statIsInvisible"
      className="Stat-Nav"
      :navItems="navItems"
      :margin="'right'"
      @set-nav-value="selectActiveNavProp"
    />
    <div v-if="!isAuth && !statIsInvisible" class="Stat-Title">
      Статистика по всему блогу
    </div>
    <div v-if="isAuth && statIsInvisible" class="Stat-Title">
      Мои публикации
    </div>
    <div v-if="isAuth || !statIsInvisible" class="Stat-Content">
      <div class="Stat-Row">
        <div class="Stat-Prop">
          Постов:
        </div>
        <div class="Stat-Value">
          {{ postsCount }}
        </div>
      </div>
      <div class="Stat-Row">
        <div class="Stat-Prop">
          Лайков:
        </div>
        <div class="Stat-Value">
          {{ likesCount }}
        </div>
      </div>
      <div class="Stat-Row">
        <div class="Stat-Prop">
          Дизлайков:
        </div>
        <div class="Stat-Value">
          {{ dislikesCount }}
        </div>
      </div>
      <div class="Stat-Row">
        <div class="Stat-Prop">
          Просмотров
        </div>
        <div class="Stat-Value">
          {{ viewsCount }}
        </div>
      </div>
      <div class="Stat-Row">
        <div class="Stat-Prop">
          Первая публикация:
        </div>
        <div class="Stat-Value">
          {{ firstPublication }}
        </div>
      </div>
    </div>
    <div v-if="!isAuth && statIsInvisible" class="ServerInfo Stat-Info">
      Извините, публичная статистика этого сайта недоступна.
    </div>
  </main>
</template>

<script>
const BaseNavbar = () =>
  import(/* webpackChunkName: "baseNavbar" */ "@/components/BaseNavbar.vue");
import axios from "axios";
import { SERVER_URL } from "./../env";

export default {
  components: {
    BaseNavbar
  },

  data() {
    return {
      navItems: [
        {
          name: "Моя",
          value: "my"
        },
        {
          name: "По всему блоку",
          value: "all"
        }
      ],
      activeNavProp: 0,
      isLoading: true,
      isErrored: false,
      statIsInvisible: false,
      postsCount: 0,
      likesCount: 0,
      dislikesCount: 0,
      viewsCount: 0,
      firstPublication: "",
      errors: []
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },

  watch: {
    activeNavProp() {
      this.getStats();
    }
  },

  methods: {
    selectActiveNavProp(value) {
      this.activeNavProp = value;
    },

    getStats() {
      let param;

      if (this.isAuth && !this.statIsInvisible) {
        param = this.navItems[this.activeNavProp].value;
      } else if (this.statIsInvisible) param = "my";
      else this.statIsInvisible = "all";

      axios
        .get(`${SERVER_URL}/api/statistics/${param}`)
        .then(res => {
          if (res.status === 401) this.statIsInvisible = true;
          else {
            this.postsCount = res.data.postsCount;
            this.likesCount = res.data.likesCount;
            this.dislikesCount = res.data.dislikesCount;
            this.viewsCount = res.data.viewsCount;
            this.firstPublication = res.data.firstPublication;
          }
        })
        .catch(e => {
          this.errors.push(e);
          this.isErrored = true;
        })
        .finally(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.getStats();
  }
};
</script>

<style lang="scss">
.Stat {
  display: inline-block;

  &-Nav {
    justify-content: flex-start;
  }

  &-Title {
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 1.6rem;
    font-weight: 700;
  }

  &-Content {
    margin-top: 25px;
  }

  &-Row {
    display: flex;
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  &-Prop {
    width: 150px;
  }

  &-Info {
    margin-top: 45px;
  }
}
</style>
