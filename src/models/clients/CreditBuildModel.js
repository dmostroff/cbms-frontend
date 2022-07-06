export default {
    CreditBuild: {
        id: null
        , client_id: null
        , client_name: null
        , bank_name: null
        , account_login: null
        , account_pwd: null
        , start_date: null
        , end_date: null
        , bank_account: null
        , payment_date: null
        , reconciled_on: null
        , applied_on: null
        , notes: null
        , task: null
        , credit_info: null
        , recorded_on: null
    },
    newCreditBuild(clientId) {
        let creditBuild = {
            id: null
            , client_id: clientId
            , client_name: null
            , bank_name: null
            , account_login: null
            , account_pwd: null
            , start_date: null
            , end_date: null
            , bank_account: null
            , payment_date: null
            , reconciled_on: null
            , applied_on: null
            , notes: null
            , task: null
            , credit_info: null
            , recorded_on: null
        };
        return creditBuild;
    }
}