<template>
  <div id="img-wrapper" class="img-size">
    <button @click="updateImgSrc">test ttttttt</button>
    <template v-for="info in informations">
      <img
        :key="info.part"
        :class="info.part"
        class="img-size avatar"
        :src="info.src"
      />
    </template>
    <img class="img-size avatar nose" src="../assets/alpaca/nose.png" />
    <div></div>
  </div>
</template> 

<script>
export default {
  props: {
    output: {
      type: Array,
    },
  },
  data() {
    return {
      informations: [],
    };
  },
  created() {
    this.informations = this.output;
    this.updateImgSrc();
  },
  methods: {
    updateImgSrc() {
      for (let i = 0; i < this.informations.length; i++) {
        this.informations[
          i
        ].src = require(`../assets/alpaca/${this.informations[i].part}/${this.informations[i].style}.png`);
      }
      console.log(this.informations[0].src);
    },
  },
  watch: {
    output: {
      deep: true,
      handler: function (newValue) {
        console.log("偵測變化");
        this.informations = newValue;
        // this.updateImgSrc();
      },
    },
  },
};
</script>

<style scoped>
#img-wrapper {
  position: relative;
}

.img-size {
  /* 用高寬設定 輸出圖檔的尺寸 */
  width: 500px;
  height: 500px;
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