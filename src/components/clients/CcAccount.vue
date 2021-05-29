<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="ccAccount.msg" xs12>{{ ccAccount.msg }}</div>
    <div>
      <v-data-table
        title="Cc Account"
        :items="response.data"
        :headers="headers"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
    <!-- <v-dialog v-model="dialogDetail">
      <CcAccountDetail
        :ccAccountId="ccAccountId"
        @editClientPersonForm="editCcAccountForm"
        @cancelCcAccountDetail="cancelCcAccountDetail"
      ></CcAccountDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <CcAccountForm
        :accAccount="ccAccount"
        @cancelCcAccountForm="cancelCcAccountForm"
        @saveForm="saveForm"
      ></CcAccountForm>
    </v-dialog> -->
  </div>
</template>

<script>
import ccAccountService from "@/services/ccAccountService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CcAccount",
  components: {
    BeatLoader,
  },
  props: [],
  data() {
    return {
      loading: false,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      ccAccount: {},
      headers: [
        { id: 1, value: "cc_account_id", text: "Cc Account Id" },
        { id: 2, value: "cc_card_id", text: "Cc Card Id" },
        { id: 3, value: "client_id", text: "Client Id" },
        { id: 4, value: "card_name", text: "Card Name" },
        { id: 5, value: "card_holder", text: "Card Holder" },
        { id: 6, value: "open_date", text: "Open Date" },
        { id: 7, value: "account_info", text: "Account Info" },
        { id: 8, value: "cc_login", text: "Cc Login" },
        { id: 9, value: "cc_status", text: "Cc Status" },
        { id: 10, value: "annual_fee_waived", text: "Annual Fee Waived" },
        { id: 11, value: "credit_limit", text: "Credit Limit" },
        { id: 12, value: "last_checked", text: "Last Checked" },
        { id: 13, value: "last_charge", text: "Last Charge" },
        { id: 14, value: "addtional_card", text: "Addtional Card" },
        { id: 15, value: "balance_transfer", text: "Balance Transfer" },
        { id: 16, value: "notes", text: "Notes" },
        { id: 17, value: "ccaccount_info", text: "Ccaccount Info" },
        { id: 18, value: "recorded_on", text: "Recorded On" },
        { id: 19, value: 'actions', text: 'Actions', sortable: false}
      ],
      cc_accountId: 0,
    };
  },
  computed: {},
  mounted() {
    this.getCcAccounts();
  },
  methods: {
    async getCcAccounts() {
      this.loading = true;
      this.response = await ccAccountService.getCcAccounts();
      this.loading = false;
    },
    editItem(item) {
      alert("edit");
      this.$router.push({
        name: "clientEdit",
        params: { id: item.cc_account_id },
      });
      // this.clientPersonId = item.client_id;
      // this.dialogDetailEdit = true;
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete";
      this.confirmDlgTitle = "Credit Card Account";
      this.comfirmDlgPrompt =
        "Delete " + item.card_name + " " + item.account_info + "?";
      this.confirmDlgShow = true;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>