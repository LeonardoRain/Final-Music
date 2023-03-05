<template>
	<div class="singer-detail">
		singer-detail
		<!-- <music-list
      :songs="songs"
      :loading="loading"
      :title="title"
      :pic="pic"
      backUrl="singer"
    ></music-list> -->
	</div>
</template>

<script setup name="singer-detail">
import { getSingerDetail } from "@/service/singer.js";
import { processSongs } from "@/service/song";

const props = defineProps({
	singer: {
		type: Object,
	},
});

async function fetchSingerAndSonsDetail() {
	const result = await getSingerDetail(props.singer);
	const songs = await processSongs(result.songs);
	console.log(result);
}
fetchSingerAndSonsDetail();

// export default createDetailComponent(
// 	"singer-detail",
// 	SINGER_KEY,
// 	getSingerDetail
// );
</script>

<style lang="scss" scoped>
.singer-detail {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	background: $color-background;
}
</style>
