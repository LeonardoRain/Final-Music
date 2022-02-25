<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImg">
      <div class="filter"></div>
    </div>
    <scroll class="list" v-loading="loading" :style="scrollStyle">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import SongList from "@/components/base/song-list/song-list";

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
  },
  data() {
    return {
      imageHeight: 0,
    };
  },
  computed: {
    bgImageStyle() {
      return {
        backgroundImage: `url(${this.pic})`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
  },
  methods: {
    goBack() {
      this.$router.push("/singer");
    },
  },
  mounted() {
    console.log("this.$refs.bgImg", this.$refs.bgImg);
    this.imageHeight = this.$refs.bgImg.clientHeight;
    console.log("this.imageHeight", this.imageHeight);
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
		margin-top: 8px;
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
		margin-top: 9px;
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
		padding-top: 75%;
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
			background: rgba(7, 17, 27, .4);
		}
	}
	.list {
		overflow: hidden;
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
