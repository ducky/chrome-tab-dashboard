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

    <div class="App__credits">
      <a href="https://darksky.net/" target="_blank">
        <svg
          class="App__credits-logo"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 1477.49 509"
        >
          <g>
            <path
              d="M0,310c1.49-8.16,2.73-16.38,4.52-24.47,7.86-35.39,24.08-67.07,45.15-96.1,16.79-23.16,35.31-45.07,53.07-67.52a14.17,14.17,0,0,1,2.14-1.25c-17.07,44.6-22.79,89.84-20.91,137l26.85-11c-4.19,45.1.53,88.57,13.33,131.81l20-11.27c.86,5.76,1.7,10.91,2.38,16.07,5.82,44.17,23.08,83.85,47.24,120.85A37.27,37.27,0,0,1,196,509H164a36.66,36.66,0,0,0-4.32-1C85.28,499.61,22.18,443.78,5,370.88,3,362.34,1.65,353.63,0,345Z"
            />
            <path
              d="M180,0l51.85,74.76c-41.41,2.68-79.14,12.76-115,30.7.67-1,1.28-2,2-2.95,20.8-26.27,40.89-53,54.34-84C175.77,12.6,177.1,6.18,179,0Z"
            />
            <path
              d="M211.47,176.66,172,188.39c14-40.09,36.91-73.33,65.52-104.67A22.58,22.58,0,0,0,239,86.59c26.09,37.84,52.58,75.44,78.2,113.6,18.75,27.92,34.18,57.58,41.32,90.9,21.42,100-48.68,201.1-149.86,216-2.94.43-5.9.75-9.3,1.17-18.28-67.53-16.77-134.79-.12-203.08l-26.82,12.41C170.62,266.46,187,221.11,211.47,176.66Z"
            />
            <path
              d="M461.53,443V266.34c1.26-.12,2.36-.31,3.47-.31,21.82,0,43.66-.56,65.45.2,23.35.82,45.43,6.52,63.76,22.19a75.21,75.21,0,0,1,25.94,45.37c3.22,18.34,3,36.54-4,54-11.13,27.6-32.44,43.76-60.61,50.86-10.84,2.73-22.29,3.78-33.5,4.14C502.08,443.44,482.08,443,461.53,443Zm31.68-27.12c14.5-.63,28.51-.55,42.36-2,17.12-1.82,32-8.77,42.4-23.27,9.26-12.89,10.72-27.62,10-42.83-1.16-24.77-15.35-43.89-38.17-50.54-18.45-5.37-37.46-4.27-56.6-4.12Z"
            />
            <path
              d="M1064.7,422.69l23-21.51c7.73,9.81,17.5,16,29.3,18.25,13.63,2.58,26.82,1.61,36.44-10.17,8.28-10.13,6.44-24.76-4.29-32.08-5.68-3.87-12.3-6.5-18.74-9.06-9.1-3.61-18.64-6.16-27.62-10-17.57-7.53-28.41-20.45-29.72-40.16-1.44-21.75,7.8-37.69,26.87-47.8,26.91-14.28,65.38-10.45,87,8.35.62.54,1.21,1.13,2.26,2.1L1168.86,303a44.73,44.73,0,0,0-26.11-14.51,38.38,38.38,0,0,0-26.93,4.75c-14.21,8.54-14.46,28.28-.21,36.68,6.07,3.57,13.1,5.54,19.73,8.15,10.18,4,20.88,7,30.51,12.11,33.32,17.53,28.73,57.34,12.52,76.41-10.41,12.23-24.19,18-39.57,20.08-21.25,2.81-41.5-.74-59.8-12.41C1074,431.07,1069.74,426.81,1064.7,422.69Z"
            />
            <path
              d="M879.69,254.17h29.92V372.38l1.52.93a32,32,0,0,1,2.41-3.51c13-14.52,26.09-28.95,39-43.52a8.49,8.49,0,0,1,7.19-3.34c11.1.21,22.2.08,34.52.08L942.4,377.26,997.56,443c-10.46,0-19.88-.53-29.22.17-7.76.58-12.64-1.84-17.28-8.29-11.44-16-23.83-31.24-35.84-46.78-1.48-1.91-3-3.81-5.38-6.87v61.42H879.69Z"
            />
            <path
              d="M1251.83,381.42v61.22h-30.15V254.33h29.94v119.6c4.9-5.37,8.78-9.57,12.61-13.82,10.25-11.39,20.41-22.86,30.83-34.1a9.72,9.72,0,0,1,6.24-2.86c11.25-.28,22.52-.13,35-.13l-51.88,54.25L1339.56,443c-11.14,0-21.22-.38-31.25.14-6.25.33-10.19-1.53-14-6.72-12.42-16.9-25.49-33.33-38.32-49.93C1254.92,385.1,1253.77,383.78,1251.83,381.42Z"
            />
            <path
              d="M1351.84,475.91c5.49.3,10.29.95,15,.72a14.55,14.55,0,0,0,13-8.86c3.5-7.52,6.77-15.17,9.71-22.93.63-1.67-.23-4.21-1-6.07q-23.38-54.82-46.94-109.56c-.78-1.81-1.5-3.64-2.55-6.17,10.93,0,21.33-.11,31.71.17,1.08,0,2.51,2.28,3.08,3.76q14.68,37.89,29.17,75.84c.8,2.09,1.69,4.15,3.08,7.55,4-11.58,7.5-21.86,11-32.14,5.86-17.14,11.77-34.25,17.47-51.44,1-2.87,2.19-3.91,5.24-3.84,9,.21,17.89.08,27.51.08-4.92,12.64-9.59,24.69-14.3,36.72-15,38.22-29.82,76.47-45,114.62-4.54,11.45-11.51,21.07-23.71,25.55-10.62,3.9-21.52,3.82-32.47,1.82a3.42,3.42,0,0,1-2.09-2.56C1350.33,491.38,1351.13,483.62,1351.84,475.91Z"
            />
            <path
              d="M752.86,442.84H725.39V427.66c-11.34,14.81-25.72,19.31-42.16,18.16-12.79-.89-24.62-4.61-33-15.08-13.83-17.2-9.41-40.26,9.79-51.24,12.25-7,25.89-9.22,39.69-10.4,8.26-.71,16.56-1,24.82-1.42,1.64-12.19-5.58-21.18-18.74-23.73-13.86-2.69-25.93,1.3-36.92,9.57l-4.19,3.2-15.42-18.15c11.59-10.83,25.26-16.41,40.43-18.4,12.69-1.66,25.31-1.08,37.28,4.05,15.7,6.73,24.93,19.25,25.61,35.81C753.68,387.42,752.86,414.89,752.86,442.84Zm-28.31-55.25c-10.87,1.06-21.46,1.69-31.9,3.3-4.59.7-9,3.09-13.26,5.31-5.72,3-7.27,8.34-6.45,14.45.75,5.59,4.45,8.68,9.38,10.6C705.53,430.3,727.19,413.78,724.55,387.59Z"
            />
            <path
              d="M774.51,165.54c6-20.22,11.84-39.43,17.37-58.73,1.08-3.75,2.4-5.57,6.69-5.23,5.76.45,11.59.11,18,.11-.66,2.25-1.09,4-1.66,5.6-9.09,26.39-18.28,52.74-27.22,79.18-1.25,3.69-3,4.83-6.76,4.6-5.8-.34-11.64-.09-17.81-.09l-19.87-61.09-1-.09c-6.56,20.33-13.11,40.65-19.74,61.18-6.9,0-13.55.1-20.2-.1a4.24,4.24,0,0,1-3.26-2q-15-43-29.83-86.13c0-.14.06-.32.2-1,7,0,14.15-.18,21.27.19,1.2.06,2.85,2.35,3.32,3.9,5.4,18,10.6,36,15.87,54,.44,1.53.94,3,1.82,5.85,3.33-11,6.3-20.83,9.26-30.65s6-19.37,8.66-29.13c.85-3.09,2.06-4.44,5.4-4.28,5.32.26,10.67.23,16,0,3.09-.13,4.26,1.08,5.12,4,5.4,18.32,11,36.57,16.61,54.84C773.21,161.86,773.72,163.23,774.51,165.54Z"
            />
            <path
              d="M1181,113V50.53h21.82V190.62h-20.63V177.37c-5.61,7.7-11.71,12.23-19.36,14.53-24.1,7.27-47.44-6.85-54.19-32.8-5.7-21.92,3.07-44.35,21.46-54.86a40.11,40.11,0,0,1,48.25,6.41C1178.86,111.2,1179.46,111.69,1181,113Zm.63,33.18a89.56,89.56,0,0,0-1.64-9.28c-3.22-11.34-13.28-19.22-24.4-19.35-11.47-.14-20.4,6.45-24.07,18a33.59,33.59,0,0,0,1.68,25.23,24.26,24.26,0,0,0,30.61,12.49C1174.41,169.44,1181.36,158.74,1181.59,146.22Z"
            />
            <path
              d="M1278.17,50.44h21.69v63c6.52-7.19,13.16-11.64,21.34-13.36,20.46-4.3,39,5,48.06,24.19,9.22,19.46,4.59,44.53-10.88,58.81-16.28,15-45.25,14.51-59-5v12.49h-21.17ZM1351,146.3c0-1,0-2,0-3-.68-11.93-7.9-21.73-18.27-24.85-9.81-2.94-20.47.71-27,9.28-8.35,10.87-8.08,27.43.61,38s24.16,12.29,34.44,4C1348.1,163.7,1350.72,155.46,1351,146.3Z"
            />
            <path
              d="M456.7,58.22c21,1,41.49,1,61.77,3.14C532.73,62.84,544,71,547.62,85.69c3.89,15.61,1.84,30.27-12,40.9-8.19,6.26-17.88,8.78-28,9.31-8.95.47-17.95.1-27.38.1v54.58H456.7ZM480.27,78.6v38.89c10.39-.84,20.53-.95,30.4-2.63C521,113.1,525.6,106.25,525.16,96c-.38-8.58-6.25-14.85-16.16-15.91C499.63,79.13,490.15,79.09,480.27,78.6Z"
            />
            <path
              d="M848.81,153.61c1.08,9.88,6.25,16,14.48,19.24,13.21,5.14,24.77,2.22,34.39-9l14.75,11.72a37.2,37.2,0,0,1-17.68,14.21c-16.28,6.25-32.31,5.4-47.57-3.21-14.79-8.34-23.3-27.31-20.88-45.45,4.09-30.63,30.88-48.34,60.65-40.08,15.55,4.31,27.11,18.54,29,35.75.41,3.8.49,7.64.91,11.44.44,4-1,5.5-5.23,5.45-19-.21-38-.09-57-.09Zm45.24-16.68c-.25-7.69-2.49-14.09-9.21-17.87-8.77-4.94-17.65-4.13-26,1.13-6,3.77-9.56,9.23-9.87,16.74Z"
            />
            <path
              d="M1023.39,153.61c-.34,8.14,5,15.4,13.79,19.31,11.56,5.14,23.12,2.24,34.59-9l15,11.88c-3,3-5.49,6-8.51,8.38-19.33,15.29-52,11.86-67.87-7-12.19-14.48-13.74-36.81-3.84-55.3,8.24-15.38,27-24.68,45.54-22.61,21.55,2.4,35.87,17.07,37.92,38.9.34,3.64.47,7.3.82,10.94s-1.21,4.54-4.64,4.51c-19.14-.13-38.29-.06-57.44-.06ZM1023.1,137h44.47c1.16-11-6.59-19.93-18-20.92C1035.73,114.84,1023.81,124,1023.1,137Z"
            />
            <path
              d="M1477.49,101.69c-7.26,18.68-14.1,36.32-21,53.94-7.17,18.43-14.16,36.93-21.61,55.25-8.8,21.64-21,28-45,23.43.52-6.22,1-12.54,1.57-18.86,17.66,1.21,18.78.19,25.7-16.23,2.47-5.86,2.28-10.63-.27-16.38-11.19-25.22-21.91-50.65-32.79-76-.64-1.49-1.13-3-1.9-5.12,7.81,0,15.13-.19,22.42.18,1.29.06,3,2.24,3.61,3.79,7.3,18.56,14.42,37.19,21.59,55.79.51,1.33,1.08,2.63,2,4.9,1-2.54,1.62-4.17,2.19-5.84,6.17-18.08,12.41-36.14,18.4-54.28,1.12-3.38,2.56-4.85,6.27-4.65C1464.66,101.93,1470.64,101.69,1477.49,101.69Z"
            />
            <path
              d="M660.25,145.79c.13,26.94-20.71,47.73-48.12,48-27.16.26-48.84-20.59-49-47.16-.2-27.11,20.42-47.46,48.22-47.56C639.46,99,660.11,118.66,660.25,145.79Zm-22.92.3c-.09-1.66-.1-3.33-.28-5-1.15-10.89-8.33-20.32-18.21-22.64s-19.48-.83-26.17,7.76c-7.4,9.51-8.56,20.36-4.52,31.62,4.54,12.68,15.49,18.78,28.78,16.4C629.06,172.08,637.28,160.73,637.33,146.09Z"
            />
            <path
              d="M818,442.73H788.26V323.4h28.53v17.78c10.13-15.47,23.28-23.94,42.57-21.09v27.14c-5.73,0-11.44-.76-16.88.14-14.65,2.43-24.38,15.88-24.47,33.14-.11,18.82,0,37.63,0,56.45Z"
            />
            <path
              d="M938.57,101.94h21.1v13.72c3.44-3.81,6.08-7.07,9.05-10,5.46-5.37,12.33-7,19.73-6.43,1.19.09,3.12,2,3.19,3.12.33,5.62.15,11.28.15,17.34-3.53,0-6.76-.08-10,0-13.13.4-20.75,11.84-20.87,23-.15,15-.05,30-.06,45,0,.82-.09,1.64-.16,2.86H938.57Z"
            />
          </g>
        </svg>
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
        transform: scale(1.25);
      }
    }
  }

  &__credits {
    position: absolute;
    bottom: 15px;
    right: 15px;

    a {
      display: inline-flex;
    }

    &-logo {
      width: 90px;
      height: auto;
      opacity: 0.6;
      color: var(--text);
      transform-origin: right bottom;
      transition: opacity 200ms, transform 200ms;

      &:hover {
        opacity: 1;
        transform: scale(1.25);
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
