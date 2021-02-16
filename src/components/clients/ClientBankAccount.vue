<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="clientBankAccount.msg" xs12>\{ clientBankAccount.msg \}</div>
    <div v-else>
    <v-data-table
      title="Client Bank Account"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
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
    </v-dialog>
  </div>
</template>

<script>
import client_bank_accountService from "@/services/client_bank_accountService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "ClientBankAccount",
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
      clientBankAccount: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'bank_name', text: 'Bank Name' }
      , { id: 4, value: 'account_num', text: 'Account Num' }
      , { id: 5, value: 'routing_num', text: 'Routing Num' }
      , { id: 6, value: 'branch_num', text: 'Branch Num' }
      , { id: 7, value: 'iban', text: 'Iban' }
      , { id: 8, value: 'country', text: 'Country' }
      , { id: 9, value: 'account_login', text: 'Account Login' }
      , { id: 10, value: 'account_pwd', text: 'Account Pwd' }
      , { id: 11, value: 'account_status', text: 'Account Status' }
      , { id: 12, value: 'debit_card', text: 'Debit Card' }
      , { id: 13, value: 'debit_info', text: 'Debit Info' }
      , { id: 14, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getClientBankAccount() {
        this.loading = true;
        this.response = await client_bank_accountService.getClientBankAccount();
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>