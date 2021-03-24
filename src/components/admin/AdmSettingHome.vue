<template>
  <v-card>
    <p>{{currentPrefix}}</p>
    <v-navigation-drawer>
      <v-list-item v-for="setting in prefixSettings" :key="setting.id">
        <span @click="setPrefix(setting.keyname)">{{ setting.keyvalue }}</span>
      </v-list-item>
    </v-navigation-drawer>
    <AdmSetting prefix="currentPrefix"></AdmSetting>
  </v-card>
</template>

<script>
import admService from "@/services/admService";
export default {
  name: "AdmSettingHome",
  components: {},
  props: [],
  data() {
    return {
      prefixSettings: [],
      admSettings: [],
      currentPrefix: "",
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.getPrefixSettings();
  },
  methods: {
    async getPrefixSettings() {
      this.prefixSettings = await admService.getAdmSettingByPrefix(
        "__prefix__"
      );
    },
    setPrefix( prefix) {
        this.currentPrefix = prefix;
    },
  },
};
</script>

