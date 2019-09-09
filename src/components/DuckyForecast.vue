<template>
  <div class="Forecast">
    <transition name="fade" mode="out-in" appear>
      <DuckyLoader v-if="loading" />
    </transition>
    <transition-group
      v-if="!loading"
      appear
      name="slide-fade"
      mode="out-in"
      tag="div"
      class="Forecast__grid"
      :style="{ '--total': forecast.length }"
    >
      <DuckyWeather
        v-for="(day, i) in forecast"
        :key="day.date"
        :weather="day"
        :style="{ '--i': i }"
      />
    </transition-group>
  </div>
</template>

<script>
import DuckyLoader from './DuckyLoader.vue';
import DuckyWeather from './DuckyWeather.vue';

export default {
  name: 'DuckyForecast',
  components: {
    DuckyLoader,
    DuckyWeather,
  },
  props: {
    forecast: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.Forecast {
  &__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 2vmin 4.5vmin;
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>
