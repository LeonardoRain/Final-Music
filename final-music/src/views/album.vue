<template>
  <div class="album">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      backUrl="recommend"
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from "@/assets/js/create-detail-component.js";
import { getAlbum } from "@/service/recommend.js";
import { ALBUM_KEY } from "@/assets/js/constant.js";
export default createDetailComponent("album", ALBUM_KEY, getAlbum);
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: $color-background;
}
</style>
