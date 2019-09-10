<template>
  <div
    class="App"
    :style="{
      '--accent': theme.accent,
      '--background': theme.background,
      '--text': theme.text,
    }"
  >
    <div class="App__actions App__actions-left">
      <DuckySettings :settings="settings" :on-setting-change="updateSetting" />
    </div>
    <div class="App__actions App__actions-right">
      <DuckyThemes :selected="theme.name" :on-theme-change="updateTheme" />
    </div>
    <div class="App__clock">
      <DuckyClock :settings="settings" />
    </div>
    <div class="App__breakdown">
      <DuckyForecast :forecast="forecast" :loading="!init && loading" />
    </div>

    <div class="App__footer">
      <a
        class="App__footer-link"
        href="https://christieman.com/"
        target="_blank"
      >
        <DuckyIcon class="App__footer-icon" title="Made with <3 by Ducky" />
      </a>
    </div>
  </div>
</template>

<script>
import { differenceInMinutes, parseISO } from 'date-fns';
import themes from './constants/themes';
import apiFetch from './utils/apiFetch';
import formatWeather from './utils/formatWeather';
import * as storage from './utils/storage';
import DuckyClock from './components/DuckyClock.vue';
import DuckyIcon from './components/DuckyIcon.vue';
import DuckyForecast from './components/DuckyForecast.vue';
import DuckySettings from './components/DuckySettings.vue';
import DuckyThemes from './components/DuckyThemes.vue';

const DEFAULT_SETTINGS = {
  formatDate: 'EEEE, LLLL d',
  formatTime: '12',
  formatSeconds: 'ss',
  formatSuffix: ' ',
  theme: themes.basic[0].name,
};
const KEY_SETTINGS = 'DASHBOARD_SETTINGS';
const KEY_WEATHER = 'WEATHER_CACHE';
const WEATHER_URL = process.env.VUE_APP_WEATHER_API;
const LOCATION_MAX = 1000 * 60 * 60 * 1;

const formatTitle = weather => `${weather.temperature}° | ${weather.summary}`;

export default {
  name: 'App',
  components: {
    DuckyClock,
    DuckyForecast,
    DuckyIcon,
    DuckySettings,
    DuckyThemes,
  },
  data() {
    return {
      init: false,
      forecast: [],
      lastCheck: null,
      loading: true,
      settings: DEFAULT_SETTINGS,
      theme: themes.basic[0].name,
    };
  },
  async beforeMount() {
    this.watcher = navigator.geolocation.watchPosition(
      this.onUpdateForecast,
      null,
      { maximumAge: LOCATION_MAX }
    );
    await this.loadSettings();
    await this.saveSettings();
  },
  beforeDestroy() {
    navigator.geolocation.clearWatch(this.watcher);
  },
  methods: {
    async fetchWeather(position) {
      this.loading = true;
      this.forecast = [];

      const cache = await storage.get(KEY_WEATHER, { ts: new Date() });
      if (differenceInMinutes(new Date(), parseISO(cache.ts)) < 30) {
        // eslint-disable-next-line
        console.log('Loading Weather from Cache');
        return cache.data;
      } else {
        // eslint-disable-next-line
        console.log('Loading Weather from Dark Sky');
        const response = await apiFetch(WEATHER_URL, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        const { today, upcoming } = formatWeather(response);
        const forecast = [today, ...upcoming];
        await storage.set(KEY_WEATHER, {
          data: forecast,
          ts: new Date(),
        });
        return forecast;
      }
    },
    async onUpdateForecast(position) {
      if (
        this.lastCheck &&
        differenceInMinutes(new Date(), this.lastCheck) < 10
      ) {
        return;
      }

      const forecast = await this.fetchWeather(position);
      if (forecast[0]) document.title = formatTitle(forecast[0]);

      this.forecast = forecast;
      this.loading = false;
      this.init = true;
      this.lastCheck = new Date();
    },
    async updateTheme(theme) {
      this.theme = theme;
      this.updateSetting('theme', theme.name);
    },

    // Settings
    async loadSettings() {
      this.settings = await storage.get(KEY_SETTINGS, DEFAULT_SETTINGS);
      this.theme =
        themes.master.find(t => t.name === this.settings.theme) ||
        themes.basic[0];
    },
    async saveSettings() {
      await storage.set(KEY_SETTINGS, this.settings);
    },
    async updateSetting(key, value) {
      this.settings = { ...this.settings, [key]: value };
      await this.saveSettings();
    },
  },
};
</script>

<style lang="scss">
:root {
  --animation_ease: cubic-bezier(0.25, 0.8, 0.5, 1);
  --font_digits: 'Work Sans', sans-serif;
  --font_type: 'Work Sans', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background: #141517;
  user-select: none;
}

.App {
  font-family: var(--font_type);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background: var(--background);
  color: var(--text);
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);

  &__actions {
    position: absolute;
    top: 15px;
    display: flex;

    &-left {
      left: 15px;
    }

    &-right {
      right: 15px;
    }
  }

  &__breakdown {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22.5vmin;
    width: 100%;
  }

  &__footer {
    position: absolute;
    bottom: 15px;
    font-size: 12px;
    display: flex;
    align-items: center;

    &-link {
      color: var(--accent);
    }

    &-icon {
      margin: 0 5px;
      transition: transform 250ms;

      &:hover {
        transform: scale(0.9);
      }
    }
  }
}

.fade {
  &-leave-active {
    transition: all 300ms var(--animation_ease);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: all 600ms var(--animation_ease);
    transition-delay: calc(0.1s * var(--i));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
  }
}

.fade-top-left {
  &-leave-active {
    transition: all 200ms var(--animation_ease);
    transform-origin: top left;
  }

  &-enter-active {
    transition: all 200ms var(--animation_ease);
    transform-origin: top left;
  }

  &-enter,
  &-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-top-right {
  &-leave-active {
    transition: all 200ms var(--animation_ease);
    transform-origin: top right;
  }

  &-enter-active {
    transition: all 200ms var(--animation_ease);
    transform-origin: top right;
  }

  &-enter,
  &-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    transform: scale(1);
    opacity: 1;
  }
}

.slide-fade {
  &-leave-active {
    transition: all 400ms var(--animation_ease);
    transition-delay: calc(100ms * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: all 400ms var(--animation_ease);
    transition-delay: calc(100ms * var(--i));
  }

  &-enter,
  &-leave-to {
    transform: translateY(25%);
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-fade-reverse {
  &-leave-active {
    transition: all 400ms var(--animation_ease);
  }

  &-enter-active {
    transition: all 400ms var(--animation_ease);
  }

  &-enter,
  &-leave-to {
    transform: translateY(-25%);
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    transform: translateY(0);
    opacity: 1;
  }
}

.zoom-fade {
  &-leave-active {
    transition: all 120ms var(--animation_ease);
  }

  &-enter-active {
    transition: all 120ms var(--animation_ease);
  }

  &-enter,
  &-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
