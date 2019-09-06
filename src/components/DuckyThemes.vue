<template>
  <div class="Themes">
    <font-awesome-icon class="Themes__toggle" icon="sun" @click="onToggle()" />
    <transition name="fade-top-right" appear>
      <div v-if="toggled" v-click-outside="onClose" class="Themes__panel">
        <div
          v-for="theme in themes"
          :key="theme.name"
          :class="{ 'Themes__theme--selected': theme.name === selected }"
          class="Themes__theme"
          @click="onThemeChange(theme)"
        >
          <div
            :style="{
              background: `linear-gradient(
              to bottom right,
              ${theme.shade_one},
              ${theme.shade_two}
            `,
            }"
            class="Themes__theme-swatch"
          ></div>
          <div class="Themes__theme-name">{{ theme.name }}</div>
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
    font-size: 40px;
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
    background: rgba(0, 0, 0, 0.3);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px 0px;
    top: 55px;
    right: 0;
    min-width: 175px;
    padding: 5px;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: top right;
  }

  &__theme {
    display: flex;
    align-items: center;
    padding: 5px 8px;
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
