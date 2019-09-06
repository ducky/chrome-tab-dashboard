<template>
  <div class="Clock">
    <transition name="slide-fade-reverse" mode="out-in" appear>
      <div class="Clock__time">
        <div
          v-for="(digit, i) in time.split('')"
          :key="i"
          class="Clock__digit"
          :class="{ 'Clock__digit--space': digit === ' ' }"
        >
          {{ digit }}
        </div>
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
  margin: 0 0 60px;

  &__time {
    display: flex;
    font-size: 225px;
    line-height: 0.8;
    font-weight: 100;
    margin: 0 0 15px;
  }

  &__digit {
    width: 120px;

    &--space {
      width: 50px;
    }
  }

  &__date {
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
  }
}
</style>
