<template>
  <div class="player" v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
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
        <div
          class="middle"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove.prevent="onMiddleTouchMove"
          @touchend.prevent="onMiddleTouchEnd"
        >
          <div class="middle-l" :style="middleLStyle">
            <div class="pointer-wrapper">
              <div class="pointer-head"></div>
              <img
                class="cd-poiner"
                :class="pointerCls"
                src="../../assets/images/cd-pointer.png"
              />
            </div>

            <div ref="cdWrapperRef" class="cd-wrapper">
              <div ref="cdRef" class="cd">
                <img
                  ref="cdImageRef"
                  class="image"
                  :class="cdCls"
                  :src="currentSong.pic"
                />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">
                {{ playingLyric }}
              </div>
            </div>
          </div>
          <scroll ref="lyricScrollRef" class="middle-r" :style="middleRStyle">
            <div class="lyric-wrapper">
              <div v-if="currentLyric" ref="lyricListRef">
                <p
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                >
                  {{ line.txt }}
                </p>
              </div>
              <div class="pure-music" v-show="pureMusicLyric">
                <p>{{ pureMusicLyric }}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l" :class="cTimeClass">
              {{ formatTime(currentTime) }}
            </span>
            <div class="progress-bar-wrapper">
              <progress-bar
                ref="barRef"
                :progress="progress"
                @progress-changing="handleProgressChanging"
                @progress-changed="handleProgressChanged"
              ></progress-bar>
            </div>
            <span class="time time-r">
              {{ formatTime(currentSong.duration) }}
            </span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="modeIcon" @click="changeMode"></i>
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
              <i
                :class="getFavoriteIcon(currentSong)"
                @click="toggleFavorite(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <mini-player :progress="progress" :toggle-play="togglePlay"></mini-player>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { computed, watch, ref, nextTick } from "vue";
import { useStore } from "vuex";
// constant
import { formatTime } from "@/assets/js/util.js";
import { PLAY_MODE } from "@/assets/js/constant";
// hooks
import useMode from "./use-mode";
import useFavorite from "./use-favorite";
import useCd from "./use-cd";
import useLyric from "./use-lyric";
import useMiddleInteractive from "./use-middle-interactive";
import useAnimation from "./use-animation";
import usePlayHistory from "./use-play-history";
// components
import ProgressBar from "./progress-bar.vue";
import Scroll from "@/components/base/scroll/scroll";
import MiniPlayer from "@/components/player/mini-player";

export default {
  name: "player",
  components: {
    ProgressBar,
    Scroll,
    MiniPlayer,
  },
  setup() {
    // ----------------- data -----------------
    // progressBar 组件实例
    const barRef = ref(null);
    // audio 实例
    const audioRef = ref(null);
    // 当前歌曲是否准备好播放
    const songReady = ref(false);
    // 当前歌曲播放时长
    const currentTime = ref(0);
    // 当前是否在拖动
    const isTouching = ref(false);
    // ----------------- store -----------------
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const currentIndex = computed(() => store.state.currentIndex);
    const playlist = computed(() => store.state.playlist);
    const playMode = computed(() => store.state.playMode);
    // ----------------- hooks -----------------
    // 使用 播放模式 相关 hook
    const { modeIcon, changeMode } = useMode();
    // 使用 喜欢 相关 hook
    const { getFavoriteIcon, toggleFavorite } = useFavorite();
    // 使用 cd 相关 hook
    const { cdCls, pointerCls, cdRef, cdImageRef } = useCd();
    // 使用 歌词 相关 hook
    const {
      currentLyric,
      currentLineNum,
      pureMusicLyric,
      playingLyric,
      playLyric,
      stopLyric,
      lyricScrollRef,
      lyricListRef,
    } = useLyric(songReady, currentTime);
    // 使用 切换浮层 相关 hook
    const {
      currentShow,
      middleLStyle,
      middleRStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
    } = useMiddleInteractive();
    // 使用 动画 相关 hook
    const { cdWrapperRef, enter, afterEnter, leave, afterLeave } =
      useAnimation();
    // 使用 播放历史 hook
    const { savePlay } = usePlayHistory();
    // ----------------- computed -----------------
    // 播放 / 暂停 按钮，动态样式
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    // 按钮禁用样式
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration;
    });
    // 拖动时当前时间文字样式
    const cTimeClass = computed(() => {
      return isTouching.value ? "time-touching" : "";
    });
    // ----------------- watch -----------------
    // 监听当前歌曲的变化，控制歌曲播放
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      currentTime.value = 0;
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
      if (newPlaying) {
        audioEl.play();
        playLyric();
      } else {
        audioEl.pause();
        stopLyric();
      }
    });
    // 监听 fullScreen 的状态，计算 progressBar 的位置
    watch(fullScreen, async (newFullScreen) => {
      if (newFullScreen) {
        await nextTick();
        barRef.value.setOffset(progress.value);
      }
    });
    // ----------------- methods -----------------
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
      store.commit("setPlayingState", true);
    }
    // canplay 回调函数
    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
      playLyric();
      savePlay(currentSong.value);
    }
    // 如果歌曲有问题，手动将 songReady 置为 true，以便播放其他歌曲
    function error() {
      songReady.value = true;
    }
    // 更新播放时长
    function updateTime(e) {
      if (!isTouching.value) {
        currentTime.value = e.target.currentTime;
      }
    }
    // 当前歌曲播放完毕
    function end() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }
    // 处理进度条拖动
    function handleProgressChanging(progress) {
      isTouching.value = true;
      currentTime.value = currentSong.value.duration * progress;
      // 托动时，先同步歌词位置到currentTime的位置，然后停住
      playLyric();
      stopLyric();
    }
    // 处理进度条拖动结束
    function handleProgressChanged(progress) {
      isTouching.value = false;
      audioRef.value.currentTime = currentTime.value =
        currentSong.value.duration * progress;
      playLyric();
    }

    return {
      // data
      barRef,
      audioRef,
      currentTime,
      // store
      fullScreen,
      currentSong,
      playlist,
      // computed
      playIcon,
      disableCls,
      progress,
      cTimeClass,
      // hooks
      modeIcon,
      changeMode,
      getFavoriteIcon,
      toggleFavorite,
      cdCls,
      pointerCls,
      cdRef,
      cdImageRef,
      currentLyric,
      currentLineNum,
      pureMusicLyric,
      playingLyric,
      lyricScrollRef,
      lyricListRef,
      currentShow,
      middleLStyle,
      middleRStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      cdWrapperRef,
      enter,
      afterEnter,
      leave,
      afterLeave,
      // methods
      goback,
      togglePlay,
      pause,
      prev,
      next,
      loop,
      ready,
      error,
      updateTime,
      end,
      formatTime,
      handleProgressChanging,
      handleProgressChanged,
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
      opacity: 0.6;

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
        margin: 0 40px;
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;

        @include no-wrap();
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
        /* display: none; */
        position: relative;
        padding-top: 80%;
        width: 100%;
        height: 0;
        vertical-align: top;
        .pointer-wrapper {
          position: absolute;
          top: 0;
          padding-top: 100%;
          width: 100%;
          height: 0;
          .pointer-head {
            position: absolute;
            left: 47%;
            top: 5%;
            border: 1px solid rgba(222, 222, 222, 0.5);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            background: rgba(19, 19, 19, 0.5);
            transform: translate(-3px, -5px);
          }
          .cd-poiner {
            position: absolute;
            left: 47%;
            top: 5%;
            z-index: 100;
            width: 20%;
            transform: rotate(-45deg);
            transform-origin: 12px 10.7px;
            transition: all 0.5s;
          }
          .playing-pointer {
            transform: rotate(0deg);
            transform-origin: 12px 10.7px;
            transition: all 0.5s;
          }
        }

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 22%;
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
              padding: 50px;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              width: 100%;
              height: 100%;
              background-image: url("../../assets/images/cd-outter.png");
              background-repeat: no-repeat;
              background-size: 100%;
            }
            .playing-cd {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          overflow: hidden;
          margin: 23% auto 0 auto;
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
            color: $color-text-g;
            transition: all 0.6s;
            &.current {
              font-weight: 500;
              transform: scale(1.2);
              color: $color-text-w;
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
      bottom: 40px;
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
          color: $color-text-d;
          transition: all 0.1s;

          -moz-transition: all 0.1s;
          -webkit-transition: all 0.1s;
          &.time-l {
            text-align: left;
          }
          &.time-touching {
            color: $color-text-l;
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
          .like-color {
            color: #d81e06;
          }
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
            font-size: 50px;
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
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
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
