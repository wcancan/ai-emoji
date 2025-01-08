//  zip.js
import * as path from 'path'
import fs from 'fs'
import JSZip from 'JSZip'
export default {
	plugin(fileName = 'prefe', output) {
		if (!output) output = path.resolve(__dirname, './newyear2025_aigif')
		fileName += '.zip'
		const makeZip = function () {
			const zip = new JSZip()
			const distPath = path.resolve(output)
			// 因为我想压缩包中的dist文件夹层级保留 且重新命名为product2_web 所以这里设置了allFolder  ,如果不要该层级 则直接用zip即可
			let allFolder = zip.folder('newyear2025_aigif')
			const readDir = function (allFolder, dirPath) {
				// 读取dist下的根文件目录
				const files = fs.readdirSync(dirPath)
				files.forEach((fileName) => {
					const fillPath = path.join(dirPath, './', fileName)
					const file = fs.statSync(fillPath)
					// 如果是文件夹的话需要递归遍历下面的子文件
					console.log("fillPath", fillPath)
					if (file.isDirectory()) {
						const dirZip = allFolder.folder(fileName)
						console.log("fillPath", fillPath)
						readDir(dirZip, fillPath)
					} else {
						// 读取每个文件为buffer存到zip中
						allFolder.file(fileName, fs.readFileSync(fillPath))
					}
				})
			}
			const removeExistedZip = () => {
				const dest = path.join(distPath, './' + fileName)
				if (fs.existsSync(dest)) {
					fs.unlinkSync(dest)
				}
			}
			const zipDir =  () =>{
				readDir(allFolder, distPath)
				zip.generateAsync({
					type: 'nodebuffer', // 压缩类型
					compression: 'DEFLATE', // 压缩算法
					compressionOptions: {
						// 压缩级别
						level: 9
					}
				}).then((content) => {
					const dest = path.join(distPath, '../' + fileName)
					removeExistedZip()
					// 把zip包写到硬盘中，这个content现在是一段buffer
					fs.writeFileSync(dest, content)
				})
			}
			removeExistedZip()
			zipDir(distPath)
		}
		return {
			name: 'vite-plugin-auto-zip',
			apply: 'build',
			closeBundle() {
				makeZip()
			}
		}
	}
}