import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
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
		// host: true, // 监听所有地址
		proxy: {
			"/api": "http://localhost:9002",
		},
	},
});
