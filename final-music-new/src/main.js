import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import lazyPlugin from "vue3-lazy";
import "@/assets/scss/index.scss";
import defaultImg from "@/assets/images/default.png";
import loadingDirective from "@/components/base/loading/directive";

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(lazyPlugin, { loading: defaultImg })
	.directive("loading", loadingDirective)
	.mount("#app");
