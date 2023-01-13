import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getCreditReports() {
        let resp = await api.getHttpRequest('client/creditreports');
        return cs.requestResponse( resp);
    },

    async getCreditReportByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/creditreport');
        return cs.requestResponse( resp);
    },

    async getCreditReportById( id) {
        let resp = await api.getHttpRequest('client/creditreport/'+id);
        return cs.requestResponse( resp);
    },

    async postCreditReport( postData) {
        let resp = await api.postHttpRequest('client/creditreport/0', postData);
        return cs.requestResponse( resp);
    },
}