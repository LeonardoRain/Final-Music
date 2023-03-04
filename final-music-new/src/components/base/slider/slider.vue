<template>
	<div class="slider" ref="rootRef">
		<div class="slider-group">
			<div class="slider-page" v-for="item in sliders" :key="item.id">
				<a :href="item.link">
					<img :src="item.pic" />
				</a>
			</div>
		</div>
		<div class="dots-wrapper">
			<span
				class="dot"
				v-for="(item, index) in sliders"
				:key="item.id"
				:class="{ active: currentPageIndex === index }">
			</span>
		</div>
	</div>
</template>

<script setup name="slider">
import { ref, defineProps } from "vue";
import useSlider from "./useSlider";

defineProps({
	sliders: {
		type: Array,
		default: [],
	},
});

const rootRef = ref(null);
const { currentPageIndex } = useSlider(rootRef);
</script>

<style lang="scss" scoped>
.slider {
	min-height: 1px;
	font-size: 0;

	touch-action: pan-y;
	.slider-group {
		overflow: hidden;
		position: relative;
		white-space: nowrap;
		.slider-page {
			display: inline-block;
			backface-visibility: hidden;
			transform: translate3d(0, 0, 0);
			a {
				display: block;
				width: 100%;
			}
			img {
				display: block;
				width: 100%;
			}
		}
	}
	.dots-wrapper {
		position: absolute;
		left: 50%;
		bottom: 12px;
		line-height: 12px;
		transform: translateX(-50%);
		.dot {
			display: inline-block;
			margin: 0 4px;
			border-radius: 50%;
			width: 8px;
			height: 8px;
			background: $color-text-l;
			&.active {
				border-radius: 5px;
				width: 20px;
				background: $color-text-ll;
			}
		}
	}
}
</style>
