import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: "192.168.31.214",
	},
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
});
