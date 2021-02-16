import Vue from 'vue'
import Router from 'vue-router'

// import auth from '@/middleware/auth';
import log from '@/middleware/log';

// import HomePage from '@/components/HomePage'
import Welcome from '@/components/Welcome'
import Login from '@/components/login/Login'
import AuthUser from '@/components/admin/AuthUser'
import CreditSummary from '@/components/clients/CreditSummary'
import ClientPersons from '@/components/clients/ClientPersons'
import ClientPersonDetail from '@/components/clients/ClientPersonDetail'
import ClientPersonForm from '@/components/clients/ClientPersonForm'
import CcAccount from '@/components/clients/CcAccount'
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
      name: 'home',
      meta: { middleware: log, },
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: { middleware: log, },
    },
    {
      path: '/logout',
      component: Login,
      name: 'logout'
    },
    {
      path: '/user',
      component: AuthUser,
      name: 'authuser'
    },
    {
      path: '/creditsummary',
      component: CreditSummary,
      name: 'creditsummary',
      meta: { middleware: log, },
    },
    {
      path: '/clients',
      component: ClientPersons,
      name: 'clients',
      meta: { middleware: log, },
      children: [
        {
          path: 'person/:id(\\d+)',
          component: ClientPersonDetail,
          name: 'persondetail',
          meta: { middleware: log, },
        },
        {
          path: 'person/edit/:id(\\d+)',
          component: ClientPersonForm,
          name: 'personform',
          meta: { middleware: log, },
        },
        {
          path: ':client_id(\\d+)/cc_account',
          component: CcAccount,
          name: 'clientccaccount',
          meta: { middleware: log, },
        },
      ]

    },
    {
      path: '/ccaccounts',
      component: CcAccount,
      name: 'ccaccounts',
      meta: { middleware: log, },
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
  ],
})
