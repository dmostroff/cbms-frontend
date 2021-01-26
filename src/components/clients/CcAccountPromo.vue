<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="ccAccountPromo.msg" xs12>\{ ccAccountPromo.msg \}</div>
    <div v-else>
    <v-data-table
      title="Cc Account Promo"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
      <CcAccountPromoDetail
        :ccAccountPromoId="ccAccountPromoId"
        @editClientPersonForm="editCcAccountPromoForm"
        @cancelCcAccountPromoDetail="cancelCcAccountPromoDetail"
      ></CcAccountPromoDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <CcAccountPromoForm
        :accAccountPromo="ccAccountPromo"
        @cancelCcAccountPromoForm="cancelCcAccountPromoForm"
        @saveForm="saveForm"
      ></CcAccountPromoForm>
    </v-dialog>
  </div>
</template>

<script>
import cc_accountService from "@/services/cc_accountService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CcAccountPromo",
  components: {
    BeatLoader,
  },
  props: [],
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      ccAccountPromo: {},
      headers: [
      { id: 1, value: 'promo_id', text: 'Promo Id' }
      , { id: 2, value: 'cc_account_id', text: 'Cc Account Id' }
      , { id: 3, value: 'offer', text: 'Offer' }
      , { id: 4, value: 'loan_amt', text: 'Loan Amt' }
      , { id: 5, value: 'bal_transfer_date', text: 'Bal Transfer Date' }
      , { id: 6, value: 'bal_transfer_amt', text: 'Bal Transfer Amt' }
      , { id: 7, value: 'promo_info', text: 'Promo Info' }
      , { id: 8, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getCcAccountPromo() {
        this.loading = true;
        this.response = await cc_accountService.getCcAccountPromo();
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>