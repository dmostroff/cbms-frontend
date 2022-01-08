import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    async getCcAccounts() {
        let resp = await api.getHttpRequest('cc/accounts');
        return cs.requestResponse( resp);
    },

    async getCcAccountByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/ccaccount');
        return cs.requestResponse( resp);
    },

    async getCcAccountById( id) {
        let resp = await api.getHttpRequest('cc/account/'+id);
        return cs.requestResponse( resp);
    },

    async postCcAccount( postData) {
        // console.log( 'form postCcAccount', postData);
        let resp = await api.postHttpRequest('cc/account', postData);
        return cs.requestResponse( resp);
    },

    async getCcAccountPromos() {
        let resp = await api.getHttpRequest('cc/account/promo');
        return cs.requestResponse( resp);
    },

    async getCcAccountPromoByCcAccountId( cc_account_id) {
        let resp = await api.getHttpRequest('cc/account/'+cc_account_id+'/promo');
        return cs.requestResponse( resp);
    },

    async getCcAccountPromoById( id) {
        let resp = await api.getHttpRequest('cc/account/promo/'+id);
        return cs.requestResponse( resp);
    },

    async postCcAccountPromo( postData) {
        let resp = await api.postHttpRequest('cc/account/promo/', postData);
        return cs.requestResponse( resp);
    },

    async getBanks() {
        let resp = await api.getHttpRequest('banks');
        let response = cs.requestResponse( resp);
        if( 'rc' in response && response.rc === 1 && 'data' in response) {
            return Object.keys( response.data.bank_name).map( k => response.data.bank_name[k])
        }
    },
}