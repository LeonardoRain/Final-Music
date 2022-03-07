import { onMounted, onUnmounted, computed, watch, ref, nextTick } from "vue";
import { useStore } from "vuex";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

BScroll.use(Slide);

export default function useMiniSlider() {
  const sliderWrapperRef = ref(null);
  const slider = ref(null);

  const store = useStore();
  const fullScreen = computed(() => store.state.fullScreen);
  const playlist = computed(() => store.state.playlist);
  const currentIndex = computed(() => store.state.currentIndex);

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value;
  });

  onMounted(() => {
    let sliderVal;
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick();
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          });
          // 监听 slidePageChanged，实现切歌
          sliderVal.on("slidePageChanged", ({ pageX }) => {
            store.commit("setCurrentIndex", pageX);
            store.commit("setPlayingState", true);
          });
        } else {
          sliderVal.refresh();
        }
        sliderVal.goToPage(currentIndex.value, 0, 0);
      }
    });

    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0);
      }
    });
  });

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy();
    }
  });

  return {
    slider,
    sliderWrapperRef,
  };
}
