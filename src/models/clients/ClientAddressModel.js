export default {
    clientAddress() {
        return {
            id: null,
            client_id: null,
            client_code: null,
            street_address: null,
            city: null,
            state: null,
            zip: null,
            is_current: null,
            recorded_on: null
        }
    },
    newClientAddress(clientPerson) {
        let clientAddress = this.clientAddress();
        clientAddress.id = 0;
        clientAddress.client_id = clientPerson.client_id;
        clientAddress.client_code = clientPerson.client_code;
        clientAddress.recorded_on = new Date();
        return clientAddress;
    }

}
