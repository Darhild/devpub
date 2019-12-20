<template>
  <div class="Calendar-Table">
    <CalendarMonth
      v-for="month in 12"
      :key="month"
      :year="year"
      :month="month - 1"
      :posts="posts"
    />
  </div>
</template>

<script>
const CalendarMonth = () =>
  import(
    /* webpackChunkName: "calendarMonth" */ "@/components/CalendarMonth.vue"
  );

export default {
  components: {
    CalendarMonth
  },

  props: {
    year: {
      type: Number,
      required: true
    },
    posts: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.Calendar-Table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-items: center;

  @media (max-width: $screen-desktop) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $screen-tablet) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: $screen-mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
