import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vuetifyMoney from './plugins/vuetify';
import Vidle from 'v-idle'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  vuetifyMoney,
  Vidle,
  render: h => h(App)
}).$mount('#app');
