import { ref, watch, nextTick, computed } from "vue";

export default function useFixed(props) {
	const TITLE_HEIGHT = 30; // 标题元素固定高度
	const groupRef = ref(null); // 外层 ul 的 ref
	const listHeights = ref([]); // 各个分组的高度区间
	const scrollY = ref(0); // ul 纵向滚动的值
	const currentIndex = ref(0); // 当前展示组的索引
	const distance = ref(0); // 当前展示组底部到滚动容器顶部的距离

	// 计算属性：需要固定展示的组名
	const fixedTitle = computed(() => {
		if (scrollY.value < 0) {
			return "";
		}
		const currentGroup = props.data[currentIndex.value];
		return currentGroup ? currentGroup.title : "";
	});

	// 固定标题元素被向上顶起的样式计算
	const fixedStyle = computed(() => {
		const distanceVal = distance.value;
		const diff =
			distanceVal > 0 && distanceVal <= TITLE_HEIGHT
				? distanceVal - TITLE_HEIGHT
				: 0;
		return {
			transform: `translate3d(0, ${diff}px, 0)`,
		};
	});

	// 监听数据变化，数据变化时，调用计算高度区间函数
	watch(
		() => props.data,
		async () => {
			// 手动触发 DOM 渲染
			await nextTick();
			calculate();
		}
	);

	// 监听滚动过程中，计算出当前展示组的索引
	watch(scrollY, newY => {
		const listHeightsVal = listHeights.value;
		for (let i = 0; i < listHeightsVal.length - 1; i++) {
			const heightTop = listHeightsVal[i];
			const heightBottom = listHeightsVal[i + 1];
			if (newY >= heightTop && newY <= heightBottom) {
				currentIndex.value = i;
				distance.value = heightBottom - newY;
			}
		}
	});

	// 计算各个分组高度区间
	function calculate() {
		const list = groupRef.value.children;
		const listHeightsVal = listHeights.value;
		listHeightsVal.length = 0;
		let height = 0;
		listHeightsVal.push(height);
		for (let i = 0; i < list.length; i++) {
			height += list[i].clientHeight;
			listHeightsVal.push(height);
		}
	}

	// 滚动事件的回调函数
	function onScroll(pos) {
		scrollY.value = -pos.y;
	}

	return {
		groupRef,
		onScroll,
		fixedTitle,
		fixedStyle,
		currentIndex,
	};
}
