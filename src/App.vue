<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <v-container fluid>
        <left-nav 
          title="Main Menu"
          ></left-nav>
        <router-view name="leftnav"></router-view>
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
import loginService from '@/services/loginService'
// import HomePage from '@/components/HomePage';
import LeftNav from '@/components/common/LeftNav'
import Footer from '@/components/common/Footer'
import AppBar from '@/components/common/AppBar.vue';

export default {
  name: 'App',

  components: {
    // HomePage,
    LeftNav,
    Footer,
    AppBar
  },

  data () {
    return {
      authenticated: false  
    }
  },
  methods: {
    // toggleLeftNav() {
    //   this.bLeftNav = !this.bLeftNav;
    //   }
  },
  mounted() {
    this.authenticated = loginService.isLoggedIn()
    if(!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
