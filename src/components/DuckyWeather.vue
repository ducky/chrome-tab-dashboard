<template>
  <div class="Day" :class="{ 'Day--today': weather.today }">
    <font-awesome-icon class="Day__icon" :icon="weather.icon" />
    <div v-if="weather.today" class="Day__temps">
      <div class="Day__temp">
        {{ weather.temperature }}
      </div>
    </div>
    <div v-if="!weather.today" class="Day__temps">
      <div class="Day__temp Day__temp--high">{{ weather.high }}</div>
      <div class="Day__temp Day__temp--low">{{ weather.low }}</div>
    </div>
    <div class="Day__name">{{ getName(weather.date) }}</div>
  </div>
</template>

<script>
import { format, isToday, parseISO } from 'date-fns';

export default {
  name: 'DuckyWeather',
  props: {
    weather: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getName(date) {
      const dateString = parseISO(date);
      if (isToday(dateString)) return 'Today';
      return format(dateString, 'EEEE');
    },
  },
};
</script>

<style lang="scss" scoped>
.Day {
  &--today {
    color: var(--accent);
  }

  &__icon {
    font-size: 7vmin;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  &__temp {
    font-family: var(--font_digits);
    font-size: 4.2vmin;
    line-height: 4.2vmin;
    font-weight: 700;
  }

  &__temps {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1vmin 0;

    .Day__temp {
      margin-right: 15px;

      &:last-child {
        margin: 0;
      }
    }

    .Day__temp--low {
      opacity: 0.5;
    }
  }

  &__name {
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    font-weight: 300;
  }
}
</style>
