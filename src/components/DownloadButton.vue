<template>
  <button class="download" @click="downloadImage">Download</button>
</template>

<script>
import domtoimage from "dom-to-image";

export default {
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
  },
};
</script>