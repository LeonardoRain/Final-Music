<template>
	<div class="singer" v-loading="!singers.length">
		<IndexList :data="singers"></IndexList>
	</div>
</template>

<script setup name="singer">
import { ref } from "vue";
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/base/index-list/index-list.vue";

const singers = ref([]);

async function fetchSinger() {
	const result = await getSingerList();
	singers.value = result.singers;
}
fetchSinger();
</script>

<style lang="scss" scoped>
.singer {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
}
</style>
