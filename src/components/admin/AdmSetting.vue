<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="admSetting.msg" xs12>\{ admSetting.msg \}</div>
    <div v-else>
    <v-data-table
      title="Adm Setting"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
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
    </v-dialog>
  </div>
</template>

<script>
import admService from "@/services/admService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "AdmSetting",
  components: {
    BeatLoader,
  },
  props: {
    prefix: string
  },
  data() {
    return {
      loading: true,
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
  watch: { 
    prefix: function(newPrefix) {
      this.getAdmSettingByPrefix( newPrefix)
      },
  },  
  methods: {
    async getAdmSettingByPrefix( prefix) {
        this.loading = true;
        this.response = await admService.getAdmSettingByPrefix(this.prefix);
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>