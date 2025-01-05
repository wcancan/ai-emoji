import * as amberTrackFh from '../config/amber.ts'
 
const appkey = ''
amberTrackFh.default.init(appkey)


export const amberTrack = (name, params) => {
    
    const data = {
        avatar_id: '',
        usr_phenu: '',
        pass_id: '',
        page_name: '',
        page_id: '',
        module_name: '',
        page_type: '',
        submodule_name: '',
        activity_id: '',
        ...params
    }

    amberTrackFh.default.track(name, data)
}