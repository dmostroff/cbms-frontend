<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="toggleLeftNav"></v-app-bar-nav-icon>
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
    <v-list-item v-if="isLoggedIn" class="mx-1">
      <v-btn color="primary" @click="goBack"><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
    </v-list-item>
    <v-spacer></v-spacer>
    <v-list-item v-if="isLoggedIn" class="mx-2">Welcome {{ userName }}</v-list-item>
    <v-list-item v-if="isLoggedIn"
      :to="{ name: 'logout' }"
      class="text-right purple red--text"
      ><v-icon>mdi-logout</v-icon>
        Logout
      </v-list-item>
    <v-toolbar-title>Credit Building Management System</v-toolbar-title>
  </v-app-bar>
</template>
<script>
import loginService from "@/services/loginService";

export default {
  name: "AppBar",
  components: {},
  props: [],
  data() {
    return {
      initLoggedIn: false,
    };
  },
  computed: {
    isLoggedIn: function () {
       return this.initLoggedIn || loginService.isLoggedIn();
    },
    userName: () => loginService.userName(),
  },
  mounted() {
    this.$root.$on("login", this.isLogin);    
    this.$root.$on("logout", this.isLogin);    
    if( !loginService.isLoggedIn()) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    toggleLeftNav() {
      this.$root.$emit("toggleLeftNav");
    },
    isLogin() {
      this.initLoggedIn = loginService.isLoggedIn()
    },
    goBack() {
      this.$router.back()
    }
  },
};
</script>
