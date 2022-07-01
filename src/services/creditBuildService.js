import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getCreditBuilds() {
        let resp = await api.getHttpRequest('client/creditbuild');
        return cs.requestResponse( resp);
    },

    async getCreditBuildByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/creditbuild');
        return cs.requestResponse( resp);
    },

    async getCreditBuildById( id) {
        let resp = await api.getHttpRequest('client/creditbuild/'+id);
        return cs.requestResponse( resp);
    },

    async postCreditBuild( postData) {
        // console.log( 'form postCreditBuild', postData);
        let resp = await api.postHttpRequest('client/creditbuild', postData);
        return cs.requestResponse( resp);
    },
}