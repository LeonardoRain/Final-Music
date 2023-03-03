import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// 引入全局样式文件
import "@/assets/scss/index.scss";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
