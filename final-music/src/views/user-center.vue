<template>
  <div class="user-center" v-no-result="noResult">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <div class="switches-wrapper">
      <switches
        :items="['我喜欢的', '最近播放']"
        v-model="currentIndex"
      ></switches>
    </div>
    <div class="play-btn" v-if="currentList?.length" @click="random">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll class="list-scroll" v-if="currentIndex === 0">
        <div class="list-inner">
          <song-list :songs="favoriteList" @select="selectSong"></song-list>
        </div>
      </scroll>
      <scroll class="list-scroll" v-if="currentIndex === 1">
        <div class="list-inner">
          <song-list :songs="playHistory" @select="selectSong"></song-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Switches from "@/components/base/switches/switches";
import Scroll from "@/components/wrap-scroll";
import SongList from "@/components/base/song-list/song-list";
import { mapState, mapActions } from "vuex";

export default {
  name: "user-center",
  components: { Switches, Scroll, SongList },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    noResult() {
      return this.currentIndex === 0
        ? !this.favoriteList?.length
        : !this.playHistory?.length;
    },
    currentList() {
      return this.currentIndex === 0 ? this.favoriteList : this.playHistory;
    },
    ...mapState(["favoriteList", "playHistory"]),
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectSong({ song }) {
      this.addSong(song);
    },
    random() {
      this.randomPlay(this.currentList);
    },
    ...mapActions(["addSong"]),
    ...mapActions(["randomPlay"]),
  },
};
</script>

<style lang="scss" scoped>
.user-center {
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 100;
	width: 100%;
	background: $color-background;
	.back {
		position: absolute;
		left: 6px;
		top: 6px;
		z-index: 50;
		.icon-back {
			display: block;
			padding: 10px;
			font-size: $font-size-large-x;
			color: $color-theme;
		}
	}
	.switches-wrapper {
		margin: 10px 0 30px 0;
	}
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
	.list-wrapper {
		position: absolute;
		top: 110px;
		bottom: 0;
		width: 100%;
		.list-scroll {
			overflow: hidden;
			height: 100%;
			.list-inner {
				padding: 20px 30px;
			}
		}
	}
}
</style>
