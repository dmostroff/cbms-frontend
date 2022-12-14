import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VuetifyMoney from 'vuetify-money';
import Vidle from 'v-idle'

Vue.use(Vuetify, VuetifyMoney, Vidle);

const opts = {
    theme: {light: true},
    icons: { iconfont: 'mdi'}
}

export default new Vuetify(opts);
