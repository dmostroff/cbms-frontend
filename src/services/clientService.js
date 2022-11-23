import api from "@/services/apiService"
import cs from '@/services/commonService'

var clientSearch = ''

function JsonifyClientInfo( clientPersonData) {
    if('client_info' in clientPersonData && clientPersonData.client_info) {
        return JSON.parse(clientPersonData.client_info);
    }
    return {};
}

function transformClientPerson( resp) {
    let response = cs.requestResponse( resp);
    let clientPersonData = cs.getResponseDataIfSuccess( response);
    if( clientPersonData) {
        if('dob' in clientPersonData && clientPersonData.dob > '') {
            clientPersonData.dob = clientPersonData.dob.slice(0,10);
        }
        clientPersonData.client_info = JsonifyClientInfo(clientPersonData);
    }
    return response;
}

function adjustClientData( resp) {
    let response = cs.requestResponse( resp);
    let clientData = cs.getResponseDataIfSuccess( response);
    // console.log( 'adjustClientData', clientData);
    if( clientData && clientData.person) {
        clientData.person.client_info = JsonifyClientInfo(clientData.person);
        response.data = clientData;
    }
    return response;
}

export default {
    getClientSearch() { return clientSearch },
    setClientSearch( search ) { clientSearch = search; return clientSearch; },

    async getClientData( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id);
        return adjustClientData( resp);
    },

    async getClientCcHistory() {
        let resp = await api.getHttpRequest('client/client_cc_history');
        return cs.requestResponse( resp);
    },

    async getClientCcHistoryByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_cc_history');
        return cs.requestResponse( resp);
    },

    async getClientCcHistoryById( id) {
        let resp = await api.getHttpRequest('client/client_cc_history/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcHistory( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_cc_history', formData);
        return cs.requestResponse( resp);
    },
    
    async getCreditSummary() {
        let resp = await api.getHttpRequest('creditsummary');
        return cs.requestResponse( resp);
    },
    
    async getClientPersons() {
        let resp = await api.getHttpRequest('clients');
        return cs.requestResponse( resp);
    },

    async getClientPersonById( id) {
        let resp = await api.getHttpRequest('client/person/'+id);
        return transformClientPerson(resp);
//        return cs.requestResponse( resp);
    },

    async deleteClientPersonById( id) {
        let resp = await api.delHttpRequest('client/person/'+id);
        return cs.requestResponse( resp);
    },

    async postClientPerson( postData) {
        let resp = await api.postHttpRequest('client/person', postData);
        console.log( resp)
        let person = transformClientPerson(resp);
        console.log( person)
        return person
    },
    
    async getClientCreditlineHistory() {
        let resp = await api.getHttpRequest('client/credit_line_history');
        return cs.requestResponse( resp);
    },

    async getCreditlineHistoryByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'credit_line_history');
        return cs.requestResponse( resp);
    },

    async getCreditlineHistoryById( id) {
        let resp = await api.getHttpRequest('client/credit_line_history/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCreditlineHistory( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/credit_line_history', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientAddressByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/client_address');
        return cs.requestResponse( resp);
    },

    async getClientAddressById( id) {
        let resp = await api.getHttpRequest('client/address/'+id);
        return cs.requestResponse( resp);
    },

    async postClientAddress( postData) {
        let resp = await api.postHttpRequest('client/address/0', postData);
        return cs.requestResponse( resp);
    },

    async deleteClientAddressById( id) {
        let resp = await api.deleteHttpRequest('client/address/'+id);
        return cs.requestResponse( resp);
    },

    async getClientCcAccounts() {
        let resp = await api.getHttpRequest('/client/cc_account');
        return cs.requestResponse( resp);
    },

    async getClientCcAccountByClientId( client_id) {
        let resp = await api.getHttpRequest('/client/'+client_id+'/cc_account');
        return cs.requestResponse( resp);
    },

    async getCcAccountById( id) {
        let resp = await api.getHttpRequest('cc_account/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcAccount( postData) {
        let resp = await api.postHttpRequest('client/cc_account', postData);
        return cs.requestResponse( resp);
    },
    
    async getClientSetting() {
        let resp = await api.getHttpRequest('client/client_setting');
        return cs.requestResponse( resp);
    },

    async getClientSettingByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_setting');
        return cs.requestResponse( resp);
    },

    async getClientSettingById( id) {
        let resp = await api.getHttpRequest('client/client_setting/'+id);
        return cs.requestResponse( resp);
    },

    async postClientSetting( postData) {
        let resp = await api.postHttpRequest('client/client_setting', postData);
        return cs.requestResponse( resp);
    },
    
    async getBankAccounts() {
        let resp = await api.getHttpRequest('bankaccounts');
        return cs.requestResponse( resp);
    },

    async getClientBankAccountByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'/bankaccount');
        return cs.requestResponse( resp);
    },

    async getClientBankAccountById( id) {
        let resp = await api.getHttpRequest('client/bankaccount/'+id);
        return cs.requestResponse( resp);
    },

    async postClientBankAccount( id, postData) {
        let resp = await api.postHttpRequest('client/bankaccount/'+id, postData);
        return cs.requestResponse( resp);
    },
    
    async getClientNote() {
        let resp = await api.getHttpRequest('client/client_note');
        return cs.requestResponse( resp);
    },

    async getClientNoteByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_note');
        return cs.requestResponse( resp);
    },

    async getClientNoteById( id) {
        let resp = await api.getHttpRequest('client/client_note/'+id);
        return cs.requestResponse( resp);
    },

    async postClientNote( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_note', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientCcPoints() {
        let resp = await api.getHttpRequest('client/client_cc_points');
        return cs.requestResponse( resp);
    },

    async getClientCcPointsByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_cc_points');
        return cs.requestResponse( resp);
    },

    async getClientCcPointsById( id) {
        let resp = await api.getHttpRequest('client/client_cc_points/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcPoints( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_cc_points', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientCharges() {
        let resp = await api.getHttpRequest('client/client_charges');
        return cs.requestResponse( resp);
    },

    async getClientChargesByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_charges');
        return cs.requestResponse( resp);
    },

    async getClientChargesById( id) {
        let resp = await api.getHttpRequest('client/client_charges/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCharges( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_charges', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientCcBalanceTransfer() {
        let resp = await api.getHttpRequest('client/client_cc_balance_transfer');
        return cs.requestResponse( resp);
    },

    async getClientCcBalanceTransferByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_cc_balance_transfer');
        return cs.requestResponse( resp);
    },

    async getClientCcBalanceTransferById( id) {
        let resp = await api.getHttpRequest('client/client_cc_balance_transfer/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcBalanceTransfer( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_cc_balance_transfer', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientCcAction() {
        let resp = await api.getHttpRequest('client/client_cc_action');
        return cs.requestResponse( resp);
    },

    async getClientCcActionByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_cc_action');
        return cs.requestResponse( resp);
    },

    async getClientCcActionById( id) {
        let resp = await api.getHttpRequest('client/client_cc_action/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcAction( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_cc_action', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientSelfLender() {
        let resp = await api.getHttpRequest('client/client_self_lender');
        return cs.requestResponse( resp);
    },

    async getClientSelfLenderByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_self_lender');
        return cs.requestResponse( resp);
    },

    async getClientSelfLenderById( id) {
        let resp = await api.getHttpRequest('client/client_self_lender/'+id);
        return cs.requestResponse( resp);
    },

    async postClientSelfLender( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_self_lender', formData);
        return cs.requestResponse( resp);
    },
    
    async getClientCcTransaction() {
        let resp = await api.getHttpRequest('client/client_cc_transaction');
        return cs.requestResponse( resp);
    },

    async getClientCcTransactionByClientId( client_id) {
        let resp = await api.getHttpRequest('client/'+client_id+'client_cc_transaction');
        return cs.requestResponse( resp);
    },

    async getClientCcTransactionById( id) {
        let resp = await api.getHttpRequest('client/client_cc_transaction/'+id);
        return cs.requestResponse( resp);
    },

    async postClientCcTransaction( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('client/client_cc_transaction', formData);
        return cs.requestResponse( resp);
    },
    
}