<template>
  <v-card>
    <v-card-title>Admin Settings</v-card-title>
    <div v-if="loading">
      <BeatLoader></BeatLoader>
      </div>
    <p>{{currentPrefix}}</p>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab v-for="item in prefixes" :key="item.keyname">
          {{ item.keyvalue}}
        </v-tab>
      </v-tabs>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab-item v-for="item in prefixes" :key="item.keyname">
          <v-card>
            <AdmSettings :prefix="item.keyname"></AdmSettings>
          </v-card>
        </v-tab-item>
      </v-tabs>

    <v-navigation-drawer>
      <v-list-item v-for="setting in prefixSettings" :key="setting.id">
        <span @click="setPrefix(setting.keyname)">{{ setting.keyvalue }}</span>
      </v-list-item>
    </v-navigation-drawer>
    <AdmSettings :prefix="currentPrefix" :list="settings[currentPrefix]"></AdmSettings>
  </v-card>
</template>

<script>
import admService from "@/services/admService";
import BeatLoader from "@/components/common/Spinner";
import AdmSettings from '@/components/admin/AdmSettings'

export default {
  name: "AdmSettingHome",
  components: {
    BeatLoader,
    AdmSettings
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
      prefixSettings: [],
      admSettings: [],
      currentItem: null,
      currentPrefix: "",
    };
  },
  computed: {
    prefixes() {
      return this.admSettings.filter( (val) => val.prefix === '__prefix__')
    },
    settings() {
      let current = this.currentItem
      return this.admSettings.filter( (val) => val.prefix === current)
    }
  },
  mounted() {},
  created() {
    this.getAdmSettings();
  },
  methods: {
    async getPrefixSettings() {
      this.prefixSettings = await admService.getAdmSettingByPrefix(
        "__prefix__"
      );
    },
    async getAdmSettings() {
      this.loading = true;
      this.response = await admService.getAdmSettings()();
      console.log( this.response)
      if( 'data' in this.response && 'rc' in this.response) {
        if( this.response.rc == 1) {
            this.admSettings = this.response.data;
        }
      }
      this.loading = false;
    },
    setPrefix( prefix) {
        this.currentPrefix = prefix;
    },
  },
};
</script>

