<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/assets/genericcreditcard.jpg"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-title>Credit Building Management System</v-toolbar-title>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-navigation-drawer permanent>
          <router-view name="leftnav"></router-view>
        </v-navigation-drawer>
        <router-view></router-view>
      </v-container>
    </v-main>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <Footer></Footer>
  </v-footer>
  </v-app>
</template>

<script>
// import HomePage from '@/components/HomePage';
import Footer from '@/components/common/Footer'

export default {
  name: 'App',

  components: {
    // HomePage,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
