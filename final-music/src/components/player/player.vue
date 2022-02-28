<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goback">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "player",
  setup() {
    const audioRef = ref(null);
    // 当前歌曲是否准备好播放
    const songReady = ref(false);
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const currentIndex = computed(() => store.state.currentIndex);
    const playlist = computed(() => store.state.playlist);
    // 播放 / 暂停 按钮，动态样式
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    // 按钮禁用样式
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });

    // 监听当前歌曲的变化，控制歌曲播放
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
    });

    // 监听 playing 的状态，控制播放 / 暂停
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioEl = audioRef.value;
      newPlaying ? audioEl.play() : audioEl.pause();
    });

    // 收起播放器全屏
    function goback() {
      store.commit("setFullScreen", false);
    }

    // 播放 or 暂停
    function togglePlay() {
      if (!songReady.value) {
        return;
      }
      store.commit("setPlayingState", !playing.value);
    }

    // 监听播放器非用户触发的 pause 事件，修改播放状态
    function pause() {
      store.commit("setPlayingState", false);
    }

    // 点击上一首歌曲
    function prev() {
      const list = playlist.value;
      if (!songReady.value || !list.length) {
        // 如果当前播放列表为空则不播放
        return;
      }
      if (list.length === 1) {
        // 如果当前播放列表只有一首歌曲，则循环播放
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }

    // 点击下一首歌曲
    function next() {
      const list = playlist.value;
      if (!songReady.value || !list.length) {
        // 如果当前播放列表为空则不播放
        return;
      }
      if (list.length === 1) {
        // 如果当前播放列表只有一首歌曲，则循环播放
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index === list.length) {
          index = 0;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }

    // 循环播放当前歌曲
    function loop() {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
    }

    // canplay 回调函数
    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    }

    // 如果歌曲有问题，手动将 songReady 置为 true，以便播放其他歌曲
    function error() {
      songReady.value = true;
    }

    return {
      audioRef,
      fullScreen,
      currentSong,
      playIcon,
      disableCls,
      goback,
      togglePlay,
      pause,
      prev,
      next,
      loop,
      ready,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
	.normal-player {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 150;
		background: $color-background-b;
		.background {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			filter: blur(20px);
			opacity: .6;

			img {
				width: 100%;
				height: 100%;
			}
		}
		.top {
			position: relative;
			margin-top: 10px;
			margin-bottom: 25px;
			.back {
				position: absolute;
				left: 6px;
				top: 0;
				z-index: 50;
			}
			.icon-back {
				display: block;
				padding: 9px;
				font-size: $font-size-large-x;
				color: $color-theme;
				transform: rotate(-90deg);
			}
			.title {
				margin: 0 auto;
				width: 70%;
				line-height: 40px;
				text-align: center;
				font-size: $font-size-large;
				color: $color-theme;

				@include no-wrap();
			}
			.subtitle {
				line-height: 20px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-theme;
			}
		}
		.middle {
			position: fixed;
			top: 80px;
			bottom: 170px;
			width: 100%;
			font-size: 0;
			white-space: nowrap;
			.middle-l {
				display: inline-block;
				position: relative;
				padding-top: 80%;
				width: 100%;
				height: 0;
				vertical-align: top;
				.cd-wrapper {
					position: absolute;
					left: 10%;
					top: 0;
					box-sizing: border-box;
					width: 80%;
					height: 100%;
					.cd {
						border-radius: 50%;
						width: 100%;
						height: 100%;
						img {
							position: absolute;
							left: 0;
							top: 0;
							box-sizing: border-box;
							border: 10px solid rgba(255, 255, 255, .1);
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
						.playing {
							animation: rotate 20s linear infinite;
						}
					}
				}
				.playing-lyric-wrapper {
					overflow: hidden;
					margin: 30px auto 0 auto;
					width: 80%;
					text-align: center;
					.playing-lyric {
						height: 20px;
						line-height: 20px;
						font-size: $font-size-medium;
						color: $color-text-l;
					}
				}
			}
			.middle-r {
				display: inline-block;
				overflow: hidden;
				width: 100%;
				height: 100%;
				vertical-align: top;
				.lyric-wrapper {
					overflow: hidden;
					margin: 0 auto;
					width: 80%;
					text-align: center;
					.text {
						line-height: 32px;
						font-size: $font-size-medium;
						color: $color-text-l;
						&.current {
							color: $color-text;
						}
					}
					.pure-music {
						padding-top: 50%;
						line-height: 32px;
						font-size: $font-size-medium;
						color: $color-text-l;
					}
				}
			}
		}
		.bottom {
			position: absolute;
			bottom: 50px;
			width: 100%;
			.dot-wrapper {
				text-align: center;
				font-size: 0;
				.dot {
					display: inline-block;
					margin: 0 4px;
					border-radius: 50%;
					width: 8px;
					height: 8px;
					background: $color-text-l;
					vertical-align: middle;
					&.active {
						border-radius: 5px;
						width: 20px;
						background: $color-text-ll;
					}
				}
			}
			.progress-wrapper {
				display: flex;
				align-items: center;
				margin: 0 auto;
				padding: 10px 0;
				width: 80%;
				.time {
					flex: 0 0 40px;
					width: 40px;
					line-height: 30px;
					font-size: $font-size-small;
					color: $color-text;
					&.time-l {
						text-align: left;
					}
					&.time-r {
						text-align: right;
					}
				}
				.progress-bar-wrapper {
					flex: 1;
				}
			}
			.operators {
				display: flex;
				align-items: center;
				.icon {
					flex: 1;
					color: $color-theme;
					&.disable {
						color: $color-theme-d;
					}
					i {
						font-size: 30px;
					}
				}
				.i-left {
					text-align: right;
				}
				.i-center {
					padding: 0 20px;
					text-align: center;
					i {
						font-size: 40px;
					}
				}
				.i-right {
					text-align: left;
				}
				.icon-favorite {
					color: $color-sub-theme;
				}
			}
		}
		&.normal-enter-active,
		&.normal-leave-active {
			transition: all .6s;
			.top,
			.bottom {
				transition: all .6s cubic-bezier(.45, 0, .55, 1);
			}
		}
		&.normal-enter-from,
		&.normal-leave-to {
			opacity: 0;
			.top {
				transform: translate3d(0, -100px, 0);
			}
			.bottom {
				transform: translate3d(0, 100px, 0);
			}
		}
	}
}
</style>
