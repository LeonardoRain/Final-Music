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
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant.js";

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
    computedSinger() {
      let res = null;
      const singer = this.singer;
      if (singer) {
        res = singer;
      } else {
        const catchedSinger = storage.session.get(SINGER_KEY);
        if (catchedSinger && catchedSinger.mid === this.$route.params.id) {
          res = catchedSinger;
        }
      }
      return res;
    },
    pic() {
      const singer = this.computedSinger;
      return singer && singer.pic;
    },
    title() {
      const singer = this.computedSinger;
      return singer && singer.name;
    },
  },
  async created() {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push(path);
      return;
    }
    const result = await getSingerDetail(this.computedSinger);
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
