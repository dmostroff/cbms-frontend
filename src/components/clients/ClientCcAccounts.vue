<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="clientCcAccount.msg" xs12>\{ clientCcAccount.msg \}</div>
    <v-data-table
      title="Client Cc Account"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
  </div>
</template>

<script>
import clientService from "@/services/clientService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "ClientCcAccounts",
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
      clientCcAccount: {},
      headers: [
      { id: 1, value: 'cc_account_id', text: 'Cc Account Id' }
      , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'card_name', text: 'Card Name' }
      , { id: 4, value: 'card_holder', text: 'Card Holder' }
      , { id: 5, value: 'account', text: 'Account' }
      , { id: 6, value: 'open_date', text: 'Open Date' }
      , { id: 7, value: 'account_info', text: 'Account Info' }
      , { id: 8, value: 'cc_login', text: 'Cc Login' }
      , { id: 9, value: 'cc_pwd', text: 'Cc Pwd' }
      , { id: 10, value: 'cc_status', text: 'Cc Status' }
      , { id: 11, value: 'annual_fee_waived', text: 'Annual Fee Waived' }
      , { id: 12, value: 'credit_limit', text: 'Credit Limit' }
      , { id: 13, value: 'addtional_card', text: 'Addtional Card' }
      , { id: 14, value: 'notes', text: 'Notes' }
      , { id: 15, value: 'ccaccount_info', text: 'Ccaccount Info' }
      , { id: 16, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {
    this.getClientCcAccounts();
  },
  methods: {
    async getClientCcAccounts() {
        this.loading = true;
        this.response = await clientService.getClientCcAccounts();
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>