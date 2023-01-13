export default {
    creditSummary() {
        return {
            client_id: null
            , client_code: null
            , client_name: null
            , cc_account_count: null
            , loan_count: null
            , checking_count: null
            , email: null
            , phone: null
            , min_open_date: null
            , total_credit_limit: null
            , credit_limit: null
        }
    },
    newCreditSummary( clientPerson) {
        let cs = this.creditSummary();
        cs.client_id = clientPerson.id;
        cs.client_code = clientPerson.client_code;
        return cs;
    }
}