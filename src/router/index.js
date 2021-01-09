import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '@/components/HomePage'
import Welcome from '@/components/Welcome'
import Login from '@/components/login/Login'
import ClientPerson from '@/components/clients/ClientPerson'
// import ClientPersonDetail from '@/components/clients/ClientPersonDetail'
import CreditCardsHome from '@/components/ccards/CcHome'
import CcCompanies from '@/components/ccards/CcCompanies'
import CcCards from '@/components/ccards/CcCards'

import About from '@/components/About.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Welcome,
      name: 'home'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/logout',
      component: Login,
      name: 'logout'
    },
    {
      path: '/client',
      component: ClientPerson,
      name: 'client'
    },
    {
      path: '/cc',
      component: CreditCardsHome,
      name: 'cc',
      children: [
        {
          path: 'companies',
          component: CcCompanies,
          name: 'cc-companies'
        },
        {
          path: 'cards',
          component: CcCards,
          name: 'cc-cards',
        },
      ]
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    {
      path: '*',
      component: NotFoundComponent,
      name: 'notfound'
    }
  ]
})
