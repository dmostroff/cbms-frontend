import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getCcAccounts() {
        let resp = await api.getHttpRequest('ccaccounts');
        return cs.requestResponse( resp);
    },

    async getCcAccountByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/cc_account');
        return cs.requestResponse( resp);
    },

    async getCcAccountById( id) {
        let resp = await api.getHttpRequest('cc_account/'+id);
        return cs.requestResponse( resp);
    },

    async postCcAccount( postData) {
        // let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('cc_account', postData);
        return cs.requestResponse( resp);
    },

    async getCcAccountPromos() {
        let resp = await api.getHttpRequest('cc_account/promo');
        return cs.requestResponse( resp);
    },

    async getCcAccountPromoByCcAccountId( cc_account_id) {
        let resp = await api.getHttpRequest('cc_account/'+cc_account_id+'/promo');
        return cs.requestResponse( resp);
    },

    async getCcAccountPromoById( id) {
        let resp = await api.getHttpRequest('cc_account/promo/'+id);
        return cs.requestResponse( resp);
    },

    async postCcAccountPromo( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('cc_account/promo/', formData);
        return cs.requestResponse( resp);
    },
}