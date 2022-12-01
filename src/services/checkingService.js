import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getCheckings() {
        let resp = await api.getHttpRequest('client/checkings');
        return cs.requestResponse( resp);
    },

    async getCheckingByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/checking');
        return cs.requestResponse( resp);
    },

    async getCheckingById( id) {
        let resp = await api.getHttpRequest('client/checking/'+id);
        return cs.requestResponse( resp);
    },

    async postChecking( postData) {
        // console.log( 'form postChecking', postData);
        let id = (postData['id']) ? postData.id : 0;
        let resp = await api.postHttpRequest('client/checking/'+id, postData);
        return cs.requestResponse( resp);
    },
}