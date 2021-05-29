import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VuetifyMoney from 'vuetify-money';

Vue.use(Vuetify, VuetifyMoney);

const opts = {
    theme: {light: true},
    icons: { iconfont: 'mdi'}
}

export default new Vuetify(opts);
