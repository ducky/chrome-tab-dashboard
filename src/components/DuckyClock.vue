<template>
  <div class="Clock">
    <transition name="slide-fade-reverse" mode="out-in" appear>
      <div class="Clock__time">
        <transition
          v-for="(digit, i) in time.split('')"
          :key="i"
          name="zoom-fade"
          mode="out-in"
        >
          <div
            :key="`${digit}-${i}`"
            class="Clock__digit"
            :class="{ 'Clock__digit--space': digit === ' ' }"
          >
            {{ digit }}
          </div>
        </transition>
      </div>
    </transition>
    <transition name="slide-fade" mode="out-in" appear>
      <div class="Clock__date">{{ date }}</div>
    </transition>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'Clock',
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      date: format(new Date(), this.getDateFormat()),
      time: format(new Date(), this.getTimeFormat()),
    };
  },
  watch: {
    settings: function() {
      this.date = format(new Date(), this.getDateFormat());
      this.time = format(new Date(), this.getTimeFormat());
    },
  },
  beforeMount() {
    this.onTick();
    this.tickInterval = setInterval(this.onTick, 250);
  },
  beforeDestroy() {
    clearInterval(this.tickInterval);
  },
  methods: {
    getDateFormat() {
      return this.settings.formatDate;
    },
    getTimeFormat() {
      const format = [];
      if (this.settings.formatTime === '24') {
        format.push(`HH mm`);
        format.push(this.settings.formatSeconds);
      } else {
        format.push(`hh mm`);
        format.push(this.settings.formatSeconds);
        format.push(this.settings.formatSuffix);
      }
      return format.filter(s => s !== ' ').join(' ');
    },
    onTick() {
      this.time = format(new Date(), this.getTimeFormat());
    },
  },
};
</script>

<style lang="scss" scoped>
.Clock {
  margin: 0 0 5vmin;
  perspective: 1000;

  &__time {
    display: flex;
    font-family: var(--font_digits);
    font-size: 22.5vmin;
    font-weight: 100;
    line-height: 0.8;
    margin: 0 0 1.5vmin;
  }

  &__digit {
    width: 12vmin;

    &--space {
      width: 5vmin;
    }
  }

  &__date {
    font-family: var(--font_digits);
    font-size: 3.4vmin;
    font-weight: 300;
    line-height: 1;
  }
}
</style>
