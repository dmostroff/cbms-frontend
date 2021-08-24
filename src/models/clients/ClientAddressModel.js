export default {
    clientAddress: {
        id: null,
        client_id: null,
        address_type: 'CURRENT',
        address_1: null,
        address_2: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        valid_from: null,
        valid_to: null,
        recorded_on: null
    },
    newClientAddress() {
        let clientAddress = {
            id: null,
            client_id: null,
            address_type: 'CURRENT',
            address_1: null,
            address_2: null,
            city: null,
            state: null,
            zip: null,
            country: null,
            valid_from: null,
            valid_to: null,
            recorded_on: null
        };
        return clientAddress;
    }

}
