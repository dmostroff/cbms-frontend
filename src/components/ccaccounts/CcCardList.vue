<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-list
            :dense="true"
            dark
            class="green accent-5 overflow-y-auto"
            max-height="400"
          >
            <v-list-item
              v-for="(item, index) in companies"
              :key="item.id"
              @click="setCompany(index)"
              :class="{ secondary: item.value === currentCompany.value }"
             >
              {{ item.text }}
          {{item.value === (currentCompany) ? currentCompany.value : ''}}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="9">
          <v-data-table
            title="Cc Card"
            :caption="companyName"
            :items="cardsByCompany"
            :headers="headers"
          >
            <template v-slot:item.first_year_free="{ item }">
              <v-switch
                v-model="item.first_year_free"
                label="First Year Free"
                color="green"
                :value="true"
                hide-details
                :readonly="true"
              >
              </v-switch>
            </template>
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
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="editDialog">
      <CcCardForm
        :ccCard="ccCard"
        :companyName="companyName"
        :companies="companies"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></CcCardForm>
    </v-dialog>
  </div>
</template>

<script>
import commonService from "@/services/commonService";
import ccCardService from "@/services/ccCardService";
import BeatLoader from "@/components/common/Spinner";
import CcCardForm from "@/components/creditcards/CcCardForm";

export default {
  value: "CcCards",
  components: {
    BeatLoader,
    CcCardForm,
  },
  props: {
    companies: {
      type: Array,
      default: () => [],
    },
    cards: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      currentCompanyId: null,
      currentCompany: { text: '', value: '' },
      ccCard: null,
      headers: [
        { id: 1, value: "id", text: "Cc Card Id" },
        // { id: 2, value: "cc_company_id", text: "Cc Company Id" },
        { id: 3, value: "card_name", text: "Card Name" },
        { id: 4, value: "version", text: "Version" },
        { id: 5, value: "annual_fee", text: "Annual Fee" },
        { id: 6, value: "first_year_free", text: "First Year Free" },
        { id: 7, value: "recorded_on", text: "Recorded On" },
        { id: 20, value: "actions", text: "Actions", sortable: false },
      ],
      editDialog: false,
    };
  },
  computed: {
    cardsByCompany: function () {
      // console.log("cardsByCompany", this.cards);
      return this.cards
        ? this.cards.filter((val) => val.cc_company_id == this.currentCompanyId)
        : [];
    },
    companyName: function () {
      return (this.currentCompany) ? this.currentCompany.text : ''
    },
  },
  mounted() {
    // this.getCcCards();
  },
  methods: {
    async getCcCards() {
      this.loading = true;
      this.response = await ccCardService.getCreditCards();
      if( this.response.rc === -8) {
        this.$router.push({name:'login'})
      }
      // console.log("CcCards", this.response);
      this.loading = false;
    },
    setCompany(idx) {
      this.currentCompany = this.companies[idx]
      this.currentCompanyId = this.companies[idx].value;
    },
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    showItem(item) {
      this.ccCard = item;
      this.editDialog = true;
    },
    async saveForm(newCcCard) {
      this.editDialog = false;
      let findCcCard = this.cards.filter( item => item.id === newCcCard.id);
      if( findCcCard && findCcCard.length > 0) {
        findCcCard[0] = commonService.clone( newCcCard);
      }
    },
    cancelForm(item) {
      console.log("cancelForm", item);
      this.ccCard = item;
      this.editDialog = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>