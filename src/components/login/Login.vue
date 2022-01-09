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
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <div v-show="invalidLogin" class="ml-4 red--text lighten-1">
                    Username and/or password not found.
                  </div>
                  <div v-show="noResponse" class="ml-4 red--text lighten-1">
                    The system is not responding. Please contact the system
                    administrator.
                  </div>
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
import loginService from "@/services/loginService";

export default {
  name: "Login",
  components: {},
  props: [],
  data() {
    return {
      loginRes: null,
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
      noResponse: false,
    };
  },
  computed: {},
  mounted() {
    this.username = localStorage.username || "";
    loginService.clear();
    this.$root.$emit("logout");
  },
  methods: {
    async submitForm() {
      this.invalidLogin = this.noResponse = false;
      if (this.$refs.form.validate()) {
        this.loginRes = await loginService.login(this.username, this.password);
        if ("rc" in this.loginRes) {
          if (-9 === this.loginRes["rc"]) {
            this.noResponse = true;
          } else if (1 === this.loginRes["rc"]) {
            this.$root.$emit("login");
            this.$router.push({ name: userService.defaultPage() });
          } else {
            this.invalidLogin = true;
          }
        } else {
          this.noReponse = true;
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>