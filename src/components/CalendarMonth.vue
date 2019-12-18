<template>
  <div class="CalendarMonth">
    <div class="CalendarMonth-Title">
      {{ monthNames[month] }}
    </div>
    <div class="CalendarMonth-Table">
      <div class="CalendarMonth-Day CalendarMonth-Weekday">
        monday
      </div>
      <div class="CalendarMonth-Day CalendarMonth-Weekday">
        tuesday
      </div>
      <div class="CalendarMonth-Day CalendarMonth-Weekday">
        wednesday
      </div>
      <div class="CalendarMonth-Day CalendarMonth-Weekday">
        thursday
      </div>
      <div class="CalendarMonth-Day CalendarMonth-Weekday">
        friday
      </div>
      <div
        class="CalendarMonth-Day CalendarMonth-Weekday CalendarMonth-Weekday--Weekend"
      >
        saturday
      </div>
      <div
        class="CalendarMonth-Day CalendarMonth-Weekday CalendarMonth-Weekday--Weekend"
      >
        sunday
      </div>
      <div
        v-for="num in offset"
        :key="`offset-${num}`"
        class="CalendarMonth-Day"
      ></div>
      <div v-for="(day, index) in days" :key="index" class="CalendarMonth-Day">
        <router-link
          v-if="getPostsCountByDate(day)"
          :to="{ name: 'mainPage', params: { date: formatDate(day) } }"
          class="CalendarMonth-Link"
        >
          <div class="CalendarMonth-PostsCount">
            {{ getPostsCountByDate(day) }}
          </div>
          <div class="CalendarMonth-DayNum">
            {{ day }}
          </div>
        </router-link>
        <template v-else>
          <div class="CalendarMonth-DayNum">
            {{ day }}
          </div>
        </template>
      </div>
      <div
        v-for="num in postOffset"
        :key="`postOffset-${num}`"
        class="CalendarMonth-Day"
      ></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";

export default {
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    posts: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      monthNames: {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
      },
      weeks: 0,
      days: 0,
      offset: 0
    };
  },

  computed: {
    postOffset() {
      const leftover = (this.days + this.offset) % 7;
      if (leftover === 0) return 7;
      return 14 - leftover;
    }
  },

  watch: {
    year() {
      this.setDateInfo();
    }
  },

  methods: {
    setDateInfo() {
      const date = new Date(this.year, this.month);
      this.offset = date.getDay() - 1 > 0 ? date.getDay() - 1 : 6;
      switch (this.month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
          this.days = 31;
          break;
        case 3:
        case 5:
        case 8:
        case 10:
          this.days = 30;
          break;
        case 1:
          this.days = this.year % 4 === 0 ? 29 : 28;
      }
      this.weeks = Math.ceil((this.days + this.offset + 1) / 7);
    },

    formatDate(day) {
      return formatDate(this.year, this.month, day);
    },

    getPostsCountByDate(day) {
      let { year, month } = this;
      month = month + 1;
      const key = formatDate(year, month, day);
      return this.posts[key];
    }
  },

  mounted() {
    this.setDateInfo();
  }
};
</script>
>

<style lang="scss">
.CalendarMonth {
  &-Table {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &-Title {
    margin-bottom: 5px;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-primary);
  }

  &-Day {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 32px;
    height: 30px;
    padding: 2px;
    font-size: 0.6rem;
    font-weight: 500;
    vertical-align: bottom;
    color: var(--color-primary);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);

    &:nth-child(7n):after {
      content: "";
      position: absolute;
      top: 0;
      right: -6px;
      width: 6px;
      height: 100%;
      border-bottom: 1px solid var(--color-border);
    }

    &:nth-child(7n + 1):before {
      content: "";
      position: absolute;
      top: 0;
      left: -6px;
      width: 6px;
      height: 100%;
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }

    &:nth-last-child(-n + 7) {
      height: 6px;
      border-bottom: none;
    }

    &:nth-last-child(-n + 7):before {
      border-bottom: none;
    }

    &:nth-last-child(-n + 7):after {
      border: none;
    }
  }

  &-Link {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &-DayNum {
    margin-top: auto;
    text-align: right;
  }

  &-PostsCount {
    width: 10px;
    height: 10px;
    text-align: center;
    line-height: 10px;
    color: var(--color-lightest);
    background-color: var(--color-secondary);
    border-radius: 50%;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 7px;
      height: 7px;
      background: linear-gradient(
        to top right,
        var(--color-lightest) 50%,
        var(--color-highlight) 50%
      );
    }
  }

  &-Weekday {
    height: 10px;
    padding: 1px;
    text-align: center;

    &--Weekend {
      color: var(--color-secondary);
    }
  }
}
</style>
