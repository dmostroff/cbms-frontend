import api from "@/services/apiService"
import cs from '@/services/commonService'


export default {
    async getData( action) {
        let resp = await api.getHttpRequest(action);
        return cs.requestResponse( resp);
    },
}
