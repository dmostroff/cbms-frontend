
export default {
    getFormData: ( data) => {
        let formData = new FormData();
        for( let idx in data) {
            formData.append( idx, data[idx]);
        }
        return formData;
    },
    
    requestResponse: ( response) => {
        let retval = { rc: 0, msg: 'No response', data: null}
        if( !response) {
            return retval
        }
        if( response && 'data' in response && 'rc' in response.data) {
            retval = response.data
        }
        return retval
    },

    formatDate( date) {
        return (date) ? date.toLocaleString().slice(0,9) : ''
    },

    formatDateTime( datetime) {
        return (datetime) ? datetime.toLocaleString() : ''
    }

}