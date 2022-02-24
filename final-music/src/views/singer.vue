<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer.js";
import IndexList from "@/components/index-list/index-list";

export default {
  name: "singer",
  components: { IndexList },
  data() {
    return {
      singers: [],
      loadingText: "正在载入...",
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
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
