import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getClientIsraels() {
        let resp = await api.getHttpRequest('client/israels');
        return cs.requestResponse( resp);
    },

    async getClientIsraelByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/israel');
        return cs.requestResponse( resp);
    },

    async getClientIsraelById( id) {
        let resp = await api.getHttpRequest('client/israel/'+id);
        return cs.requestResponse( resp);
    },

    async postClientIsrael( id, postData) {
        // console.log( 'form postClientIsrael', postData);
        let resp = await api.postHttpRequest('client/israel/'+id, postData);
        return cs.requestResponse( resp);
    },
}