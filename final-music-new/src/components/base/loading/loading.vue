<template>
	<div class="loading">
		<div class="loading-content">
			<img src="./loading.gif" width="24" height="24" alt="loading" />
			<p class="desc">{{ title }}</p>
		</div>
	</div>
</template>

<script setup name="loading">
import { ref } from "vue";

const title = ref("正在载入...");
const setTitle = function (newTitle) {
	title.value = newTitle;
};

defineExpose({
	title,
	setTitle,
});
</script>

<style lang="scss" scoped>
.loading {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate3d(-50%, -50%, 0);
	.loading-content {
		text-align: center;
		.desc {
			line-height: 20px;
			font-size: $font-size-small;
			color: $color-text-l;
		}
	}
}
</style>
