<template>
  <div id="img-wrapper" class="img-size">
    <template v-for="(info, index) in output">
      <img
        :key="info.part"
        :class="info.part"
        class="img-size avatar"
        :src="getImgSrc(index)"
      />
    </template>
    <img class="img-size avatar nose" src="../assets/alpaca/nose.png" />
  </div>
</template> 

<script>
export default {
  props: {
    output: {
      type: Array,
    },
  },
  methods: {
    getImgSrc(index) {
      return require(`../assets/alpaca/${this.output[index].part}/${this.output[index].style}.png`);
    },
  },
};
</script>

<style scoped>
#img-wrapper {
  position: relative;
}

@media screen and (max-width: 900px) {
  .img-size {
    width: 300px;
    height: 300px;
  }
}

@media screen and (min-width: 900px) and (max-width: 1000px) {
  .img-size {
    width: 400px;
    height: 400px;
  }
}

@media screen and (min-width: 1000px) {
  .img-size {
    width: 450px;
    height: 450px;
  }
}

.avatar {
  position: absolute;
}

.background {
  z-index: 0;
}
.neck,
.ears {
  z-index: 1;
}
.nose {
  z-index: 2;
}

.mouth,
.hair {
  z-index: 3;
}

.eyes,
.accessories {
  z-index: 4;
}
</style>