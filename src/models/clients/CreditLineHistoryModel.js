export default {
    creditLineHistory() {
        return {
        id: null
        , client_id: null
        , client_code: null
        , card_id: null
        , xero_id: null
        , cl_date: null
        , amount: null
        , cl_status: null
        , notes: null
        , cl_info: null
        , recorded_on: null
        }
    },
    newCreditLineHistory( clientPerson) {
        let clh = this.creditLineHistory();
        clh.id = 0;
        clh.client_id = clientPerson.id;
        clh.client_code = clientPerson.client_code;
        return clh;
    }
}