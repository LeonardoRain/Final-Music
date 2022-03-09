<template>
  <div class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div class="rank" v-if="rank">
        <span :class="getRankCls(index)">
          {{ getRankText(index) }}
        </span>
      </div>
      <div class="music" v-if="!rank">
        <i class="icon icon-music"></i>
      </div>
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    rank: Boolean,
  },
  emits: ["select"],
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    },
    selectItem(song, index) {
      this.$emit("select", { song, index });
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return `text`;
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
	.item {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 64px;
		font-size: $font-size-medium;
		.rank {
			flex: 0 0 25px;
			margin: 0 20px 0 -10px;
			width: 25px;
			text-align: center;
			.icon {
				display: inline-block;
				width: 25px;
				height: 24px;
				background-size: 25px 24px;
				&.icon0 {
					@include bg-image("first");
				}
				&.icon1 {
					@include bg-image("second");
				}
				&.icon2 {
					@include bg-image("third");
				}
				.text {
					font-size: $font-size-large;
					color: $color-theme;
				}
			}
		}
		.music {
			flex: 0 0 25px;
			margin: 0 15px 0 -15px;
			width: 25px;
			text-align: center;
			.icon {
				display: inline-block;
				width: 25px;
				height: 24px;
				background-size: 25px 24px;
				font-size: 25px;
				color: $color-theme;
			}
		}

		.content {
			overflow: hidden;
			flex: 1;
			line-height: 20px;
			.name {
				color: $color-text;

				@include no-wrap();
			}
			.desc {
				margin-top: 4px;
				color: $color-text-d;

				@include no-wrap();
			}
		}
	}
}
</style>
