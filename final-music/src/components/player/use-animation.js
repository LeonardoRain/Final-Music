import { ref } from "vue";
import animations from "create-keyframe-animation";

export default function useAnimation() {
  const cdWrapperRef = ref(null);
  let entering = false;
  let leaving = false;

  // 进入全屏播放界面
  function enter(el, done) {
    if (leaving) {
      afterLeave();
    }
    entering = true;
    const { x, y, scale } = getPosAndScale();

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      100: {
        transform: "translate3d(0, 0, 0) scale(1)",
      },
    };

    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 600,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    });

    animations.runAnimation(cdWrapperRef.value, "move", done);
  }

  function afterEnter() {
    entering = false;
    animations.unregisterAnimation("move");
    cdWrapperRef.value.style.animation = "";
  }

  // 退出全屏播放界面
  function leave(el, done) {
    if (entering) {
      afterEnter();
    }
    leaving = true;
    const { x, y, scale } = getPosAndScale();
    const cdWrapperEl = cdWrapperRef.value;

    cdWrapperEl.style.transition = "all .6s cubic-bezier(0.45, 0, 0.55, 1)";
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    cdWrapperEl.addEventListener("transitionend", next);

    function next() {
      cdWrapperEl.removeEventListener("transitionend", next);
      done();
    }
  }

  function afterLeave() {
    leaving = false;
    const cdWrapperEl = cdWrapperRef.value;

    cdWrapperEl.style.transition = "";
    cdWrapperEl.style.transform = "";
  }

  // 获取偏移量和缩放数据
  function getPosAndScale() {
    // miniCdWrapper 数据
    const miniCdWpWidth = 60;
    const miniCdWpMarginLeft = 10;
    const miniCdWpMarginBottom = 20;
    // cdWrapper 数据
    const cdWpWidth = cdWrapperRef.value.clientWidth;
    const cdWpOffSetTop = 95 + cdWrapperRef.value.offsetTop;
    // 大圆偏移量
    const x = -(window.innerWidth / 2 - miniCdWpWidth / 2 - miniCdWpMarginLeft);
    const y =
      window.innerHeight -
      cdWpOffSetTop -
      cdWpWidth / 2 -
      miniCdWpWidth / 2 -
      miniCdWpMarginBottom;
    // 大圆缩放量
    const scale = miniCdWpWidth / cdWpWidth;

    return {
      x,
      y,
      scale,
    };
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave,
    getPosAndScale,
  };
}
