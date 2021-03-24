
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
    },

    formatPhone( phone) {
        const rp = /(\d{3})(\d{3})(\d{4})/g;
        return phone.replace(/[^\d]/g, '').replace(rp, '$1-$2-$3');
    },
    formatSSN( ssn) {
        const rp = /(\d{3})(\d{2})(\d{4})/g;
        return ssn.replace(/[^\d]/g, '').replace(rp, '$1-$2-$3');
    },

}