<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :loading="loading"
      :title="title"
      :pic="pic"
      backUrl="singer"
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from "@/assets/js/create-detail-component.js";
import { getSingerDetail } from "@/service/singer.js";
import { SINGER_KEY } from "@/assets/js/constant.js";

export default createDetailComponent(
  "singer-detail",
  SINGER_KEY,
  getSingerDetail
);
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: $color-background;
}
</style>
