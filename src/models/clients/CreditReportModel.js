export default {
    creditReport() {
        return {
            id: null
            , client_id: null
            , client_code: null
            , credit_bureau: null
            , login: null
            , pwd: null
            , pin: null
            , recorded_on: null
        };
    },
    newCreditReport(clientPerson) {
        let cr = this.creditReport();
        cr.id = 0;
        cr.client_id = clientPerson.client_id;
        cr.client_code = clientPerson.client_code;
        return cr;
    },
}