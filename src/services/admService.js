import api from "@/services/apiService"
import cs from '@/services/commonService'

var admSettings = [];
var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

export default {
    async getPingOs() {
        let resp = await api.getHttpRequest('pingos');
        return resp;
    },
    async getAdmSettings() {
        let resp = await api.getHttpRequest('adm/settings');
        let mydata = cs.requestResponse( resp);
        if( mydata.rc === 1)
            mydata.data.forEach(element => {
                if( element['keyvalue'] == null) {
                    element['keyvalue'] = element['keyname'];
                }
        });
        return mydata;
    },
    async getAdmSettingByPrefix( prefix) {
        let resp = await api.getHttpRequest('adm/setting/'+prefix);
        return cs.requestResponse( resp);
    },
    async postAdmSetting( admSetting) {
        let resp = await api.postHttpRequest('adm/setting', admSetting);
        return cs.requestResponse( resp);
    },
    async deleteAdmSetting( admSetting) {
        let resp = await api.deleteHttpRequest('adm/setting', admSetting);
        return cs.requestResponse( resp);
    },
    async getSettingsByPrefix( prefix) {
        if( admSettings.length === 0) {
            let resp = await this.getAdmSettings()
            if( 'rc' in resp && resp.rc == 1) {
                admSettings = resp.data
            }
        }
        return admSettings.filter((val) => val.prefix === prefix)
    },

    async getSettingsAsSelectByPrefix( prefix) {
        const prefixSettings = await this.getSettingsByPrefix(prefix)
        return prefixSettings.map( (item) => {
            return { text: item.keyvalue, value: item.keyname }
        })
    },
    getDescription( prefix, keyname) {
        let retval = keyname
        if(admSettings.length > 0) {
            const founditem = admSettings.filter((val) => val.prefix === prefix && val.keyname === keyname)
            retval = ( founditem.length > 0) ? founditem[0].keyvalue : keyname
        }
        return retval
    },
    getStatesSelect() {
        return Object.entries(states).map( item => { return { text: item[1], value: item[0] }})
    }

}
