import { computed, ref } from "vue";

export default function useShortcut(props, groupRef) {
  // 单个锚点的高度
  const ANCHOR_HEIGHT = 18;

  const scrollRef = ref(null);

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title;
    });
  });

  const touch = {};

  // 获取点击锚点的 index，并滚动到对应位置
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.y1 = e.touches[0].pageY;
    touch.anchorIndex = anchorIndex;
    scrollTo(anchorIndex);
  }

  // 获取滑动事件结尾的 index，并滚动到对应位置
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY;
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
    const anchorIndex = touch.anchorIndex + delta;
    scrollTo(anchorIndex);
  }

  // 滚动到目标位置
  function scrollTo(index) {
    if (isNaN(index)) {
      return;
    }
    // 这里限制 index 的值在范围内，防止滑动超过锚点列表时 index 过大或过小
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
    const targetEl = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 750);
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove,
  };
}
