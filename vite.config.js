import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					hack: `true; @import (reference) "@/less/base.less";`,
				},
				javascriptEnabled: true,
			},
			scss: {
				additionalData: `@import "@nutui/nutui/dist/styles/variables-jdt.scss";`
			}
		}
	},
	plugins: [
		vue(),
		// 开启 unplugin 插件，自动引入 NutUI 组件
		Components({
			resolvers: [NutUIResolver()],
		}),
	],
	server: {
		port: 8080,
		proxy: {
			//   '/prep-portalx/': {
			// 	target: 'https://api.migudm.cn/prep-portalx/',
			// 	changeOrigin: true,
			// 	rewrite: (path) => path.replace(/^\/prep-portalx/, ''),
			//   },
			  '/prep-portalx/': {
				target: 'http://112.48.155.26:8088/product/test/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/prep-portalx/, ''),
			  },

		}
	}
})