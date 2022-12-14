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
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        {{ item.id }}
      </template>
      <template v-slot:[`item.open_date`]="{ item }">
        {{ formatDate(item.open_date) }}
      </template>
      <template v-slot:[`item.credit_line`]="{ item }">
        {{ formatCurrency(item.credit_line) }}
      </template>
      <!-- <template v-slot:[`item.addtional_card`]="{ item }">
        <v-switch
          v-model="item.addtional_card"
          label="Additional Card"
          color="green"
          :value="true"
          hide-details
          readonly
        ></v-switch>
      </template> -->
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
    ccAccounts: Array,
    clientName: {
      type: String,
      default: ""
    },
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
        { id: 1, value: "id", text: "Id", align: 'end' }
        // , { id: 2, value: 'client_id', text: 'Client Id' }
        // , { id: 3, value: "client_name", text: "Name" }
        , { id: 4, value: "xero_id", text: "Xero ID" }
        // , { id: 5, value: "client_code", text: "Client Code" }
        // , { id: 6, value: "first_name", text: "First Name" }
        // , { id: 7, value: "last_name", text: "Last" }
        , { id: 8, value: "card_name", text: "Card" }
        // , { id: 9, value: "card_status", text: "Card Status"}
        , { id: 10, value: "cc_status_desc", text: "Status"}
        // , { id: 11, value: "device", text: "Device"}
        , { id: 12, value: "device_desc", text: "Device"}
        , { id: 13, value: "open_date", text: "Open Date"}
        // , { id: 14, value: "cc_login", text: "Login"}
        // , { id: 15, value: "pwd", text: "Pssword" }
        // , { id: 16, value: "cc_card_info", text: "CC Info" }
        // , { id: 17, value: "reconciled_on", text : "Reconciled On" }
        // , { id: 18, value: "charged_on", text: "Charged On" }
        , { id: 19, value: "credit_line", text: "Credit Line", align: 'end' }
        // , { id: 20, value: "due_on", text: "Due On" }
        // , { id: 21, value: "bonus_to_spend", text: "Bonus" }
        // , { id: 22, value: "bonus_spend_by", text: "Bonus Spend By" }
        // , { id: 23, value: "bonus_spent", text: "Bonus Spent" }
        // , { id: 24, value: "ccaccount_info", text: "Account Info" }
        // , { id: 25, value: "task", text: "Tesk" }
        , { id: 26, value: "in_charge", text: "In Charge" }
        // , { id: 27, value: "notes", text: "Notes" }
        // , { id: 28, value: "recorded_on", text: "Recorded On" }
        , { id: 30, value: "actions", text: "Actions", sortable: false }
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
      this.clientCcAccount = CcAccountModel.new_cc_account(this.client_id, this.client_code);
      this.clientCcAccount.first_name = this.clientName.split()[0];
      this.clientCcAccount.last_name = this.clientName.split()[1];
      // console.log( this.clientCcAccount);
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
      this.$emit('cancelItem')
    },
    closeForm() {
      this.editDialog = false;
    },
    ccAccountTaskChange( event) {
      console.log( event);
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