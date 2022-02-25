<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :loading="loading"
      :title="title"
      :pic="pic"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer.js";
import { processSongs } from "@/service/song.js";
import MusicList from "@/components/music-list/music-list";

export default {
  name: "singer-detail",
  components: {
    MusicList,
  },
  props: {
    singer: null,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    pic() {
      return this.singer && this.singer.pic;
    },
    title() {
      return this.singer && this.singer.name;
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    this.songs = await processSongs(result.songs);
    this.loading = false;
  },
};
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
