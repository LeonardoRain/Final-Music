<template>
  <div class="recommend">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" :src="item.pic" alt="" />
              </div>
              <div class="text">
                <p class="title">{{ item.title }}</p>
                <h2 class="name">{{ item.username }}</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slider/slider";
import Scroll from "@/components/base/scroll/scroll";

export default {
  name: "recommend",
  components: {
    Slider,
    Scroll,
  },
  data() {
    return {
      sliders: [],
      albums: [],
    };
  },
  async created() {
    const result = await getRecommend();
    this.sliders = result.sliders;
    this.albums = result.albums;
  },
};
</script>

<style lang="scss" scoped>
.recommend {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
	.recommend-content {
		overflow: hidden;
		height: 100%;

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
		/* 热门歌单列表 */
		.recommend-list {
			.list-title {
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-theme;
			}
			.item {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 20px 20px 20px;
			}
			.icon {
				flex: 0 0 60px;
				padding-right: 20px;
				width: 60px;
			}
			.text {
				display: flex;
				overflow: hidden;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				line-height: 20px;
				font-size: $font-size-medium;
			}
			.title {
				margin-bottom: 10px;
				color: $color-text;
			}
			.name {
				color: $color-text-d;
			}
		}
	}
	/* 轮播图 */
}
</style>
