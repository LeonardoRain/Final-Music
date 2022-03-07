<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            ref="cdImageRef"
            width="40"
            height="40"
            v-if="currentSong.pic"
            :src="currentSong.pic"
            :class="cdCls"
          />
        </div>
      </div>
      <div class="slider-wrapper" ref="sliderWrapperRef">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playlist" :key="song.id">
            <div class="info-wrapper">
              <h2 class="name">{{ song.name }}</h2>
              <div v-show="song.name" class="divider"></div>
              <p class="desc">{{ song.singer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 控制栏 -->
      <div class="control">
        <progress-circle :radius="32" :progress="progress">
          <i class="icon-mini" :class="miniPlayIcon" @click.stop="togglePlay">
          </i>
        </progress-circle>
      </div>
      <div class="control" @click.stop="showPlaylist">
        <i class="icon-playlist"></i>
      </div>
      <playlist ref="playlistRef"></playlist>
    </div>
  </transition>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import useCd from "./use-cd";
import useMiniSlider from "./use-mini-slider";
import ProgressCircle from "./progress-circle";
import Playlist from "./playlist";

export default {
  components: { ProgressCircle, Playlist },
  name: "mini-player",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    togglePlay: Function,
  },
  setup() {
    const playlistRef = ref(null);
    // --------------- store ---------------
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const playlist = computed(() => store.state.playlist);
    // --------------- hooks ---------------
    const { cdRef, cdImageRef, cdCls } = useCd();
    const { sliderWrapperRef } = useMiniSlider();
    // --------------- computed ---------------
    const miniPlayIcon = computed(() => {
      return playing.value ? "icon-pause-mini" : "icon-play-mini";
    });
    // --------------- methods ---------------
    function showNormalPlayer() {
      store.commit("setFullScreen", true);
    }
    function showPlaylist() {
      console.log("playlistRef.value", playlistRef.value.show);
      playlistRef.value.show();
    }

    return {
      playlistRef,
      // store
      fullScreen,
      currentSong,
      playlist,
      // hooks
      cdRef,
      cdImageRef,
      cdCls,
      sliderWrapperRef,
      // computed
      miniPlayIcon,
      // methods
      showNormalPlayer,
      showPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
	display: flex;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 180;
	align-items: center;
	width: 100%;
	height: 60px;
	background: $color-theme-op;
	.cd-wrapper {
		margin: 0 10px 20px 10px;
		width: 60px;
		height: 60px;
		.cd {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			img {
				padding: 10px;
				border-radius: 50%;
				background-image: url("../../assets/images/cd-outter.png");
				background-repeat: no-repeat;
				background-size: 100%;
				&.playing-cd {
					animation: rotate 10s linear infinite;
				}
				&.pause {
					animation-play-state: paused;
				}
			}
		}
	}

	.slider-wrapper {
		display: flex;
		overflow: hidden;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		line-height: 20px;
		.slider-group {
			overflow: hidden;
			position: relative;
			white-space: nowrap;
			.slider-page {
				display: inline-block;
				width: 100%;
				backface-visibility: hidden;
				transform: translate3d(0, 0, 0);
				.info-wrapper {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 80%;
					height: 60px;
					color: $color-text-w;
					.name {
						margin-bottom: 2px;
						height: 60px;
						line-height: 60px;
						font-size: $font-size-medium;

						@include no-wrap();
					}
					.divider {
						margin: 0 3px;
						width: 5px;
						height: 1px;
						background-color: $color-text-w;
					}
					.desc {
						flex: 1;
						height: 60px;
						line-height: 60px;
						font-size: $font-size-small;

						@include no-wrap();
					}
				}
			}
		}
	}
	.control {
		flex: 0 0 30px;
		padding: 0 10px;
		width: 30px;
		.icon-playlist {
			position: relative;
			top: -1px;
			font-size: 26px;
			color: $color-theme-d;
		}
		.icon-mini {
			position: absolute;
			left: 9px;
			top: 9px;
			font-size: 14px;
			color: $color-text-w;
		}
		.icon-play-mini {
			left: 10px;
		}
	}
	&.mini-enter-active,
	&.mini-leave-active {
		transition: all .3s cubic-bezier(.45, 0, .55, 1);
	}
	&.mini-enter-from,
	&.mini-leave-to {
		opacity: 0;
		transform: translate3d(0, 100%, 0);
	}
}
</style>
