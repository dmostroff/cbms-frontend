<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Adm Setting
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            
            <span class="caption">Id</span>
            <span class="">{{admSetting.id }}</span>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="admSetting.prefix"
              label="Keyname"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="admSetting.keyname"
              label="Keyvalue"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="admSetting.keyvalue"
              label="Display Rank"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="admSetting.display_rank"
              label=""
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
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