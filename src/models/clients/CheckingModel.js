export default {
    checking() {
        return {
            id: null
            , client_id: null
            , xero_id: null
            , xero_main: null
            , client_code: null
            , client_code_additional: null
            , name_on_account: null
            , account_status: null
            , device: null
            , open_date: null
            , login: null
            , pwd: null
            , bank: null
            , routing: null
            , account: null
            , member_number: null
            , debit_card_name: null
            , debit_card_exp: null
            , debit_card_cvv: null
            , debit_card_pin: null
            , phone_pin: null
            , reconciled_on: null
            , zelle: null
            , wise: null
            , wise_device: null
            , checking_info: null
            , task: null
            , notes: null
            , recorded_on: null
        }
    },

    newChecking(clientId, xeroId, clientCode) {
        let checking = this.checking();
        checking.client_id = clientId;
        checking.xero_id = xeroId;
        checking.client_code = clientCode;
        return checking;
    }

}