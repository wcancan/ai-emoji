/**
 * 动态加载js资源
 * @param src
 * @param attributes
 */
export function loadScript(
	src: string,
	attributes: { [key: string]: string } = {}
): Promise<HTMLScriptElement> {
	return new Promise((resolve, reject) => {
		const vds = document.createElement('script')
		vds.type = 'text/javascript'
		vds.async = true
		vds.src = src
		vds.onload = () => {
			resolve(vds)
		}
		vds.onerror = (err) => {
			reject(err)
		}
		if (attributes && typeof attributes === 'object') {
			for (const key in attributes) vds.setAttribute(key, attributes[key])
		}
		const head = document.getElementsByTagName('head')[0]
		head ? head.appendChild(vds) : document.body.appendChild(vds)
		return vds
	})
}

type AmberTrackParams = Array<{ EK: string; EV: unknown }>
type AmberTrackFn = (key: string, values?: AmberTrackParams) => void

declare global {
	interface Window {
		_amberTrack: AmberTrackFn
		_mgds: Array<Array<unknown>>
	}
}

window._mgds = window._mgds || []
window._mgds.push(['_enterTime', Date.now()])

interface unknownObj {
	[key: string]: unknown
}

const AMBER_SCRIPT_URL = 'https://uem.migu.cn:18088/uemjs/amber-web-sdk-min.js'

export default {
	globalValues: {},
	init(
		appKey: string,
		options: unknownObj = {
			_isUpload: 'true',
			_inAppIsUpload: 'true'
		},
		defaultValue?: unknownObj
	) {
		window._mgds.push(['_accountId', appKey])

		for (const key in options) {
			window._mgds.push([key, options[key]])
		}

		return loadScript(AMBER_SCRIPT_URL, {
			id: 'amberCapScript'
		}).then(() => {
			return window._amberTrack
		})
	},
	track(key: string, values: unknownObj = {}) {
		let results: AmberTrackParams

		const theValues = Object.assign(
			{},
			{
				...this.globalValues,
				...values
			}
		)
		console.log(
			`%c ${key}: %c ${theValues?.page_name || ''} - ${theValues?.module_name || ''}(${
				theValues?.module_id || ''
			}) - ${theValues?.submodule_name || theValues?.element_name || theValues?.button_name || ''}(${
				theValues?.submodule_id ||
				theValues?.element_id ||
				theValues?.button_id ||
				''
			})`,
			`color: #fff;font-size:11px;background:${
				key === 'page_click'
					? 'green'
					: theValues.end_time
						? 'red'
						: 'blue'
			}; font-weight: bold`,
			'color: #fff;font-size:11px;background:#EE664F;'
		)

		// console.table(theValues)

		this.amberTrackReady().then((callback) => {
			if (theValues !== null && typeof theValues === 'object') {
				const keys = Object.keys(theValues)
				results = keys.map((key) => ({ EK: key, EV: theValues[key] }))
			}
			results ? callback(key, results) : callback(key)
		})
	},
	amberTrackReady(): Promise<AmberTrackFn> {
		return new Promise((resolve) => {
			const checkAmber = () => {
				if (typeof window._amberTrack === 'function') {
					resolve(window._amberTrack)
				} else {
					setTimeout(() => {
						checkAmber()
					}, 50)
				}
			}
			checkAmber()
		})
	}
}
