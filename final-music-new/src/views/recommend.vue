<template>
	<div class="recommend">
		<div class="slider-wrapper">
			<div class="slider-content">
				<Slider v-if="sliders.length" :sliders="sliders"></Slider>
			</div>
		</div>
	</div>
</template>

<script setup name="recommend">
import { onMounted, ref } from "vue";
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slider/slider.vue";

const sliders = ref([]);

onMounted(async function () {
	const result = await getRecommend();
	sliders.value = result.sliders;
});
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
