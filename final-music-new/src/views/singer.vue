<template>
	<div class="singer" v-loading="!singers.length">
		<IndexList :data="singers" @selectSinger="handleselectSinger"></IndexList>
		<router-view :singer="selectedSinger"></router-view>
	</div>
</template>

<script setup name="singer">
import { ref } from "vue";
import router from "@/router/index";
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/base/index-list/index-list.vue";

const singers = ref([]);
const selectedSinger = ref(null);

async function fetchSinger() {
	const result = await getSingerList();
	singers.value = result.singers;
}
fetchSinger();

function handleselectSinger(singer) {
	selectedSinger.value = singer;
	router.push({
		path: `/singer/${singer.mid}`,
	});
}
</script>

<style lang="scss" scoped>
.singer {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
}
</style>
