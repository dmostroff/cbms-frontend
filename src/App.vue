<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col>
            <left-nav title="Main Menu"></left-nav>
            <router-view class="main-router-view"></router-view>
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
    if ((!this.authenticated) && this.$router.history.current.name !== 'login') {
      this.$router.replace({ name: "login" });
    }
  },
};
</script>
<style scoped>
.main-router-view {
  color: blue;
  border: 3px, blue, solid;
  background-color: honeydew;
}
</style>
