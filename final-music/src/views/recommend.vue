<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        <slider v-if="sliders.length" :sliders="sliders"></slider>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slider/slider";

export default {
  name: "recommend",
  components: {
    Slider,
  },
  data() {
    return {
      sliders: [],
    };
  },
  async created() {
    const result = await getRecommend();
    this.sliders = result.sliders;
  },
};
</script>

<style lang="scss" scoped>
.recommend {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
	.slider-wrapper {
		overflow: hidden;
		position: relative;
		padding-top: 40%;
		width: 100%;
		height: 0;
		.slider-content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
