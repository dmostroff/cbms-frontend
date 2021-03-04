<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 blue darken-1">
          <v-toolbar-title class="white--text pb-3"
            ><h4>Login</h4></v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  class="mx-8"
                  label="Enter your username"
                  v-model="username"
                  :rules="usernameRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-if="false"
                  class="mx-8"
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  class="mx-8"
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <div v-show="invalidLogin" class="ml-4 red--text lighten-1"
                    >Username and/or password not found.</div>
                </v-layout>
                <v-layout justify-space-between>
                  <v-btn
                    @click="submitForm"
                    class="ml-4 my-4 blue darken-4 white--text"
                    :disabled="!valid"
                    >Login</v-btn
                  >
                  <a href="" v-show="false">Forgot Password</a>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: "Login",
  components: {},
  props: [],
  data() {
    return {
      valid: false,
      e1: true,
      username: "",
      usernameRules: [(v) => (v.length > 2 && !!v) || "Username is required"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      invalidLogin: false,
    };
  },
  computed: {},
  mounted() {
    this.username = localStorage.username || "";
    localStorage.removeItem("username");
    localStorage.removeItem("lastlogin");
    this.$root.$emit("logout");
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        userService
          .postLogin({ username: this.username, password: this.password })
          .then((res) => {
            if (res && res.data) {
              if (res.data["rc"] === 1) {
                this.invalidLogin = false;
                localStorage.username = res.data["username"];
                localStorage["lastlogin"] = res.data["lastlogin"];
                this.$root.$emit("login");
                this.$router.push( { name: userService.defaultPage() });
              } else {
                this.invalidLogin = true;
              }
            }
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>