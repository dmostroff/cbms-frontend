export default  {
    clientIsrael() {
        return {
            id: null
            , client_id: null
            , client_code: null
            , bank: null
            , branch: null
            , account: null
            , iban: null
            , iban_name: null
            , address: null
            , city: null
            , zip: null
            , phone: null
            , notes: null
            , recorded_on: null
        }
    },
    newClientIsrael( clientPerson) {
        let clientIsrael = this.clientIsrael();
        clientIsrael.id = 0;
        clientIsrael.client_id = clientPerson.client_id;
        clientIsrael.client_code = clientPerson.client_code;
        return clientIsrael;
    }
}