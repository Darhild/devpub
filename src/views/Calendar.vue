<template>
  <div class="Calendar">
    <BaseNavbar
      className="Calendar-Nav"
      :navItems="years"
      @set-value="selectActiveYear"
    />
    <CalendarTable :year="+years[activeYear]" />
  </div>
</template>

<script>
//import axios from "axios";
//import { SERVER_URL } from "./../env";
import BaseNavbar from "@/components/BaseNavbar.vue";
import CalendarTable from "@/components/CalendarTable.vue";

export default {
  components: {
    BaseNavbar,
    CalendarTable
  },

  data() {
    return {
      years: ["2019", "2018", "2017", "2016", "2015", "2014"],
      activeYear: 0
    };
  },

  methods: {
    selectActiveYear(value) {
      this.activeYear = value;
    }
  }
};
</script>

<style lang="scss">
.Calendar {
  padding: 15px 20px 25px 15px;

  &-Nav {
    justify-content: flex-start;
    margin-bottom: 30px;
  }
}
</style>
