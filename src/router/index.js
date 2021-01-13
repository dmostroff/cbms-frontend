import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '@/components/HomePage'
import Welcome from '@/components/Welcome'
import Login from '@/components/login/Login'
import ClientPersons from '@/components/clients/ClientPersons'
import ClientPersonDetail from '@/components/clients/ClientPersonDetail'
import ClientPersonForm from '@/components/clients/ClientPersonForm'
import CreditCardsHome from '@/components/ccards/CcHome'
import CcCompanies from '@/components/ccards/CcCompanies'
import CcCards from '@/components/ccards/CcCards'

import About from '@/components/About.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'
// import { component } from 'vue/types/umd'

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
      path: '/clients',
      component: ClientPersons,
      name: 'clients',
      children: [
        {
          path: 'person/:id(\\d+)',
          component: ClientPersonDetail,
          name: 'persondetail'
        },
        {
          path: 'person/edit/:id(\\d+)',
          component: ClientPersonForm,
          name: 'personform'
        },
      ]

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
