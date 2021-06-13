<template>
  <div>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <div>{{myprefix}} {{prefix}}</div>
    <v-data-table
      title="Adm Setting"
      :items="settings"
      :headers="headers"
    ></v-data-table>
    <!-- <v-dialog v-model="dialogDetail">
      <AdmSettingDetail
        :admSettingId="admSettingId"
        @editClientPersonForm="editAdmSettingForm"
        @cancelAdmSettingDetail="cancelAdmSettingDetail"
      ></AdmSettingDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <AdmSettingForm
        :aadmSetting="admSetting"
        @cancelAdmSettingForm="cancelAdmSettingForm"
        @saveForm="saveForm"
      ></AdmSettingForm>
    </v-dialog> -->
  </div>
</template>

<script>
export default {
  name: "AdmSettings",
  components: {
  },
  props: {
    myprefix: String,
    settings: Array,
  },
  data() {
    return {
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      admSetting: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'prefix', text: 'Prefix' }
      , { id: 3, value: 'keyname', text: 'Keyname' }
      , { id: 4, value: 'keyvalue', text: 'Keyvalue' }
      , { id: 5, value: 'display_rank', text: 'Display Rank' }
      
      ],
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