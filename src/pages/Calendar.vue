<template>
  <main class="Calendar Wrapper">
    <BaseNavbar
      className="Calendar-Nav"
      :navItems="years"
      :activeNavIndex="activeYearIndex"
      @set-nav-value="selectActiveYear"
    />
    <CalendarTable :year="year" :posts="posts" />
  </main>
</template>

<script>
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
  components: {
    BaseNavbar,
    CalendarTable
  },

  data() {
    return {
      activeYearIndex: 0,
      years: [],
      posts: {},
      errors: []
    };
  },

  computed: {
    year() {
      return +this.$route.params.year;
    }
  },

  methods: {
    selectActiveYear(val) {
      this.activeYearIndex = val;
      this.getPostsCount();
    },

    getPostsCount() {
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
    this.getPostsCount().then(() => {
      this.activeYearIndex = this.years.findIndex(
        item => item.value == this.$route.params.year
      );
    });
  },

  metaInfo: {
    title: "Календарь | DevPub - рассказы разработчиков"
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
