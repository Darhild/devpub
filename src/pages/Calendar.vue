<template>
  <main class="Calendar Wrapper">
    <BaseNavbar
      className="Calendar-Nav"
      :navItems="years"
      :activeNavIndex="activeYearIndex"
    />
    <CalendarTable :year="year" :posts="posts" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { handleResponseErrors } from "@/utils";
import axios from "axios";
import { SERVER_URL } from "./../env";
const BaseNavbar = () =>
  import(/* webpackChunkName: "baseNavbar" */ "@/components/BaseNavbar.vue");
const CalendarTable = () =>
  import(
    /* webpackChunkName: "calendarTable" */ "@/components/CalendarTable.vue"
  );

export default {
  name: "Calendar",

  components: {
    BaseNavbar,
    CalendarTable
  },

  data() {
    return {
      activeYearIndex: 0,
      years: [],
      year: new Date().getFullYear(),
      posts: {},
      errors: []
    };
  },

  computed: {
    ...mapGetters(["blogInfo"])
  },

  watch: {
    $route() {
      this.getPostsCount();
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.year = +to.params.year;
    next();
  },

  methods: {
    getPostsCount() {
      console.log(this.year);
      return axios
        .get(`${SERVER_URL}/api/calendar?year=${this.year}`)
        .then(res => {
          if (!handleResponseErrors(res)) {
            this.years = res.data.years.map(year => {
              return { name: String(year), value: String(year) };
            });
            this.posts = res.data.posts;
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },

  mounted() {
    this.year = +this.$route.params.year;
    this.getPostsCount().then(() => {
      this.activeYearIndex = this.years.findIndex(
        item => item.value == this.$route.params.year
      );
    });
  },

  metaInfo() {
    return {
      title: this.blogInfo
        ? `Календарь | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
        : "Календарь"
    };
  }
};
</script>

<style lang="scss">
.Calendar {
  margin-bottom: 20px;

  &-Nav {
    margin-bottom: 30px;
  }
}
</style>
