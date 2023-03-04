import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VueSetupExtend()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 全局引入变量和 mixin
				additionalData: `
				  @import "@/assets/scss/variable.scss";
				  @import "@/assets/scss/mixin.scss";
				`,
			},
		},
	},
	server: {
		host: true, // 监听所有地址
		proxy: {
			"/api": "http://localhost:9002",
		},
	},
});
