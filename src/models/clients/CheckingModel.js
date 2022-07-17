export default {
    checking: {
        id: null
        , cbms_id: null
        , client_id: null
        , bank_name: null
        , routing_num: null
        , account_num: null
        , open_date: null
        , account_login: null
        , account_pwd: null
        , debit_card: null
        , debit_exp: null
        , debit_cvv: null
        , debit_pin: null
        , debit_info: null
        , account_status: null
        , reconciled_on: null
        , zelle: null
        , wise: null
        , paypal: null
        , is_significant: null
        , notes: null
        , task: null
        , checking_info: null
        , recorded_on: null
    },
    newChecking(clientId, cbmsId) {
        let checking = {
            id: null
            , cbms_id: cbmsId
            , client_id: clientId
            , bank_name: null
            , routing_num: null
            , account_num: null
            , open_date: null
            , account_login: null
            , account_pwd: null
            , debit_card: null
            , debit_exp: null
            , debit_cvv: null
            , debit_pin: null
            , debit_info: null
            , account_status: null
            , reconciled_on: null
            , zelle: null
            , wise: null
            , paypal: null
            , is_significant: null
            , notes: null
            , task: null
            , checking_info: null
            , recorded_on: null
            };
        return checking;
    }

}