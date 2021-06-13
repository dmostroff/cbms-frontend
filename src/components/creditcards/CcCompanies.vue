<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="msg" xs12>{{ msg }}</div>
    <div v-else>
    <v-data-table
      title="Banks/Companies"
      :items="companies"
      :headers="headers"
    ></v-data-table>
    </div>
    <!-- <v-dialog v-model="dialogDetail">
      <CcCompanyDetail
        :ccCompanyId="ccCompanyId"
        @editClientPersonForm="editCcCompanyForm"
        @cancelCcCompanyDetail="cancelCcCompanyDetail"
      ></CcCompanyDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <CcCompanyForm
        :accCompany="ccCompany"
        @cancelCcCompanyForm="cancelCcCompanyForm"
        @saveForm="saveForm"
      ></CcCompanyForm>
    </v-dialog> -->
  </div>
</template>

<script>
import ccCardService from "@/services/ccCardService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CcCompanies",
  components: {
    BeatLoader,
  },
  props: {
    companies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      msg: null,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      ccCompany: {},
      headers: [
      { id: 1, value: 'cc_company_id', text: 'Cc Company Id' }
      , { id: 2, value: 'company_name', text: 'Company Name' }
      , { id: 3, value: 'url', text: 'Url' }
      , { id: 4, value: 'contact', text: 'Contact' }
      , { id: 5, value: 'address_1', text: 'Address 1' }
      , { id: 6, value: 'address_2', text: 'Address 2' }
      , { id: 7, value: 'city', text: 'City' }
      , { id: 8, value: 'state', text: 'State' }
      , { id: 9, value: 'zip', text: 'Zip' }
      , { id: 10, value: 'country', text: 'Country' }
      , { id: 11, value: 'phone', text: 'Phone' }
      , { id: 12, value: 'phone_2', text: 'Phone 2' }
      , { id: 13, value: 'phone_cell', text: 'Phone Cell' }
      , { id: 14, value: 'phone_fax', text: 'Phone Fax' }
      , { id: 15, value: 'company_info', text: 'Company Info' }
      , { id: 16, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {
    this.getCcCompanies()
  },
  methods: {
    async getCcCompanies() {
        this.loading = true;
        this.response = await ccCardService.getCcCompanies();
        console.log( 'CcCards', this.response)
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>