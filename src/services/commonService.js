// import { format, parseISO, isValid, differenceInYears } from 'date-fns'
const datefns = require( 'date-fns')

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

    upsert: (itemArray, newItem, idcol = 'id') => {
        let itemidx = -1;
        itemArray.forEach((item, idx) => {
            if (item[idcol] === newItem[idcol]) {
                itemidx = idx;
            }
        });
        if (itemidx > -1) {
            itemArray[itemidx] = newItem;
        } else {
            itemArray.push(newItem);
        }
        console.log('upsert', itemidx, itemArray);
    },
    requestResponse: (response) => {
        let retval = { rc: -9, msg: 'No response', data: null }
        if (!response) {
            return retval
        }
        if ('data' in response && 'rc' in response.data) {
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
            if (Array.isArray(response.data) && response.data.length > 0) {
                vm.$emit("saveForm", response.data[0]);
                return true;
            } else {
                console.log(response.data);
                vm.$emit("saveForm", response.data);
                return true;
            }
        }
        return false;
    },

    formatDate(date) {
        return (date) ? datefns.format(datefns.parseISO(date), 'M/d/yyyy') : ''
    },

    formatDateTime(datetime) {
        return (datefns.isValid(datetime)) ? datefns.format(datefns.parseISO(datetime), 'M/d/yyyy HH:mm') : ''
    },
    getAge(date) {
        let d = datefns.parseISO(date)
        return datefns.isValid(d) ? datefns.differenceInYears(datefns.endOfToday(), d) : '';
    },
    numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatCurrencyInput(amount) {
        if (!(typeof amount === 'string' || amount instanceof String)) { return ''; }
        amount = amount.replace(/[^\d\\.]/, '')
        if (amount === '') { return amount; }
        let retval = '' + datefns.parseFloat(amount.replace(/^\$/, '').replace(/,/g, ''))
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
    },
    /* valid functions */
    isValidZip(zip) {
        if (!zip) { return false; }
        return ((zip.match(/\d{5}/) != null) || (zip.match(/\d{5}-\d{4}/) != null));
    },
    // JSON manipulation functions
    getJsonData(parent, childKey, defaultData=null) {
        return parent && childKey in parent ? parent[childKey] : defaultData;
    },
    setJsonData(parent, parentKey, childKey, data) {
        if (!(parent && parent[parentKey])) { parent[parentKey] = {}; }
        parent[parentKey][childKey] = data;

    }


}