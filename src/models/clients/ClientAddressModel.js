export default {
    clientAddress() {
        let address = {
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
        return address;
    },
    newClientAddress(clientId) {
        let clientAddress = {
            id: null,
            client_id: clientId,
            client_code: null,
            street_address: null,
            city: null,
            state: null,
            zip: null,
            is_current: null,
            recorded_on: null
        };
        return clientAddress;
    }

}
