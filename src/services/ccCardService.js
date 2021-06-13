import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    
    /* cc_card */
    async getCreditCards() {
        let resp = await api.getHttpRequest('/creditcards');
        return cs.requestResponse( resp);
    },

    // async getCcCardByCc_cardId( cc_card_id) {
    //     let resp = await api.getHttpRequest('/cc_card/'+cc_card_id+'cc_card');
    //     return cs.requestResponse( resp);
    // },

    async getCreditCardById( id) {
        let resp = await api.getHttpRequest('/creditcard/'+id);
        return cs.requestResponse( resp);
    },

    async postCcCard( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/creditcard', formData);
        return cs.requestResponse( resp);
    },
    
    /* cc_company */
    async getCcCompanies() {
        let resp = await api.getHttpRequest('/cccompanies');
        return cs.requestResponse( resp);
    },

    // async getCcCardByCc_cardId( cc_card_id) {
    //     let resp = await api.getHttpRequest('/cc_card/'+cc_card_id+'cc_card');
    //     return cs.requestResponse( resp);
    // },

    async getCcCompanyById( id) {
        let resp = await api.getHttpRequest('/cccompany/'+id);
        return cs.requestResponse( resp);
    },

    async postCcCompany( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/cccompany', formData);
        return cs.requestResponse( resp);
    },
}