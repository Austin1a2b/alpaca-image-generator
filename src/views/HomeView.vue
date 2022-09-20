<template>
  <div>
    <h1 class="title">Alpaca Avatar Generator</h1>
    <main>
      <div class="left-content">
        <div id="img-wrapper" class="img-size">
          <img
            class="accessories img-size"
            src="../assets/alpaca/accessories/headphone.png"
            alt="head"
          />
          <img
            class="background img-size"
            src="../assets/alpaca/backgrounds/darkblue70.png"
            alt=""
          />
        </div>
        <div class="button-wrapper">
          <button class="ramdom-button">Ramdom</button>
          <button class="download" @click="downloadImage">Download</button>
        </div>
      </div>
      <div class="right-content">
        <div class="part-wrapper">
          <h2>Choose Part</h2>
          <div class="option-wrapper">
            <PartsButton
              v-for="part in partList"
              :key="part"
              :list="part"
              @choose-part="choosePart"
            />
          </div>
        </div>
        <div class="style-wrapper">
          <h2>Style</h2>
          <div class="option-wrapper">
            <StylesButton
              v-for="style in styleList"
              :key="style"
              :list="style"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import PartsButton from "../components/PartsButton.vue";
import OptionList from "../assets/OptionList.js";
import StylesButton from "../components/StyleButton.vue";

export default {
  name: "HomeView",
  components: {
    PartsButton: PartsButton,
    StylesButton: StylesButton,
  },
  data() {
    return {
      partList: [],
      styleList: [],
      part: "",
      style: "",
    };
  },
  methods: {
    downloadImage() {
      domtoimage
        .toJpeg(document.getElementById("img-wrapper"), { quality: 1 })
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = "Alpaca.jpeg";
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
    getpartList() {
      for (let i = 0; i < OptionList.length; i++) {
        this.partList.push(OptionList[i].label);
      }
    },
    getstyleList(part) {
      let findlist = OptionList.find((list) => list.label === part);
      this.styleList = findlist.items;
    },
    choosePart(part) {
      console.log(part);
      this.getstyleList(part);
    },
  },
  created() {
    this.getpartList();
    this.getstyleList("backgrounds");
  },
};
</script>

<style scoped>
main {
  display: flex;
}

.title {
  text-align: center;
}

#img-wrapper {
  position: relative;
}
.img-size {
  /* 用高寬設定 輸出圖檔的尺寸 */
  width: 500px;
  height: 500px;
}

.background {
  position: absolute;
  z-index: -1;
}
.accessories {
  position: absolute;
  z-index: 2;
}
</style>
