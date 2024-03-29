<template>
  <v-card>
    <v-card-title>
      <v-col cols="6" v-if="clientLoans.length > 0">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <div class="d-flex" @click="addItem">
          Add <v-icon>mdi-plus-circle-outline</v-icon>
        </div>
      </v-col>
    </v-card-title>
    <v-data-table :items="clientLoans" :headers="headers" :footer-props="{}" :search="search">
      <template v-slot:[`item.loan_status`]="{ item }">
        {{ getLoanStatusDescription(item.loan_status) }}
      </template>
      <template v-slot:[`item.open_date`]="{ item }">
        {{ formatDate(item.open_date) }}
      </template>
      <template v-slot:[`item.reconciled_on`]="{ item }">
        {{ formatDate(item.reconciled_on) }}
      </template>
      <template v-slot:[`item.maturity_on`]="{ item }">
        {{ formatDate(item.maturity_on) }}
      </template>
      <template v-slot:[`item.credit_line`]="{ item }">
        {{ formatCurrency(item.credit_line) }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <ClientLoanForm :clientPerson="clientPerson" :clientLoan="clientLoan" :isReadOnly="isReadOnly" :key="clientLoan.id"
        @editForm="editForm" @cancelForm="cancelForm" @closeForm="editDialog = false" @saveForm="saveForm">
      </ClientLoanForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import clientLoanService from "@/services/clientLoanService";
import ClientLoanModel from "@/models/clients/ClientLoanModel";
import ClientLoanForm from "@/components/clients/ClientLoanForm";

export default {
  value: "ClientLoan",
  components: {
    ClientLoanForm
  },
  props: {
    clientPerson: Object,
    clientLoans: {
      type: Array,
      default: () => [],
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
      clientLoan: ClientLoanModel.clientLoan(),
      loanStatuses: [],
      dataLength: 0,
      headers: [
        { id: 1, value: "id", text: "Id", align: 'end' },
        // { id: 2, value: "client_id", text: "Client Id" },
        { id: 3, value: "xero_id", text: "Xero" },
        // { id: 4, value: "client_code", text: "Client Code" },
        // { id: 5, value: "first_name", text: "First Name" },
        // { id: 6, value: "last_name", text: "Last Name" },
        { id: 7, value: "card_name", text: "Card" },
        { id: 8, value: "loan_status", text: "Status" },
        // { id: 9, value: "device", text: "Device" },
        // { id: 10, value: "open_date", text: "Open Date" },
        // { id: 11, value: "login", text: "Login" },
        // { id: 12, value: "pwd", text: "Pwd" },
        { id: 13, value: "loan_number", text: "Loan Number" },
        { id: 14, value: "reconciled_on", text: "Reconciled On" },
        { id: 15, value: "credit_line", text: "Credit Line", align: 'end' },
        // { id: 16, value: "autopay_account", text: "Autopay Account" },
        { id: 17, value: "due_on", text: "Due On" },
        // { id: 18, value: "loan_type", text: "Type" },
        // { id: 19, value: "maturity_on", text: "Maturity On" },
        // { id: 20, value: "loan_info", text: "Loan Info" },
        // { id: 21, value: "task", text: "Task" },
        // { id: 22, value: "notes", text: "Notes" },
        // { id: 23, value: "recorded_on", text: "Recorded On" },
        { id: 30, value: "actions", text: "Actions", sortable: false },
      ],
      search: "",
      editDialog: false,
      isReadOnly: false,
    };
  },
  computed: {},
  mounted() {
    this.getLoanStatuses();
  },
  methods: {
    async getClientLoan() {
      this.loading = true;
      this.response = await clientLoanService.getClientLoan();
      this.loading = false;
    },
    async getLoanStatuses() {
      this.loanStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
      );
    },

    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
    getLoanStatusDescription(loan_status) {
      return commonService.getSettingDescription(this.loanStatuses, loan_status);
    },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm(clientLoan) {
      this.$emit('saveItem', this.clientLoans, clientLoan);
      this.editDialog = false
    },
    cancelForm() {
      this.editDialog = false;
    },
    editItem(item) {
      this.clientLoan = item;
      this.editDialog = true;
    },
    addItem() {
      this.clientLoan = ClientLoanModel.newClientLoan(null, this.clientPerson);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete";
      this.confirmDlgTitle = "Client Loans";
      this.comfirmDlgPrompt =
        "Delete " + item.loan_num + "?";
      this.confirmDlgShow = true;
    },
  },
  created() { },
};
</script>
<style scoped>

</style>