<template>
  <div class="progress-bar" @click="clickProgressBar">
    <div class="bar-inner" :style="barInnerStyle">
      <div class="progress" ref="progressRef" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn" :style="btnTouchStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 12;

export default {
  name: "progress-bar",
  emits: ["progress-changing", "progress-changed"],
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      offset: 0,
      isTouching: false,
    };
  },
  computed: {
    progressStyle() {
      return `width: ${this.offset}px`;
    },
    btnStyle() {
      return `transform: translate3d(${this.offset}px, 0, 0)`;
    },
    barInnerStyle() {
      return this.isTouching
        ? `transform: scaleY(1.15);background: rgba(0, 0, 0, 0.1);`
        : "";
    },
    btnTouchStyle() {
      return this.isTouching ? `transform: scaleX(1.15);` : "";
    },
  },

  watch: {
    progress(newProgress) {
      this.setOffset(newProgress);
    },
  },
  created() {
    this.touch = {};
  },
  methods: {
    // 拖动进度条按钮
    onTouchStart(e) {
      this.isTouching = true;
      this.touch.x1 = e.touches[0].pageX;
      this.touch.beginWidth = this.$refs.progressRef.clientWidth;
    },
    onTouchMove(e) {
      const delta = e.touches[0].pageX - this.touch.x1;
      const tempWidth = this.touch.beginWidth + delta;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = Math.max(0, Math.min(1, tempWidth / barWidth));
      this.offset = barWidth * progress;
      this.$emit("progress-changing", progress);
      return progress;
    },
    onTouchEnd() {
      this.isTouching = false;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = this.$refs.progressRef.clientWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    // 点击进度条
    clickProgressBar(e) {
      const rect = this.$el.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = Math.max(0, Math.min(1, offsetWidth / barWidth));
      this.$emit("progress-changed", progress);
    },
    // 设置进度条偏移
    setOffset(progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      this.offset = barWidth * progress;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
	height: 30px;
	.bar-inner {
		position: relative;
		top: 13px;
		border-radius: 2px;
		height: 4px;
		background: rgba(0, 0, 0, .3);
		transition: all .1s;

		-moz-transition: all .1s;
		-webkit-transition: all .1s;
		.progress {
			position: absolute;
			border-radius: 2px;
			height: 100%;
			background: $color-theme;
		}
		.progress-btn-wrapper {
			position: absolute;
			left: -8px;
			top: -13px;
			width: 30px;
			height: 30px;
			.progress-btn {
				position: relative;
				left: 7px;
				top: 9px;
				box-sizing: border-box;
				border: 3px solid $color-text-w;
				border-radius: 50%;
				width: 12px;
				height: 12px;
				background: $color-theme;
			}
		}
	}
}
</style>
