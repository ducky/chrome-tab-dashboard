<template>
  <div class="Search">
    <transition name="fade" mode="out-in" appear>
      <input v-model="query" type="text" autofocus @keyup.enter="onSubmit" />
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
    width: 825px;
    padding: 10px;
    font-size: 30px;
    font-weight: 500;
    outline: none;
    transition: box-shadow 300ms;

    &:focus {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px 0px;
    }
  }
}
</style>
