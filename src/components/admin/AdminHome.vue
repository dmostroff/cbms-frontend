<template>
  <v-container>
    <v-row align="center"><v-col>Wild World</v-col></v-row>
    <v-row>
        <v-col>
    <router-link :to="{ name: 'authUsers'}">Users</router-link>
        </v-col>
        <v-col>
    <router-link :to="{ name: 'AdmSettingHome'}">Settings</router-link>
        </v-col>
    </v-row>
    <v-row><v-col cols="12">
    <router-view name="subpage"></router-view>
    </v-col></v-row>
    <p>
    Rocket Man
    </p>
    <!-- <v-dialog v-model="dialogDetail">
      <AuthUserDetail
        :authUserId="authUserId"
        @editClientPersonForm="editAuthUserForm"
        @cancelAuthUserDetail="cancelAuthUserDetail"
      ></AuthUserDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <AuthUserForm
        :aauthUser="authUser"
        @cancelAuthUserForm="cancelAuthUserForm"
        @saveForm="saveForm"
      ></AuthUserForm>
    </v-dialog> -->
  </v-container>
</template>

<script>
// import userService from "@/services/userService";

export default {
  value: "AuthUser",
  components: {
  },
  props: [],
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      authUser: {},
      menuTitle: "Admin",
    };
  },
  computed: {},
  mounted() {},
  methods: {},
  created() {},
};
</script>
<style scoped>
</style>