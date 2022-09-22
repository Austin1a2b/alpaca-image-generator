<template>
  <div>
    <h1 class="title">Alpaca Avatar Generator</h1>
    <main>
      <div class="left-content">
        <ImageOverlay :output="output" />
        <div class="button-wrapper">
          <button class="random-button" @click="getRandomImg()">Random</button>
          <button class="download" @click="downloadImage">Download</button>
        </div>
      </div>
      <div class="right-content">
        <div class="part-wrapper">
          <h2>Choose Part</h2>
          <div class="option-wrapper">
            <button
              v-for="part in partList"
              :key="part"
              class="option-button"
              @click.stop.prevent="choosePart(part)"
            >
              {{ part }}
            </button>
          </div>
        </div>
        <div class="style-wrapper">
          <h2>Style</h2>
          <div class="option-wrapper">
            <button
              v-for="style in styleList"
              :key="style"
              class="option-button"
              @click.stop.prevent="chooseStyle(style)"
            >
              {{ style }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import OptionList from "../assets/OptionList.js";
import ImageOverlay from "../components/ImageOverlay.vue";

export default {
  name: "HomeView",
  components: {
    ImageOverlay: ImageOverlay,
  },
  data() {
    return {
      partList: [],
      styleList: [],
      part: "backgrounds",
      style: "",
      output: [],
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
          console.error("downloadImage function have something wrong!", error);
        });
    },
    getPartList() {
      for (let i = 0; i < OptionList.length; i++) {
        this.partList.push(OptionList[i].label);
      }
    },
    getStyleList(part) {
      let findlist = OptionList.find((list) => list.label === part);
      this.styleList = findlist.items;
    },
    choosePart(part) {
      this.getStyleList(part);
      this.part = part;
    },
    chooseStyle(newStyle) {
      this.style = newStyle;
      this.output = this.output.map((list) => {
        if (list.part === this.part) {
          list.style = newStyle;
          return list;
        } else {
          return list;
        }
      });
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    initialImg() {
      for (let i = 0; i < OptionList.length; i++) {
        let random = this.getRandomInt(OptionList[i].items.length);
        this.output.push({
          part: OptionList[i].label,
          style: OptionList[i].items[random],
        });
      }
    },
    getRandomImg() {
      for (let i = 0; i < this.output.length; i++) {
        let random = this.getRandomInt(OptionList[i].items.length);
        this.output[i].style = OptionList[i].items[random];
      }
    },
  },
  created() {
    this.getPartList();
    this.getStyleList(this.part);
    this.initialImg();
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

.option-button {
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin: 0 50px;
}
</style>
