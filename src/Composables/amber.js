import * as amberTrackFh from '../config/amber.ts'
 
const appkey = ''
amberTrackFh.default.init(appkey)

export const amberTrack = (name, data) => {
    amberTrackFh.default.track(name, data)
}