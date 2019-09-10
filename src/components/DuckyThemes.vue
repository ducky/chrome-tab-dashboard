<template>
  <div class="Themes">
    <font-awesome-icon
      class="Themes__toggle"
      icon="palette"
      @click="onToggle()"
    />
    <transition name="fade-top-right" appear>
      <div v-if="toggled" v-click-outside="onClose" class="Themes__panel">
        <div class="Themes__section">
          <div class="Themes__section-title">Basic Themes</div>
          <div class="Themes__section-content">
            <div
              v-for="theme in themes.basic"
              :key="theme.name"
              :class="{ 'Themes__theme--selected': theme.name === selected }"
              class="Themes__theme"
              @click="onThemeChange(theme)"
            >
              <div
                :style="{ background: theme.background }"
                class="Themes__theme-swatch"
              />
              <div class="Themes__theme-name">{{ theme.name }}</div>
            </div>
          </div>
        </div>

        <div class="Themes__section">
          <div class="Themes__section-title">Fancy Themes</div>
          <div class="Themes__section-content">
            <div
              v-for="theme in themes.fancy"
              :key="theme.name"
              :class="{ 'Themes__theme--selected': theme.name === selected }"
              class="Themes__theme"
              @click="onThemeChange(theme)"
            >
              <div
                :style="{ background: theme.background }"
                class="Themes__theme-swatch"
              />
              <div class="Themes__theme-name">{{ theme.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import themes from '../constants/themes';

export default {
  name: 'DuckyThemes',
  props: {
    selected: {
      type: String,
      default: '',
    },
    onThemeChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      themes,
      toggled: false,
    };
  },
  methods: {
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
.Themes {
  position: relative;

  &__toggle {
    font-size: 28px;
    opacity: 0.8;
    cursor: pointer;
    transition: transform 250ms;

    &:hover {
      transform: scale(0.9);
    }
  }

  &__panel {
    position: absolute;
    color: #fff;
    font-weight: 300;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px 0px;
    top: 43px;
    right: 0;
    min-width: 175px;
    padding: 15px;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: top right;
    z-index: 2;
  }

  &__section {
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
  }

  &__theme {
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
    transition: opacity 300ms, padding 250ms;

    &-swatch {
      flex: 0 0 auto;
      width: 25px;
      height: 25px;
      border-radius: 99px;
      margin-right: 10px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
    }

    &-name {
      font-size: 14px;
      white-space: nowrap;
    }

    &--selected {
      .Themes__theme-name {
        font-weight: 500;
      }
    }

    &:hover {
      padding-left: 12px;
    }

    &:last-child {
      margin: 0;
    }
  }
}
</style>
