import Vue from 'vue'
import Router from 'vue-router'

// import auth from '@/middleware/auth';
import log from '@/middleware/log';

// import HomePage from '@/components/HomePage'
import HomePage from '@/components/HomePage'
import Login from '@/components/login/Login'
import CreditSummary from '@/components/clients/CreditSummary'
import CcAccountsHome from '@/components/ccaccounts/CcAccountsHome'
import ClientHome from '@/components/clients/ClientHome'
import ClientsTable from '@/components/clients/ClientsTable'
// import CreditCardsHome from '@/components/ccards/CcHome'

// Admin Panels
import AdminHome from '@/components/admin/AdminHome'
import AuthUsers from '@/components/admin/AuthUsers'

// CreditCards
import CcHome from '@/components/creditcards/CcHome'

import MiscHome from '@/components/common/MiscHome'
import AboutUs from '@/components/common/AboutUs.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'
// import { component } from 'vue/types/umd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
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
      path: '/users',
      component: AuthUsers,
      name: 'authusers'
    },
    {
      path: '/creditsummary',
      component: CreditSummary,
      name: 'creditsummary',
      meta: { middleware: log, },
    },
    {
      path: '/ccaccountshome',
      component: CcAccountsHome,
      name: 'ccaccountshome',
      meta: { middleware: log, },
    },
    {
      path: '/clients',
      component: ClientsTable,
      name: 'clients',
    },
    {
      path: '/client/:id(\\d+)',
      component: ClientHome,
      props: true,
      name: 'client',
      meta: { middleware: log, },
    },
    {
      path: '/cc',
      component: CcHome,
      name: 'cchome',
      meta: { middleware: log, },
    },
    {
      path: '/admin',
      component: AdminHome,
      name: 'adminhome',
    },
    {
      path: '/misc',
      component: MiscHome,
      name: 'mischome',
    },
    {
      path: '/aboutus',
      component: AboutUs,
      name: 'aboutus'
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundComponent,
      name: 'catchall'
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundComponent,
      name: 'notfound'
    }
  ],
})
