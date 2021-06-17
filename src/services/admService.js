import api from "@/services/apiService"
import cs from '@/services/commonService'

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
}
