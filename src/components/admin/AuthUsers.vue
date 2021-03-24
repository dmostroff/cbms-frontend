<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="authUser.msg" xs12>\{ authUser.msg \}</div>
    <div v-else>
    <v-data-table
      title="Auth Users"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
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
    </v-dialog>
  </div>
</template>

<script>
import auth_userService from "@/services/authService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "AuthUsers",
  components: {
    BeatLoader,
  },
  props: [],
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      authUser: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'first_name', text: 'First Name' }
      , { id: 3, value: 'last_name', text: 'Last Name' }
      , { id: 4, value: 'email', text: 'Email' }
      , { id: 5, value: 'username', text: 'Username' }
      , { id: 6, value: 'password', text: 'Password' }
      , { id: 7, value: 'password_hint', text: 'Password Hint' }
      , { id: 8, value: 'is_superuser', text: 'Is Superuser' }
      , { id: 9, value: 'is_staff', text: 'Is Staff' }
      , { id: 10, value: 'is_active', text: 'Is Active' }
      , { id: 11, value: 'roles', text: 'Roles' }
      , { id: 12, value: 'created_at', text: 'Created At' }
      
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getAuthUser() {
        this.loading = true;
        this.response = await auth_userService.getAuthUser();
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>