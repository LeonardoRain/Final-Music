<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @selectSinger="handleSelectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer.js";
import IndexList from "@/components/index-list/index-list";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant.js";

export default {
  name: "singer",
  components: { IndexList },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
  methods: {
    handleSelectSinger(singer) {
      this.selectedSinger = singer;
      this.catchSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
    catchSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
}
</style>
