<template>
  <div class="Stat PageWrapper">
    <BaseNavbar
      className="Stat-Nav"
      :navItems="navItems"
      :margin="'right'"
      @set-nav-value="selectActiveNavProp"
    />
    <div class="Stat-Content">
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
  </div>
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
      postsCount: 0,
      likesCount: 0,
      dislikesCount: 0,
      viewsCount: 0,
      firstPublication: ""
    };
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
      axios
        .get(
          `${SERVER_URL}/api/statistics/${
            this.navItems[this.activeNavProp].value
          }`
        )
        .then(res => {
          this.forModeration
            ? (this.articles = res.data.posts)
            : (this.articles = res.data);
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
    margin-bottom: 25px;
  }

  &-Row {
    display: flex;
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  &-Prop {
    width: 150px;
  }
}
</style>
