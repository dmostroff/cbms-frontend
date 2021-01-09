import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const opts = {
    theme: {light: true},
    icons: { iconfont: 'mdi'}
}

export default new Vuetify(opts);
