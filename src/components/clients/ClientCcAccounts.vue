<template>
  <div>
    <div v-if="clientCcAccount.msg" xs12>{{ clientCcAccount.msg }}</div>
    <v-data-table
      title="Client Cc Accounts"
      :items="ccAccounts"
      :headers="headers"
    >
      <template v-slot:item.open_date="{ item }">
        {{ formatDate(item.open_date) }}
      </template>
      <template v-slot:item.annual_fee_waived="{ item }">
        <v-switch
          v-model="item.annual_fee_waived"
          label="Waived"
          color="green"
          value="Y"
          hide-details
          readonly
        ></v-switch>
      </template>
      <template v-slot:item.credit_limit="{ item }">
        {{ formatCurrency(item.credit_limit) }}
      </template>
      <template v-slot:item.addtional_card="{ item }">
        <v-switch
          v-model="item.addtional_card"
          label="Additional Card"
          color="green"
          :value="true"
          hide-details
          readonly
        ></v-switch>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="showItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <CcAccountForm
        :clientName="clientName"
        :ccAccount="clientCcAccount"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></CcAccountForm>
    </v-dialog>
  </div>
</template>

<script>
import commonService from "@/services/commonService";

import CcAccountForm from '@/components/clients/CcAccountForm'

export default {
  value: "ClientsCcAccounts",
  components: {
    CcAccountForm,
  },
  props: {
    clientName: String,
    ccAccounts: Array,
    clientId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      clientCcAccount: {},
      headers: [
        { id: 1, value: "id", text: "Cc Account Id" },
        // , { id: 2, value: 'client_id', text: 'Client Id' }
        { id: 3, value: "card_name", text: "Card Name" },
        { id: 4, value: "card_holder", text: "Card Holder" },
        { id: 5, value: "account", text: "Account" },
        { id: 6, value: "open_date", text: "Open Date" },
        // , { id: 7, value: 'account_info', text: 'Account Info' }
        // , { id: 8, value: 'cc_login', text: 'Cc Login' }
        // , { id: 9, value: 'cc_pwd', text: 'Cc Pwd' }
        { id: 10, value: "cc_status_desc", text: "Cc Status" },
        { id: 11, value: "annual_fee_waived", text: "Annual Fee Waived" },
        { id: 12, value: "credit_limit", text: "Credit Limit" },
        { id: 13, value: "addtional_card", text: "Addtional Card" },
        // { id: 14, value: "notes", text: "Notes" },
        // { id: 15, value: "ccaccount_info", text: "Ccaccount Info" },
        // { id: 16, value: "recorded_on", text: "Recorded On" },
        { id: 20, value: "actions", text: "Actions", sortable: false },
      ],
      showDialog: false,
      editDialog: false,
      ccAccount: {},
    };
  },
  computed: {},
  mounted() {
    // this.getClientCcAccountByClientId(this.clientId);
  },
  methods: {
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
    showItem(item) {
      this.clientCcAccount = item
      this.editDialog = true
    },
    async saveForm( ) {
      this.editDialog = false
      // this.clientCcAccount = item
    },
    cancelForm( ) {
      this.editDialog = false
    }
  },
  created() {},
};
</script>
<style scoped>
</style>