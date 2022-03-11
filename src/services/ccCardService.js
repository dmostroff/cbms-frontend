import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    
    /* cc_card */
    async getCreditCards() {
        let resp = await api.getHttpRequest('creditcards');
        console.log( resp)
        return cs.requestResponse( resp);
    },

    // async getCcCardByCc_cardId( cc_card_id) {
    //     let resp = await api.getHttpRequest('/cc_card/'+cc_card_id+'cc_card');
    //     return cs.requestResponse( resp);
    // },

    async getCreditCardById( id) {
        let resp = await api.getHttpRequest('creditcard/'+id);
        return cs.requestResponse( resp);
    },

    async postCcCard( postData) {
        let resp = await api.postHttpRequest('creditcard', postData);
        return cs.requestResponse( resp);
    },
    
    /* cc_company */
    async getCcCompanies() {
        let resp = await api.getHttpRequest('cc/companies');
        let resp1 = cs.requestResponse( resp);
        if( Array.isArray(resp1.data)) {
            resp1.data =  resp1.data.sort((a,b)=> {
                if(a.company_name > b.company_name) return 1;
                if( a.company_name < b.company_name) return -1;
                return 0;
            });
        }
        return resp1;
    },

    // async getCcCardByCc_cardId( cc_card_id) {
    //     let resp = await api.getHttpRequest('/cc_card/'+cc_card_id+'cc_card');
    //     return cs.requestResponse( resp);
    // },

    async getCcCompanyById( id) {
        let resp = await api.getHttpRequest('cc/company/'+id);
        return cs.requestResponse( resp);
    },

    async postCcCompany( postData) {
        let resp = await api.postHttpRequest('cc/company', postData);
        return cs.requestResponse( resp);
    },

    /* cc_card accounts */
    async getCcAccounts() {
        let resp = await api.getHttpRequest('cc/accounts');
        console.log( resp)
        return cs.requestResponse( resp);
    },
}