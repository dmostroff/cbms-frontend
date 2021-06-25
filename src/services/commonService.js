
export default {
    getFormData: ( data) => {
        let formData = new FormData();
        for( let idx in data) {
            formData.append( idx, data[idx]);
        }
        return formData;
    },

    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj))
    },
   
    requestResponse: ( response) => {
        let retval = { rc: -9, msg: 'No response', data: null}
        if( !response) {
            return retval
        }
        if( response && 'data' in response && 'rc' in response.data) {
            retval = response.data
        }
        return retval
    },

    formatDate( date) {
        return (date) ? (new Date(Date.parse(date))).toLocaleString().slice(0,10).replace(',', '').trim() : ''
    },

    formatDateTime( datetime) {
        return (datetime) ? (new Date(Date.parse(datetime))).toLocaleString().replace( ',', '') : ''
    },
    formatCurrencyInput( amount) {
        if (!amount) { return '' }
        amount = (''+amount).replace( /[^\d\\.]/g, '')
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    formatCurrency( amount) {
        if( (!amount) || isNaN(amount)) { return ''}
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    formatPhone( phone) {
        if (!phone) { return '' }
        let retval = phone.replace( /[^\d]/g, '').replace(/^1/, '')
        retval = retval.split('').map( (x,idx) => ( 0 == idx%3 && idx > 0 && idx < 7) ? '-'+x : x).join('').slice(0,12)
        return ((phone.match(/^1/)) ? '1-' : '') + retval
    },
    formatSSN( ssn) {
        if (!ssn) { return '' }
        ssn = ssn.replace( /[^\d]/g, '')
        return ssn.split('').map( (x,idx) => ( 3 == idx || 5 == idx) ? '-'+x : x).join('').slice(0,11)
        // const rp = /(\d{3})(\d{2})(\d{4})/g;
        // return ssn.replace(/[^\d]/g, '').replace(rp, '$1-$2-$3');
    },
    formatZip( zip) {
        if( !zip) { return '' }
        let retzip = zip.replace(/[^\d]/g, '')
        return retzip.split('').map( (x,idx) => ( 5 == idx) ? '-'+x : x).join('').slice(0,10).replace(/-$/, '')
    },
    formatAddress( item) {
        const address = [ item.address_1, item.address_2, item.city, (item.state) ? ', '+item.state : '', item.zip].join(' ').replace('  ', ' ')
         return address.replace(' ,', ',')
    }

}