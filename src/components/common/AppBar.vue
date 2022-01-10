<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="toggleLeftNav"></v-app-bar-nav-icon>
    <v-list-item>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/creditcard.png"
        transition="scale-transition"
        width="40"
      />
      Credit Building Management System
      </v-list-item>
    <v-spacer class="primary" >
    </v-spacer>
    <v-list-item v-if="isLoggedIn" class="mx-2">Welcome {{ userName }}</v-list-item>
    <v-list-item v-if="isLoggedIn"
      :to="{ name: 'logout' }"
      class="text-right"
      ><v-icon>mdi-logout</v-icon>
        Logout
      </v-list-item>
      <v-list-item class="caption">{{ title }} {{ appversion }}</v-list-item>
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
      title: process.env.VUE_APP_TITLE,
      appversion: process.env.VUE_APP_VERSION
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
