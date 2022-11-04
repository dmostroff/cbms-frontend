<template>
  <v-card>
    <v-card-title
      >
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <div class="d-flex" @click="addItem">
        Add <v-icon>mdi-plus-circle-outline</v-icon>
      </div>
    </v-card-title>
    <v-data-table
      :items="clientLoans"
      :headers="headers"
      :footer-props="{}"
      :search="search"
    >
      <template v-slot:[`item.open_date`]="{ item }">
        {{ formatDate(item.open_data) }}
      </template>
      <template v-slot:[`item.reconciled_on`]="{ item }">
        {{ formatDate(item.reconciled_on) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <ClientLoanForm
        :key="componentKey"
        :clientName="clientName"
        :clientLoan="clientLoan"
        :isReadOnly="isReadOnly"
        @editForm="editForm"
        @cancelForm="cancelForm"
        @closeForm="editDialog = false"
        @saveForm="saveForm"
      ></ClientLoanForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import clientLoanService from "@/services/clientLoanService";
import ClientLoanModel from "@/models/clients/ClientLoanModel"
import ClientLoanForm from "@/components/clients/ClientLoanForm"

export default {
  value: "ClientLoan",
  components: {
    ClientLoanForm
  },
  props: {
    clientId: Number,
    clientName: String,
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
      clientLoan: {},
      dataLength: 0,
      headers: [
        { id: 1, value: "id", text: "Id" },
        { id: 2, value: "client_id", text: "Client Id" },
        { id: 3, value: "xero_id", text: "Xero" },
        { id: 4, value: "client_code", text: "Client Code" },
        { id: 5, value: "first_name", text: "First Name" },
        { id: 6, value: "last_name", text: "Last Name" },
        { id: 7, value: "card_name", text: "Card" },
        { id: 8, value: "loan_status", text: "Status" },
        { id: 9, value: "device", text: "Device" },
        { id: 10, value: "open_date", text: "Open Date" },
        { id: 11, value: "login", text: "Login" },
        { id: 12, value: "pwd", text: "Pwd" },
        { id: 13, value: "loan_number", text: "Loan Number" },
        { id: 14, value: "reconciled_on", text: "Reconciled On" },
        { id: 15, value: "credit_line", text: "Credit Line" },
        { id: 16, value: "autopay_account", text: "Autopay Account" },
        { id: 17, value: "due_on", text: "Due On" },
        { id: 18, value: "loan_type", text: "Type" },
        { id: 19, value: "maturity_on", text: "Maturity On" },
        { id: 20, value: "loan_info", text: "Loan Info" },
        { id: 21, value: "task", text: "Task" },
        { id: 22, value: "recorded_on", text: "Recorded On" },
        { id: 23, value: "actions", text: "Actions", sortable: false },
      ],
      search: "",
      componentKey: false,
      editDialog: false,
      isReadOnly: false,
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    async getClientLoan() {
      this.loading = true;
      this.response = await clientLoanService.getClientLoan();
      this.loading = false;
    },
    formatDate(date) {
      return commonService.formatDate(date)
    },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm( clientLoan) {
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
      this.componentKey = !this.componentKey
      this.clientLoan = ClientLoanModel.newClientLoan(this.clientId, this.cbms_id);
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
  created() {},
};
</script>
<style scoped>
</style>