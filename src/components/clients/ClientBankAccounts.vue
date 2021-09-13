<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      Client Id {{ clientId }}
      <v-spacer></v-spacer>
      <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
    </v-card-title>
    <div v-if="msg" xs12>{{ msg }}</div>
    <v-data-table
      title="Client Bank Account"
      :items="bankAccounts"
      :headers="headers"
      :search="search"
    >
        <template v-slot:[`item.recorded_on`]="{ item }">
            {{ formatDateTime(item.recorded_on) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
    <!-- <v-dialog v-model="dialogDetail">
      <ClientBankAccountDetail
        :clientBankAccountId="clientBankAccountId"
        @editClientPersonForm="editClientBankAccountForm"
        @cancelClientBankAccountDetail="cancelClientBankAccountDetail"
      ></ClientBankAccountDetail>
    </v-dialog>-->
    <v-dialog v-model="editDialog">
      <ClientBankAccountForm
        :clientName="clientName"
        :clientBankAccount="clientBankAccount"
        :isReadOnly="isReadOnly"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></ClientBankAccountForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from '@/services/commonService';
import ClientBankAccountForm from '@/components/clients/ClientBankAccountForm';
import ClientBankAccountModel from '@/models/clients/ClientBankAccountModel';

export default {
  value: "ClientBankAccounts",
  components: {
    ClientBankAccountForm
  },
  props: {
    clientId: Number,
    clientName: String,
    bankAccounts: Array
  },
  data() {
    return {
      clientBankAccount: null,
      msg: null,
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      // , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'bank_name', text: 'Bank Name' }
      , { id: 4, value: 'account_num', text: 'Account Num' }
      , { id: 5, value: 'routing_num', text: 'Routing Num' }
      , { id: 6, value: 'branch_num', text: 'Branch Num' }
      , { id: 7, value: 'iban', text: 'Iban' }
      , { id: 8, value: 'country', text: 'Country' }
      // , { id: 9, value: 'account_login', text: 'Account Login' }
      // , { id: 10, value: 'account_pwd', text: 'Account Pwd' }
      , { id: 11, value: 'account_status_desc', text: 'Account Status' }
      , { id: 12, value: 'debit_card', text: 'Debit Card' }
      , { id: 13, value: 'debit_info', text: 'Debit Info' }
      // , { id: 14, value: 'recorded_on', text: 'Recorded On' }
      , { id: 19, value: 'actions', text: 'Actions', sortable: false}
      ],
      isReadOnly:false,
      editDialog: false,
      search: "",
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    formatDateTime( datetime) {
      return commonService.formatDateTime( datetime)
    },
    addItem() {
      this.clientBankAccount = new ClientBankAccountModel();
      this.clientBankAccount.client_id = this.clientId;
      this.isReadOnly = false;
      this.editDialog = true;
    },
    editItem( item) {
      this.clientBankAccount = item
      this.editDialog = true
    },
    saveForm(clientBankAccount) {
      this.$emit('saveItem', this.bankAccounts, clientBankAccount);
      this.editDialog = false;
      // this.$forceUpdate();
    },
    cancelForm( item) {
      this.clientBankAccount = item
      this.editDialog = false
    }
  },
  created() {},
};
</script>
<style scoped>
</style>