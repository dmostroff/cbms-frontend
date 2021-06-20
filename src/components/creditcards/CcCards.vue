<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <v-layout>
      <v-flex xs2>
        <v-select
          v-model="currentCompanyId"
          :items="companies"
          label="Companies"
        ></v-select>
      </v-flex>
      <v-flex xs10>
        <v-data-table
          title="Cc Card"
          :items="cardsByCompany"
          :headers="headers"
        ></v-data-table>
      </v-flex>
    </v-layout>
    <!-- <v-dialog v-model="dialogDetail">
      <CcCardDetail
        :ccCardId="ccCardId"
        @editClientPersonForm="editCcCardForm"
        @cancelCcCardDetail="cancelCcCardDetail"
      ></CcCardDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <CcCardForm
        :accCard="ccCard"
        @cancelCcCardForm="cancelCcCardForm"
        @saveForm="saveForm"
      ></CcCardForm>
    </v-dialog> -->
  </div>
</template>

<script>
import ccCardService from "@/services/ccCardService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CcCards",
  components: {
    BeatLoader,
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
      headers: [
        { id: 1, value: "id", text: "Cc Card Id" },
        { id: 2, value: "cc_company_id", text: "Cc Company Id" },
        { id: 3, value: "card_name", text: "Card Name" },
        { id: 4, value: "version", text: "Version" },
        { id: 5, value: "annual_fee", text: "Annual Fee" },
        { id: 6, value: "first_year_free", text: "First Year Free" },
        { id: 7, value: "recorded_on", text: "Recorded On" },
      ],
    };
  },
  computed: {
    cardsByCompany: function() {
      console.log( 'cardsByCompany', this.cards)
      return (this.cards) ? (this.cards.filter( (val) => val.cc_company_id == this.currentCompanyId)) : []
    },
  },
  mounted() {
    // this.getCcCards();
  },
  methods: {
    async getCcCards() {
      this.loading = true;
      this.response = await ccCardService.getCreditCards();
      console.log("CcCards", this.response);
      this.loading = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>