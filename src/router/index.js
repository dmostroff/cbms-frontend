import Vue from 'vue'
import Router from 'vue-router'

// import auth from '@/middleware/auth';
import log from '@/middleware/log';

// import HomePage from '@/components/HomePage'
import HomePage from '@/components/HomePage'
import Login from '@/components/login/Login'
import CreditSummary from '@/components/clients/CreditSummary'
import ClientHome from '@/components/clients/ClientHome'
import ClientPersons from '@/components/clients/ClientPersons'
import ClientLeftNav from '@/components/clients/ClientLeftNav'
// import CreditCardsHome from '@/components/ccards/CcHome'

// Admin Panels
import AdminHome from '@/components/admin/AdminHome'
import AdminHomeLeftNav from '@/components/admin/AdminHomeLeftNav'
import AuthUsers from '@/components/admin/AuthUsers'
import AdmSettingHome from '@/components/admin/AdmSettingHome'

// CreditCards
import CcCompanies from '@/components/creditcards/CcCompanies'
import CcCards from '@/components/creditcards/CcCards'
import CcHome from '@/components/creditcards/CcHome'

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
      // children: [
      //   {
      //     path: '/creditsummary',
      //     components: {
      //       main: CreditSummary,
      //       leftnav: ClientLeftNav
      //     },
      //     name: 'creditsummaryX',
      //     meta: { middleware: log, },
      //   },
      // ]
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
      path: 'clients',
      components: {
        main: ClientPersons,
        leftnav: ClientLeftNav
      },
      name: 'clients',
    },
    {
      path: '/client/:id(\\d+)',
      components:
      {
        default: ClientHome,
        leftnav: ClientLeftNav
      },
      props: true,
      name: 'client',
      meta: { middleware: log, },
    },
    {
      path: '/cc',
      components:
      {
        default: CcHome,
        leftnav: AdminHomeLeftNav
      },
      name: 'cchome',
      meta: { middleware: log, },
    },
    {
      path: '/admin',
      components:
      {
        default: AdminHome,
        leftnav: AdminHomeLeftNav
      },
      name: 'adminhome',
      children: [
        {
          path: 'users',
          component: {
            subpage: AuthUsers,
          },
          name: 'authUsers',
          meta: { middleware: log, },
        },
        {
          path: 'admsettings',
          component: {
            subpage: AdmSettingHome,
          },
          name: 'AdmSettingHome',
        },
        {
          path: 'companies',
          component: {
            subpage: CcCompanies,
          },
          name: 'ccCompanies'
        },
        {
          path: 'cards',
          component: {
            subpage: CcCards,
          },
          name: 'ccCards',
        },
      ]
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
      path: '*',
      component: NotFoundComponent,
      name: 'notfound'
    }
  ],
})
