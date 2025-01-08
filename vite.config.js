import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'

import {
	viteMockServe
} from "vite-plugin-mock";


// https://vitejs.dev/config/

export default defineConfig(({
	command,
	mode
}) => {
	console.log("command", command);
	console.log("mode", mode);
	return {
		base: './',
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
			vue({
				script: {
					defineModel: true
				}
			}),
			// 开启 unplugin 插件，自动引入 NutUI 组件
			Components({
				resolvers: [NutUIResolver()],
			}),
			viteMockServe({
				mockPath: "src/mock", //存放mock文件的目录，默认是'mock'  
				enable: command === 'serve', // 只有开发环境才开启mock, 根据命令类型（command）和 vite 的模式（mode）决定是否启用 mock 服务。
				watchFiles: true, // 监听 mock 文件变化
				logger: true, //是否开启日志
			})
		],
		server: {
			port: 8080,
			proxy: {
				'/test/': {
					target: 'http://112.48.155.26:8088/product/test/',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/test/, ''),
				},
				// '/prep/': {
				// 	target: 'https://api.migudm.cn/prep-portalx/',
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/prep/, ''),
				// },
				'/portalx/': {
					target: 'https://api.migudm.cn/portalx/',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/portalx/, ''),
				},
			}
		}
	}

})