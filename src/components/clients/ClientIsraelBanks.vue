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
      title="Client Israel Bank Account"
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
        :clientIsraelBankId="clientIsraelBankId"
        @editClientPersonForm="editClientBankAccountForm"
        @cancelClientBankAccountDetail="cancelClientBankAccountDetail"
      ></ClientBankAccountDetail>
    </v-dialog>-->
    <v-dialog v-model="editDialog">
      <ClientIsraelBankForm
        :clientName="clientName"
        :clientIsraelBank="clientIsraelBank"
        :isReadOnly="isReadOnly"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></ClientIsraelBankForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from '@/services/commonService';
import ClientIsraelBankForm from '@/components/clients/ClientIsraelBankForm';
import ClientIsraelBankModel from '@/models/clients/ClientIsraelBankModel';

export default {
  value: "ClientIsraelBanks",
  components: {
    ClientIsraelBankForm
  },
  props: {
    clientId: Number,
    clientName: String,
    bankAccounts: Array
  },
  data() {
    return {
      clientIsraelBank: null,
      msg: null,
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      // , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'client_code', text: 'Client Code' }
      , { id: 4, value: 'bank', text: 'Bank' }
      , { id: 5, value: 'branch', text: 'Branch' }
      , { id: 6, value: 'account', text: 'Account #' }
      , { id: 7, value: 'iban', text: 'IBAN' }
      , { id: 8, value: 'iban_name', text: 'IBAN Name' }
      , { id: 9, value: 'address', text: 'Address' }
      , { id: 10, value: 'city', text: 'City' }
      , { id: 11, value: 'zip', text: 'Zip' }
      , { id: 12, value: 'phone', text: 'Phone' }
      // , { id: 9, value: 'notes', text: 'Notes' }
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
      this.clientIsraelBank = new ClientIsraelBankModel();
      this.clientIsraelBank.client_id = this.clientId;
      this.isReadOnly = false;
      this.editDialog = true;
    },
    editItem( item) {
      this.clientIsraelBank = item
      this.editDialog = true
    },
    saveForm(clientIsraelBank) {
      this.$emit('saveItem', this.bankAccounts, clientIsraelBank);
      this.editDialog = false;
      // this.$forceUpdate();
    },
    cancelForm( item) {
      this.clientIsraelBank = item
      this.editDialog = false
    }
  },
  created() {},
};
</script>
<style scoped>
</style>