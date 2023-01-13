export default {
    clientLoan() {
        return {
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
        }
    },
    newClientLoan(xeroId, clientPerson) {
        let myClientLoan = this.clientLoan();
        myClientLoan.id = 0;
        myClientLoan.xero_id = xeroId;
        myClientLoan.client_id = clientPerson.id;
        myClientLoan.client_code = clientPerson.client_code;
        myClientLoan.first_name = clientPerson.first_name;
        myClientLoan.last_name = clientPerson.last_name;
        return myClientLoan;
    }

}