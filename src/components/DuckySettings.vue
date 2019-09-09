<template>
  <div class="Settings">
    <font-awesome-icon
      class="Settings__toggle"
      icon="clock"
      @click="onToggle()"
    />
    <transition name="fade-top-left" appear>
      <div v-if="toggled" v-click-outside="onClose" class="Settings__panel">
        <div class="Settings__setting">
          <div class="Settings__setting-title">Date Format</div>
          <div class="Settings__setting-content">
            <select
              v-model="settings.formatDate"
              name="formatDate"
              @change="onChange($event)"
            >
              <option value="LLLL d">{{ date('LLLL d') }}</option>
              <option value="LLLL d, yyyy">{{ date('LLLL d, yyyy') }}</option>
              <option value="EEEE, LLLL d">{{ date('EEEE, LLLL d') }}</option>
              <option value="EEEE 'the' do 'of' LLLL">
                {{ date(`EEEE 'the' do 'of' LLLL`) }}
              </option>
            </select>
          </div>
        </div>

        <div class="Settings__setting">
          <div class="Settings__setting-title">Time Format</div>
          <div class="Settings__setting-content">
            <select
              v-model="settings.formatTime"
              name="formatTime"
              @change="onChange($event)"
            >
              <option value="12">12 Hour</option>
              <option value="24">24 Hour</option>
            </select>
          </div>
        </div>

        <div class="Settings__setting">
          <div class="Settings__setting-title">Show Seconds</div>
          <div class="Settings__setting-content">
            <select
              v-model="settings.formatSeconds"
              name="formatSeconds"
              @change="onChange($event)"
            >
              <option value="ss">Yes</option>
              <option value=" ">No</option>
            </select>
          </div>
        </div>

        <div v-if="settings.formatTime === '12'" class="Settings__setting">
          <div class="Settings__setting-title">Show AM/PM</div>
          <div class="Settings__setting-content">
            <select
              v-model="settings.formatSuffix"
              name="formatSuffix"
              @change="onChange($event)"
            >
              <option value="a">Yes</option>
              <option value=" ">No</option>
            </select>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'DuckySettings',
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
    onSettingChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    date(f) {
      return format(new Date(), f);
    },
    onChange(e, t) {
      this.onSettingChange(e.target.name, e.target.value);
    },
    onClose() {
      this.toggled = false;
    },
    onToggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style lang="scss" scoped>
.Settings {
  position: relative;

  &__toggle {
    font-size: 28px;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 300ms;

    &:hover {
      opacity: 0.5;
    }
  }

  &__panel {
    position: absolute;
    color: #fff;
    font-weight: 300;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px 0px;
    top: 43px;
    left: 0;
    min-width: 225px;
    padding: 15px;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: top left;
    z-index: 2;
  }

  &__setting {
    text-align: left;
    margin: 0 0 15px;

    &:last-child {
      margin: 0;
    }

    &-title {
      font-size: 12px;
      font-weight: 700;
      margin: 0 0 8px;
    }

    select {
      -webkit-appearance: none;
      width: 100%;
      font-size: 14px;
      font-weight: 700;
      padding: 10px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      box-shadow: none;
      color: #fff;
      outline: none;
      transition: background 300ms, border-color 300ms, padding 300ms;

      option {
        background: #141517;
        color: #fff;
      }

      &:disabled {
        background: transparent;
        border-color: transparent;
        padding: 0;
      }
    }
  }
}
</style>
