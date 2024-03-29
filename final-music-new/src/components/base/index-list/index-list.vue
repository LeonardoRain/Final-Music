<template>
	<Scroll class="index-list" :probe-type="3" @scroll="onScroll" ref="scrollRef">
		<ul ref="groupRef">
			<li v-for="group in data" :key="group.title" class="group">
				<h2 class="title">{{ group.title }}</h2>
				<ul>
					<li
						v-for="item in group.list"
						:key="item.id"
						class="item"
						@click="onItemClick(item)">
						<img v-lazy="item.pic" class="avatar" />
						<span class="name">{{ item.name }}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div v-show="fixedTitle" class="fixed" :style="fixedStyle">
			<div class="fixed-title">{{ fixedTitle }}</div>
		</div>
		<div
			class="shortcut"
			@touchstart.stop.prevent="onShortcutTouchStart"
			@touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li
					v-for="(item, index) in shortcutList"
					:key="item"
					:data-index="index"
					class="item"
					:class="{ current: currentIndex === index }">
					{{ item }}
				</li>
			</ul>
		</div>
	</Scroll>
</template>

<script setup name="index-list">
import Scroll from "@/components/base/scroll/scroll.vue";
import useFixed from "./useFixed";
import useShortcut from "./useShortcut";

const props = defineProps({
	data: {
		type: Array,
		default() {
			return [];
		},
	},
});
const emit = defineEmits(["selectSinger"]);

// 头部固定标题栏
const { groupRef, fixedTitle, fixedStyle, currentIndex, onScroll } =
	useFixed(props);
// 右侧快捷导航
const { shortcutList, scrollRef, onShortcutTouchStart, onShortcutTouchMove } =
	useShortcut(props, groupRef);
// 点击歌手处理
function onItemClick(item) {
	emit("selectSinger", item);
}
</script>

<style lang="scss" scoped>
.index-list {
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 100%;
	background: $color-background;
	.group {
		padding-bottom: 30px;
		.title {
			padding-left: 20px;
			height: 30px;
			background: $color-theme-op;
			line-height: 30px;
			font-size: $font-size-small;
			color: $color-text-w;
		}
		.item {
			display: flex;
			align-items: center;
			padding: 20px 0 0 30px;
			.avatar {
				border-radius: 50%;
				width: 50px;
				height: 50px;
			}
			.name {
				margin-left: 20px;
				font-size: $font-size-medium;
				color: $color-text;
			}
		}
	}
	.fixed {
		position: absolute;
		left: 0;
		top: -1px;
		border-bottom: 1px solid #add1e2;
		width: 100%;
		.fixed-title {
			padding-left: 20px;
			height: 30px;
			background: $color-theme-op;
			line-height: 30px;
			font-size: $font-size-small;
			color: $color-text-w;
		}
	}
	.shortcut {
		position: absolute;
		right: 4px;
		top: 50%;
		padding: 20px 0;
		border-radius: 10px;
		width: 20px;
		background: $color-background-d;
		text-align: center;
		font-family: Helvetica;
		transform: translateY(-50%);
		.item {
			padding: 3px;
			line-height: 1;
			font-size: $font-size-small;
			color: $color-text-l;
			&.current {
				color: $color-theme;
			}
		}
	}
}
</style>
