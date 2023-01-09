<template>
  <v-card>
    <v-card-title>
      <v-alert dense outlined type="error">There has been a Network Error.</v-alert>
    </v-card-title>
    <v-card-text>
      <p>Please check your internet connection. The backend site is not available.</p>
      <v-row v-if="isPing">
        <v-col cols="2">{{ pingResponse.rc }}</v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">{{ pingResponse.msg }}</v-col>
        <v-spacer></v-spacer>
      </v-row><v-row>
        <v-col cols="12">{{ pingResponse.data }}</v-col>
      </v-row>
      <v-row>
        <v-alert dense type="info">{{ baseUrl }}</v-alert>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="mx-2" @click="ping">Test Backend</v-btn>
      <v-spacer></v-spacer>
      <div class="subtitle-2 mx-2">Fixed?</div>
      <v-btn class="mx-2" @click="gotologin">Login Again</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Router from "@/router"
import apiService from '@/services/apiService';
import misc from "@/services/miscService";


export default {
  name: 'NetworkError',
  components: {},
  props: [],
  data() {
    return {
      isPing: false,
      baseUrl: "",
      pingResponse: {},
    }
  },
  computed: {},
  mounted() {
    this.baseUrl = apiService.getBaseUrl();
  },
  methods: {
    gotologin() {
      Router.push({ name: "login" });
    },
    async ping() {
      this.pingResponse = await misc.getData("ping");
      this.isPing = true;
    },
  }
}
</script>

