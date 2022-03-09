import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import loadingDirective from "@/components/base/loading/directive";
import noResultDirective from "@/components/base/no-result/directive";
import { load, saveAll } from "@/assets/js/array-store";
import { FAVORITE_KEY, PLAY_KEY } from "@/assets/js/constant";
import { processSongs } from "@/service/song";

// 全局引入样式文件
import "@/assets/scss/index.scss";

// 应用程序初始化的时候，批量更新歌曲 url ，防止 url 一天过期
const favoriteSongs = load(FAVORITE_KEY);
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit("setFavoriteList", songs);
    saveAll(songs, FAVORITE_KEY);
  });
}
const historySongs = load(PLAY_KEY);
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit("setPlayHistory", songs);
    saveAll(songs, PLAY_KEY);
  });
}

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png"),
  })
  .directive("loading", loadingDirective)
  .directive("no-result", noResultDirective)
  .mount("#app");
