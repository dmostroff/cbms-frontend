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
    newClientAddress(clientId, clientCode) {
        let clientAddress = this.clientAddress();
        clientAddress.client_id = clientId;
        clientAddress.client_code = clientCode;
        clientAddress.recorded_on = new Date();
        return clientAddress;
    }

}
