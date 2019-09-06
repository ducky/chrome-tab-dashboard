<template>
  <div class="Loader">
    <font-awesome-icon class="Loader__icon" icon="fan" />
    <div class="Loader__stick"></div>
  </div>
</template>

<script>
export default {
  name: 'DuckyLoader',
};
</script>

<style lang="scss" scoped>
.Loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  &__icon {
    position: relative;
    font-size: 80px;
    line-height: 1;
    animation: animationFrames ease-in-out 2.5s;
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    color: var(--accent);
    z-index: 1;
  }

  &__stick {
    width: 4px;
    height: 55px;
    margin-top: -30px;
    background: #fff;
  }
}

@keyframes animationFrames {
  0% {
    transform: rotate(0deg);
  }
  35% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(600deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
</style>
