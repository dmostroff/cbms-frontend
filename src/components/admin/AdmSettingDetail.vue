<template>
  <v-card>
    <v-card-header :md-elevation="2">
      Adm Setting
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Id</span>:</v-col>
          <v-col>
            {{admSetting.id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Prefix</span>:</v-col>
          <v-col>
            {{admSetting.prefix}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Keyname</span>:</v-col>
          <v-col>
            {{admSetting.keyname}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Keyvalue</span>:</v-col>
          <v-col>
            {{admSetting.keyvalue}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Display Rank</span>:</v-col>
          <v-col>
            {{admSetting.display_rank}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  value: "AdmSetting",
  components: {
  },
  props: {
    admSetting: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editAdmSettingForm" )
    },
    cancelForm() {
      this.$emit( "cancelAdmSettingForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>