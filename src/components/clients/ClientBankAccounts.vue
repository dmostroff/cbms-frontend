<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <v-data-table
      title="Client Bank Account"
      :items="bankAccounts"
      :headers="headers"
    >
        <template v-slot:item.recorded_on="{ item }">
            {{ formatDateTime(item.recorded_on) }}
        </template>
    </v-data-table>
    <!-- <v-dialog v-model="dialogDetail">
      <ClientBankAccountDetail
        :clientBankAccountId="clientBankAccountId"
        @editClientPersonForm="editClientBankAccountForm"
        @cancelClientBankAccountDetail="cancelClientBankAccountDetail"
      ></ClientBankAccountDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <ClientBankAccountForm
        :aclientBankAccount="clientBankAccount"
        @cancelClientBankAccountForm="cancelClientBankAccountForm"
        @saveForm="saveForm"
      ></ClientBankAccountForm>
    </v-dialog> -->
  </div>
</template>

<script>
import commonService from '@/services/commonService';
import client_bank_accountService from "@/services/clientService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "ClientBankAccount",
  components: {
    BeatLoader,
  },
  props: {
    bankAccounts: Array
  },
  data() {
    return {
      loading: false,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      clientBankAccounts: [],
      headers: [
      { id: 1, value: 'bank_account_id', text: 'Id' }
      , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'bank_name', text: 'Bank Name' }
      , { id: 4, value: 'account_num', text: 'Account Num' }
      , { id: 5, value: 'routing_num', text: 'Routing Num' }
      , { id: 6, value: 'branch_num', text: 'Branch Num' }
      , { id: 7, value: 'iban', text: 'Iban' }
      , { id: 8, value: 'country', text: 'Country' }
      , { id: 9, value: 'account_login', text: 'Account Login' }
      , { id: 10, value: 'account_pwd', text: 'Account Pwd' }
      , { id: 11, value: 'account_status_desc', text: 'Account Status' }
      , { id: 12, value: 'debit_card', text: 'Debit Card' }
      , { id: 13, value: 'debit_info', text: 'Debit Info' }
      , { id: 14, value: 'recorded_on', text: 'Recorded On' }
      ],
    };
  },
  computed: {},
  mounted() {
    this.clientBankAccounts= this.bankAccounts;
  },
  methods: {
    async getClientBankAccount() {
        this.loading = true;
        this.response = await client_bank_accountService.getClientBankAccount();
        this.loading = false;
    },
    formatDateTime( datetime) {
      return commonService.formatDateTime( datetime)
    }
  },
  created() {},
};
</script>
<style scoped>
</style>