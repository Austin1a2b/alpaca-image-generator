<template>
  <span>
    <button
      class="option-button"
      @click.stop.prevent="$emit('choose-part', list)"
    >
      {{ list }}
    </button>
  </span>
</template>

<script>
export default {
  props: {
    list: {
      type: String,
    },
  },
};
</script>

<style scoped>
.option-button {
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin: 0 50px;
}
</style>