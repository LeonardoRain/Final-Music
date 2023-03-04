import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import lazyPlugin from "vue3-lazy";
// 引入全局样式文件
import "@/assets/scss/index.scss";
import defaultImg from "@/assets/images/default.png";

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(lazyPlugin, { loading: defaultImg })
	.mount("#app");
