<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'no-result',
  data() {
    return {
      title: '抱歉，没有结果'
    }
  },
  methods: {
    setTitle(title) {
      this.title = title
    }
  }
}
</script>

<style lang="scss" scoped>
.no-result {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate3d(-50%, -50%, 0);
	.no-result-content {
		text-align: center;
		.icon {
			margin: 0 auto;
			width: 86px;
			height: 86px;
			background-size: 86px 90px;

			@include bg-image("no-result");
		}
		.text {
			margin-top: 30px;
			font-size: $font-size-medium;
			color: $color-text-d;
		}
	}
}
</style>
