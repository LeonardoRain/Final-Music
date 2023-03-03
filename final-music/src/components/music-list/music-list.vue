<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImg">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div class="play-btn" v-show="songs.length > 0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      v-loading="loading"
      v-no-result:[noRestultText]="noResult"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/wrap-scroll/index";
import SongList from "@/components/base/song-list/song-list";
import { mapActions } from "vuex";

// 顶部标题预留高度
const RESERVED_HEIGHT = 60;

export default {
  name: "music-list",
  components: {
    SongList,
    Scroll,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
    noRestultText: {
      type: String,
      default: "这里空空如也...",
    },
    backUrl: {
      type: String,
      default: "recommend",
    },
    rank: Boolean,
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "75%";
      let height = 0;
      let translateZ = 0;
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }
      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }
      return {
        zIndex,
        paddingTop,
        height,
        translateZ,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale}) translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    playBtnStyle() {
      let display = "";
      if (this.scrollY >= this.maxTranslateY) {
        display = "none";
      }
      return { display };
    },
    noResult() {
      return !this.loading && !this.songs.length;
    },
  },
  methods: {
    goBack() {
      this.$router.push(`/${this.backUrl}`);
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    // 选择歌曲
    selectItem({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    // 随机播放全部
    random() {
      this.randomPlay(this.songs);
    },
    ...mapActions(["selectPlay", "randomPlay"]),
  },
  mounted() {
    this.imageHeight = this.$refs.bgImg.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    left: 6px;
    top: 0;
    z-index: 20;
    margin-top: 10px;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    left: 10%;
    top: 0;
    z-index: 20;
    margin-top: 10px;
    width: 80%;
    line-height: 40px;
    text-align: center;
    font-size: $font-size-large;
    color: $color-theme;
    transform: translateZ(2px);

    @include no-wrap();
  }
  .bg-image {
    position: relative;
    width: 100%;
    background-size: cover;
    transform-origin: top;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        margin: 0 auto;
        padding: 7px 0;
        border: 1px solid $color-theme;
        border-radius: 100px;
        width: 135px;
        text-align: center;
        font-size: 0;
        color: $color-theme;
      }
      .icon-play {
        display: inline-block;
        margin-right: 6px;
        vertical-align: middle;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    z-index: 0;
    width: 100%;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
