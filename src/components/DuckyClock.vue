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
  data() {
    return {
      date: format(new Date(), 'EEEE, LLLL d'),
      time: format(new Date(), 'HH mm ss'),
    };
  },
  beforeMount() {
    this.onTick();
    this.tickInterval = setInterval(this.onTick, 250);
  },
  beforeDestroy() {
    clearInterval(this.tickInterval);
  },
  methods: {
    onTick() {
      this.time = format(new Date(), 'HH mm ss');
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
    font-size: 22.5vmin;
    line-height: 0.8;
    font-weight: 100;
    margin: 0 0 1.5vmin;
  }

  &__digit {
    width: 12vmin;

    &--space {
      width: 5vmin;
    }
  }

  &__date {
    font-size: 3.4vmin;
    font-weight: 300;
    line-height: 1;
  }
}
</style>
