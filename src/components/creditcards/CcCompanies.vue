<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="msg" xs12>{{ msg }}</div>
    <div v-else>
      <v-data-table
        caption="Credit Card Companies"
        :items="companies"
        :headers="headers"
      >
        <template v-slot:item.url="{ item }">
          <a @click="gotoUrl(item.url)">{{ item.url}}</a>
        </template>
        <!-- <template v-slot:item.address_1="{ item }">
          {{ formatAddress(item) }}
        </template> -->
        <template v-slot:item.recorded_on="{ item }">
          {{ formatDateTime(item.recorded_on) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="editDialog">
      <CcCompanyForm
        :ccCompany = "ccCompany"
        :companies = "companies"
        @cancelForm = "cancelForm"
        @saveForm = "saveForm"
      ></CcCompanyForm>
    </v-dialog>
  </div>
</template>

<script>
import commonService from '@/services/commonService'
import ccCardService from '@/services/ccCardService'
import BeatLoader from '@/components/common/Spinner'
import CcCompanyForm from '@/components/creditcards/CcCompanyForm'

export default {
  value: "CcCompanies",
  components: {
    BeatLoader,
    CcCompanyForm,
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
        data: [],
      },
      ccCompany: {},
      headers: [
        { id: 1, value: "id", text: "Id" }
        , { id: 2, value: "company_name", text: "Company Name" }
        , { id: 3, value: "url", text: "Url" }
        , { id: 4, value: "contact", text: "Contact" }
        // { id: 5, value: "address_1", text: "Address" },
        // , { id: 6, value: 'address_2', text: 'Address 2' }
        // , { id: 7, value: 'city', text: 'City' }
        // , { id: 8, value: 'state', text: 'State' }
        // , { id: 9, value: 'zip', text: 'Zip' }
        // { id: 10, value: "country", text: "Country" },
        , { id: 11, value: "phone", text: "Phone" }
        , { id: 12, value: "phone_2", text: "Phone 2" }
        , { id: 13, value: "phone_cell", text: "Phone Cell" }
        // { id: 14, value: "phone_fax", text: "Phone Fax" },
        // , { id: 15, value: 'company_info', text: 'Company Info' }
        // { id: 16, value: "recorded_on", text: "Recorded On" },
        , { id: 20, value: "actions", text: "Actions", sortable: false }
      ],
      editDialog: false,
    };
  },
  computed: {},
  mounted() {
    this.getCcCompanies();
  },
  methods: {
    async getCcCompanies() {
      this.loading = true;
      this.response = await ccCardService.getCcCompanies();
      this.res
      // console.log("CcCompanies", this.response);
      this.loading = false;
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    formatAddress(item) {
      return commonService.formatAddress(item);
    },
    gotoUrl(url) {
      window.open( url, "_blank");         
    },
    showItem(item) {
      this.ccCompany = item;
      this.editDialog = true;
    },
    async saveForm(newCcCompany) {
      this.$emit( 'saveItem', this.companies, newCcCompany);
      this.editDialog = false;
    },
    cancelForm(item) {
      // console.log("cancelForm", item);
      this.ccCompany = item;
      this.editDialog = false;
    },
    itemIndex( ccCompany) {
      let foundCompany = this.companies.filter( item => item.id === ccCompany.id);
      if( foundCompany && foundCompany.length > 0) {
        foundCompany[0] = commonService.clone(ccCompany);
      }
    }
  },
  created() {},
};
</script>
<style scoped>
</style>