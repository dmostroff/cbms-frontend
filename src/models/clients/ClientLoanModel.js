export default {
    clientLoan: {
        id: null
        , client_id: null
        , xero_id: null
        , client_code: null
        , first_name: null
        , last_name: null
        , card_name: null
        , loan_status: null
        , device: null
        , open_date: null
        , login: null
        , pwd: null
        , loan_number: null
        , reconciled_on: null
        , credit_line: null
        , autopay_account: null
        , due_on: null
        , loan_type: null
        , maturity_on: null
        , loan_info: null
        , task: null
        , notes: null
        , recorded_on: null
    },
    newClientLoan( clientId, xeroId) {
        let clientLoan = {
            id: null
            , client_id: clientId
            , xero_id: xeroId
            , client_code: null
            , first_name: null
            , last_name: null
            , card_name: null
            , loan_status: null
            , device: null
            , open_date: null
            , login: null
            , pwd: null
            , loan_number: null
            , reconciled_on: null
            , credit_line: null
            , autopay_account: null
            , due_on: null
            , loan_type: null
            , maturity_on: null
            , loan_info: null
            , task: null
            , notes: null
            , recorded_on: null
            };
        return clientLoan;
    }

}