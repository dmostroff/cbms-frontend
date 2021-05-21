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
import ClientPersonDetail from '@/components/clients/ClientPersonDetail'
import ClientPersonForm from '@/components/clients/ClientPersonForm'
import ClientCcAccounts from '@/components/clients/ClientCcAccounts'
import ClientBankAccounts from '@/components/clients/ClientBankAccounts'
import ClientDocuments from '@/components/clients/ClientDocuments'
import CcAccount from '@/components/clients/CcAccount'
// import CreditCardsHome from '@/components/ccards/CcHome'

// Admin Panels
import AdminHome from '@/components/admin/AdminHome'
import AdminHomeLeftNav from '@/components/admin/AdminHomeLeftNav'
import AuthUsers from '@/components/admin/AuthUsers'
import AdmSettingHome from '@/components/admin/AdmSettingHome'
import CcCompanies from '@/components/ccards/CcCompanies'
import CcCards from '@/components/ccards/CcCards'

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
      children: [
        {
          path: 'creditsummary',
          component: {
            main: CreditSummary,
          },
          name: 'creditsummary',
          meta: { middleware: log, },
        },
        {
          path: 'client',
          default: ClientHome,
          components: {
            main: ClientPersons,
            leftnav: ClientLeftNav
          },
          name: 'client',
        }
      ]
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
      path: '/clientx',
      default: AdminHome,
      components: {
        main: ClientPersons,
        leftnav: ClientLeftNav
      },
      name: 'clientx',
      meta: { middleware: log, },
      children: [
        {
          path: 'person/:id(\\d+)',
          components: {
            default: ClientPersonDetail,
            leftnav: ClientLeftNav
          },
          name: 'clientDetail',
          meta: { middleware: log, },
        },
        {
          path: 'person/edit/:id(\\d+)',
          components: {
            default: ClientPersonForm,
            leftnav: ClientLeftNav
          },
          name: 'clientEdit',
          meta: { middleware: log, },
        },
        {
          path: ':id(\\d+)/cc_account',
          components: {
            default: ClientCcAccounts,
            leftnav: ClientLeftNav
          },
          name: 'clientCcAccounts',
          meta: { middleware: log, },
        },
        {
          path: ':id(\\d+)/bank_account',
          components: {
            default: ClientBankAccounts,
            leftnav: ClientLeftNav
          },
          name: 'clientBankAccounts',
          meta: { middleware: log, },
        },
        {
          path: ':client_id(\\d+)/documents',
          components: {
            default: ClientDocuments,
            leftnav: ClientLeftNav,
          },
          name: 'clientDocuments',
          meta: {middleware: log },

        }
      ]

    },
    {
      path: '/ccaccounts',
      component: CcAccount,
      name: 'ccaccounts',
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
