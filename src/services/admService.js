import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getAdmSetting() {
        let resp = await api.getHttpRequest('adm/setting');
        return cs.requestResponse( resp);
    },
    async getAdmSettingByPrefix( prefix) {
        let resp = await api.getHttpRequest('adm/setting/'+prefix);
        return cs.requestResponse( resp);
    },
}
