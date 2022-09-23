<template>
  <div>
    <h1 class="title">Alpaca Avatar Generator</h1>
    <main>
      <div class="left-content">
        <ImageOverlay :output="output" />
        <div class="button-wrapper">
          <button class="random-button" @click="getRandomImg()">Random</button>
          <DownloadButton class="download-button" />
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
              :class="{ 'is-chosen': part === usePart }"
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
              :class="{ 'is-chosen': style === useStyle }"
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
import DownloadButton from "../components/DownloadButton.vue";

export default {
  name: "HomeView",
  components: {
    ImageOverlay: ImageOverlay,
    DownloadButton: DownloadButton,
  },
  data() {
    return {
      partList: [],
      styleList: [],
      usePart: "backgrounds",
      useStyle: "",
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
      this.usePart = part;
      this.getNowStyle(part);
    },
    chooseStyle(newStyle) {
      this.useStyle = newStyle;
      this.output = this.output.map((list) => {
        if (list.part === this.usePart) {
          list.style = newStyle;
          return list;
        } else {
          return list;
        }
      });
    },
    getNowStyle(usePart) {
      this.useStyle = this.output.find((list) => {
        return list.part === usePart;
      }).style;
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
    this.getStyleList(this.usePart);
    this.initialImg();
    this.getNowStyle(this.usePart);
  },
};
</script>

<style scoped>
@media screen and (max-width: 800px) {
  main {
    margin: 0 20px;
  }
  .left-content,
  .right-content {
    margin: 30px auto;
    width: 300px;
  }
  .option-wrapper {
    display: grid;
    grid-template-columns: 120px 120px 120px;
    grid-auto-flow: row;
    grid-auto-rows: 50px;
    margin: 0 0 0 -35px;
  }
}

@media screen and (min-width: 800px) and (max-width: 1000px) {
  main {
    display: flex;
    margin: 0 35px;
  }
  .right-content {
    margin: 0 0 0 50px;
  }
  .option-wrapper {
    display: grid;
    grid-template-columns: 150px 150px 150px;
    grid-auto-flow: row;
    grid-auto-rows: 50px;
  }
}

@media screen and (min-width: 1000px) {
  main {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    padding: 0 auto;
  }
  .right-content {
    margin: 0 0 0 100px;
  }
  .option-wrapper {
    display: grid;
    grid-template-columns: 150px 150px 150px;
    grid-auto-flow: row;
    grid-auto-rows: 50px;
  }
}
.title {
  text-align: center;
}

.option-button {
  width: 100px;
  height: 40px;
}

button {
  color: black;
  background-color: #b9e4e3;
  border: 2px solid #a4a4a4;
  border-radius: 7px;
  font-size: 14px;
  box-shadow: 1px 3px 1px #ddd;
}

.is-chosen {
  color: white;
  background-color: rgb(66, 93, 202);
}

.button-wrapper {
  display: flex;
  justify-content: space-around;
  width: 270px;
  margin: 20px auto;
}

.random-button,
.download-button {
  width: 80px;
  height: 30px;
}
</style>