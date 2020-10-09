<template>
  <div class="container" >
    <video id="videoElement" muted ></video>
  </div>
</template>
<script type="text/ecmascript-6">
require('../../utils/js/flv.min.js');
var flvPlayer;
  export default {
    name: 'flv',
    data () {
      return {
      }
    },
    mounted () {
      if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement');
          flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: 'http://127.0.0.1/flv/7182741-1.flv'
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
      }
    },
    methods: {
      flv_start() {
        flvPlayer.play();
      },
      flv_pause() {
        flvPlayer.pause();
      },
      flv_destroy() {
        flvPlayer.pause();
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
        flvPlayer = null;
      },
     

    },
  }
</script>

<style scoped>
.container{
  padding: 10px 5px;
}
#videoElement{
  width: 300px;
  height: 300px;
}
</style>
