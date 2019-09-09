<template>
  <div class="Settings">
    <font-awesome-icon
      class="Settings__toggle"
      icon="cog"
      @click="onToggle()"
    />
    <transition name="fade-top-left" appear>
      <div v-if="toggled" v-click-outside="onClose" class="Settings__panel">
        {{ settings }}
      </div>
    </transition>
  </div>
</template>

<script>
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
    left: 0;
    min-width: 175px;
    padding: 5px;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: top left;
    z-index: 2;
  }
}
</style>
