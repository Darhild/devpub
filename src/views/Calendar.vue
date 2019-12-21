<template>
  <div class="Calendar">
    <BaseNavbar
      className="Calendar-Nav"
      :navItems="years"
      @set-nav-value="selectActiveYear"
    />
    <CalendarTable :year="years[activeYear].value" :posts="posts" />
  </div>
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
  padding: 15px 20px 25px 15px;

  .Calendar-Nav {
    justify-content: flex-start;
    margin-bottom: 30px;

    .Nav-Item {
      margin-right: 15px;
    }
  }
}
</style>
