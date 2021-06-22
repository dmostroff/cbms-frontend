import api from "@/services/apiService"
import cs from '@/services/commonService'

var admSettings = [];

export default {
    async getAdmSettings() {
        let resp = await api.getHttpRequest('adm/settings');
        return cs.requestResponse( resp);
    },
    async getAdmSettingByPrefix( prefix) {
        let resp = await api.getHttpRequest('adm/setting/'+prefix);
        return cs.requestResponse( resp);
    },
    async postAdmSetting( admSetting) {
        let resp = await api.postHttpRequest('adm/setting', admSetting);
        return cs.requestResponse( resp);
    },
    async getSettingsByPrefix( prefix) {
        if( admSettings.length === 0) {
            let resp = await this.getAdmSettings()
            if( 'rc' in resp && resp.rc == 1) {
                admSettings = resp.data
            }
        }
        return admSettings.filter((val) => val.prefix === prefix)
    },

    async getSettingsAsSelectByPrefix( prefix) {
        const prefixSettings = await this.getSettingsByPrefix(prefix)
        return prefixSettings.map( (item) => {
            return { text: item.keyvalue, value: item.keyname }
        })
    },
    getDescription( prefix, keyname) {
        let retval = keyname
        if(admSettings.length > 0) {
            const founditem = admSettings.filter((val) => val.prefix === prefix && val.keyname === keyname)
            retval = ( founditem.length > 0) ? founditem[0].keyvalue : keyname
            console.log( prefix, keyname, founditem, retval)
        }
        return retval
    }

}
