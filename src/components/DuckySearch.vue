<template>
  <div class="Search">
    <transition name="fade" mode="out-in" appear>
      <input
        v-model="query"
        type="text"
        placeholder="Search Google or type a URL"
        autofocus
        @keyup.enter="onSubmit"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DuckySearch',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    onSubmit() {
      window.location = `https://www.google.com/search?q=${this.query}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.Search {
  margin: 0 0 40px;

  input {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-shadow: none;
    color: var(--text);
    width: 75vmin;
    padding: 1vmin;
    font-size: 3vmin;
    font-weight: 500;
    outline: none;
    transition: box-shadow 300ms;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px 0px;
    }
  }
}
</style>
