<template>
  <v-container>
    <v-row>
      <v-col xs12>
        <v-tabs
          v-model="currentItem"
          background-color="primary"
        >
          <v-tab v-for="item in tabItems" :key="item.value">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <component :is="currentComponent"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import userService from "@/services/userService";
import AdmSettingHome from '@/components/admin/AdmSettingHome'
import AuthUsers from '@/components/admin/AuthUsers'
import AuthRoles from '@/components/admin/AuthRoles'

export default {
  value: "AdminHome",
  components: {
    AdmSettingHome,
    AuthUsers,
    AuthRoles,
  },
  props: [],
  data() {
    return {
      loading: false,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      authUser: {},
      menuTitle: "Admin",
      currentItem: 0,
      tabItems: [
        { text: "Roles", value: "authroles", component: AuthRoles },
        { text: "Users", value: "adminusers", component: AuthUsers },
        { text: "Settings", value: "admsettings", component: AdmSettingHome },
      ]
    };
  },
  computed: {
    currentComponent: function() {
      return this.tabItems[this.currentItem].component
    },
  },
  mounted() {},
  methods: {

  },
  created() {},
};
</script>
<style scoped>
</style>