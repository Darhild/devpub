<template>
  <main class="Calendar Wrapper">
    <BaseNavbar
      className="Calendar-Nav"
      :navItems="years"
      @set-nav-value="selectActiveYear"
    />
    <CalendarTable :year="years[activeYear].value" :posts="posts" />
  </main>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
const BaseNavbar = () =>
  import(/* webpackChunkName: "baseNavbar" */ "@/components/BaseNavbar.vue");
const CalendarTable = () =>
  import(
    /* webpackChunkName: "calendarTable" */ "@/components/CalendarTable.vue"
  );

export default {
  name: "calendar",

  components: {
    BaseNavbar,
    CalendarTable
  },

  data() {
    return {
      years: [],
      activeYear: 0,
      posts: {}
    };
  },

  methods: {
    selectActiveYear(val) {
      this.activeYear = val;
      this.getPostsCount(this.years[val].value);
    },

    getPostsCount(year) {
      axios
        .get(`${SERVER_URL}/api/calendar?year=${year}`)
        .then(res => (this.posts = res.data.posts))
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/calendar`)
      .then(res => {
        this.years.push(...res.data.years);
        this.years = this.years.map(year => {
          return { name: year, value: year };
        });
        this.getPostsCount(this.years[0].value);
      })
      .catch(e => {
        console.log(e);
      });
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
