
export default {
    getFormData: (data) => {
        let formData = new FormData();
        for (let idx in data) {
            formData.append(idx, data[idx]);
        }
        return formData;
    },

    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj))
    },

    upsert: (itemArray, newItem) => {
        let foundItem = itemArray.filter(item => item.id === newItem.id);
        if (foundItem && foundItem.length > 0) {
            foundItem[0] = JSON.parse(JSON.stringify(newItem));
        } else {
            itemArray.push(newItem);
        }
    },
    requestResponse: (response) => {
        let retval = { rc: -9, msg: 'No response', data: null }
        if (!response) {
            return retval
        }
        if (response && 'data' in response && 'rc' in response.data) {
            retval = response.data
        }
        return retval
    },

    getResponseDataIfSuccess: (response) => {
        return ('rc' in response && 'data' in response && 1 === response.rc) ?
            response.data : undefined;
    },

    emitSaveForm: (vm, response) => {
        if ("rc" in response && 0 < response.rc && "data" in response) {
            if(Array.isArray(response.data) && response.data.length > 0) {
                vm.$emit("saveForm", response.data[0]);
                return true;
            } else {
                vm.$emit("saveForm", response.data);
                return true;
            }
        }
        return false;
    },

    formatDate(date) {
        return (date) ? (new Date(Date.parse(date))).toLocaleString().slice(0, 10).replace(',', '').trim() : ''
    },

    formatDateTime(datetime) {
        return (datetime) ? (new Date(Date.parse(datetime))).toLocaleString().replace(',', '') : ''
    },
    numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatCurrencyInput(amount) {
        if (!(typeof amount === 'string' || amount instanceof String)) { return '' }
        amount = amount.replace(/[^\d\\.]/, '')
        let retval = '' + parseFloat(amount.replace(/^\$/, '').replace(/,/g, ''))
        retval = retval.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return '$' + retval;
    },
    formatCurrency(amount) {
        if ((!amount) || isNaN(amount)) { return '' }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    formatPhone(phone) {
        if (!phone) { return '' }
        let retval = phone.replace(/[^\d]/g, '').replace(/^1/, '')
        retval = retval.split('').map((x, idx) => (0 == idx % 3 && idx > 0 && idx < 7) ? '-' + x : x).join('').slice(0, 12)
        return ((phone.match(/^1/)) ? '1-' : '') + retval
    },
    formatSSN(ssn) {
        if (!ssn) { return '' }
        ssn = ssn.replace(/[^\d]/g, '')
        return ssn.split('').map((x, idx) => (3 == idx || 5 == idx) ? '-' + x : x).join('').slice(0, 11)
        // const rp = /(\d{3})(\d{2})(\d{4})/g;
        // return ssn.replace(/[^\d]/g, '').replace(rp, '$1-$2-$3');
    },
    formatZip(zip) {
        if (!zip) { return '' }
        let retzip = zip.replace(/[^\d]/g, '')
        return retzip.split('').map((x, idx) => (5 == idx) ? '-' + x : x).join('').slice(0, 10).replace(/-$/, '')
    },
    formatAddress(item) {
        const address = [item.address_1, item.address_2, item.city, (item.state) ? ', ' + item.state : '', item.zip].join(' ').replace('  ', ' ')
        return address.replace(' ,', ',')
    }

}