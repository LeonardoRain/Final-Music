<template>
  <div class="top-list" v-loading="loading">
    <scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="handleSelectTop(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}.</span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Scroll from "@/components/wrap-scroll";
import { getTopList } from "../service/top-list";
import storage from "good-storage";
import { TOP_KEY } from "@/assets/js/constant.js";

export default {
  name: "top-list",
  components: { Scroll },
  data() {
    return {
      topList: [],
      loading: true,
      selectedTop: null,
    };
  },
  async created() {
    const result = await getTopList();
    this.topList = result.topList;
    this.loading = false;
  },
  methods: {
    handleSelectTop(top) {
      this.selectedTop = top;
      this.cacheTop(top);
      this.$router.push({
        path: `/top-list/${top.id}`,
      });
    },
    cacheTop(top) {
      storage.session.set(TOP_KEY, top);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-list {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
	.top-list-content {
		overflow: hidden;
		height: 100%;
		.item {
			display: flex;
			margin: 0 20px;
			padding-top: 20px;
			height: 100px;
			&:last-child {
				padding-bottom: 20px;
			}
			.icon {
				flex: 0 0 100px;
				width: 100px;
				height: 100px;
			}
			.song-list {
				display: flex;
				overflow: hidden;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				padding: 0 20px;
				height: 100px;
				background: $color-highlight-background;
				font-size: $font-size-small;
				color: $color-text;
				.song {
					line-height: 26px;

					@include no-wrap();
				}
			}
		}
	}
}
</style>
