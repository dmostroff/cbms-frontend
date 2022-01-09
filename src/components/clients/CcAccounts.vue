<template>
  <v-card>
    <div v-if="clientCcAccount.msg" xs12>{{ clientCcAccount.msg }}</div>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col cols="2" class="pt-1">
            {{ numberOfCardsMsg}}
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3" align-self="end">
            <v-select
              v-model="ccAccountStatus"
              :items="ccAccountStatuses"
              label="Card Status"
            >
            </v-select>
          </v-col>
          <v-col cols="2">
            <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      title="Client Cc Accounts"
      :items="ccAccountsFiltered"
      :headers="headers"
      :search="search"
    >
      <template v-slot:[`item.id`]="{ item }">
         <v-icon>mdi-check</v-icon>!{{item.action}}!
        {{ item.id }} <v-icon v-if="item.action > ''">mdi-check</v-icon>{{item.action}}
      </template>
      <template v-slot:[`item.open_date`]="{ item }">
        {{ formatDate(item.open_date) }}
      </template>
      <template v-slot:[`item.annual_fee_waived`]="{ item }">
        <v-switch
          v-model="item.annual_fee_waived"
          label="Waived"
          color="green"
          value="Y"
          hide-details
          readonly
        ></v-switch>
      </template>
      <template v-slot:[`item.credit_limit`]="{ item }">
        {{ formatCurrency(item.credit_limit) }}
      </template>
      <template v-slot:[`item.addtional_card`]="{ item }">
        <v-switch
          v-model="item.addtional_card"
          label="Additional Card"
          color="green"
          :value="true"
          hide-details
          readonly
        ></v-switch>
      </template>
      <template v-slot:[`item.task`]="{ item }">
        <v-select
          v-model="item.task"
          :items="ccAccountTasks"
          label="Task"
          @change="ccAccountTaskChange"
        >
        </v-select>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <CcAccountForm
        :clientName="clientName"
        :ccAccount="clientCcAccount"
        :isReadOnly="isReadOnly"
        @editForm="editForm"
        @saveForm="saveForm"
        @cancelForm="cancelForm"
        @closeForm="closeForm"
      ></CcAccountForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import CcAccountForm from "@/components/clients/CcAccountForm";
import CcAccountModel from "@/models/clients/CcAccountModel"
import admService from "@/services/admService";

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
      editedId: 0,
      search: "",
      ccAccountStatus: "",
      ccAccountStatuses: [],
      ccAccountTasks: [],
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
        { id: 17, value: "task", text: "Task" },
        { id: 20, value: "actions", text: "Actions", sortable: false },
      ],
      editDialog: false,
      isReadOnly:false,
      ccAccount: {},
    };
  },
  computed: {
    ccAccountsFiltered: function () {
      let status = this.ccAccountStatus.trim();
      return this.ccAccounts.filter((item) => status === '' || item.cc_status === status)
        .sort(( a, b) => {
          if (a.open_date < b.open_date) {
            return -1;
          }
          if (a.open_date > b.open_date) {
            return 1;
          }
          return 0;
        });
    },
    numberOfCardsMsg: function() {
      const len = this.ccAccountsFiltered.length;
      let msg = len + ' cards';
      if( len === 0) { msg = 'No Cards '}
      else if( len === 1 ) { msg = 'One Card'; }
      return msg;
    }
  },
  mounted() {
    this.getCcAccountStatuses();
    this.getCcAccountTasks();
  },
  methods: {
    async getCcAccountStatuses() {
      this.ccAccountStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
      );
    },
    async getCcAccountTasks() {
      this.ccAccountTasks = await admService.getSettingsAsSelectByPrefix(
        "CCACCOUNTTASK"
      );
    },
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
    editItem(item) {
      this.editedId = item.id;
      this.clientCcAccount = item;
      // console.log( this.clientCcAccount);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    addItem() {
      this.clientCcAccount = new CcAccountModel();
      this.clientCcAccount.client_id = this.clientId;
      this.clientCcAccount.card_holder = this.clientName;
      console.log( this.clientCcAccount);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    editForm() {
      console.log('editForm');
    },
    saveForm(ccAccount) {
      this.$emit('saveItem', this.ccAccounts, ccAccount);
      this.editDialog = false;
      this.$forceUpdate();
    },
    cancelForm() {
      this.editDialog = false;
    },
    closeForm() {
      this.editDialog = false;
    },
    ccAccountTaskChange( event) {
      console.log( event);
    }
  },
  created() {},
};
</script>
<style scoped>
</style>