<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" xs12>
            <left-nav title="Main Menu"></left-nav>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            <router-view name="leftnav"></router-view>
          </v-col>
          <v-col cols="11">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<script>
import loginService from "@/services/loginService";

import AppBar from "@/components/common/AppBar.vue";
import LeftNav from "@/components/common/LeftNav";
import Footer from "@/components/common/Footer";

export default {
  name: "App",

  components: {
    LeftNav,
    Footer,
    AppBar,
  },

  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    // toggleLeftNav() {
    //   this.bLeftNav = !this.bLeftNav;
    //   }
  },
  mounted() {
    this.authenticated = loginService.isLoggedIn();
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
};
</script>
