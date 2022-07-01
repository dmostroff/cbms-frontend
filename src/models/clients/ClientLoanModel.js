export default {
    clientLoan: {
        id: null,
        cbms_id: null,
        client_id: null,
        loan_num: null,
        open_date: null,
        loan_from: null,
        loan_amount: 0.00,
        loan_login: null,
        loan_pwd: null,
        loan_status: null,
        reconciled_on: null,
        charged_on: null,
        loan_info: null,
        recorded_on: null
    },
    newClientLoan( clientId, cbmsId) {
        let clientLoan = {
            id: null,
            cbms_id: cbmsId,
            client_id: clientId,
            loan_num: null,
            open_date: null,
            loan_from: null,
            loan_amount: 0.00,
            loan_login: null,
            loan_pwd: null,
            loan_status: null,
            reconciled_on: null,
            charged_on: null,
            loan_info: null,
            recorded_on: null
            };
        return clientLoan;
    }

}