import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getClientLoans() {
        let resp = await api.getHttpRequest('client/loans');
        return cs.requestResponse( resp);
    },

    async getClientLoanByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/loan');
        return cs.requestResponse( resp);
    },

    async getClientLoanById( id) {
        let resp = await api.getHttpRequest('client/loan/'+id);
        return cs.requestResponse( resp);
    },

    async postClientLoan( postData) {
        // console.log( 'form postClientLoan', postData);
        let resp = await api.postHttpRequest('client/loan', postData);
        return cs.requestResponse( resp);
    },
}