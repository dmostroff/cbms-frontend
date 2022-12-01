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
      :items="checkings"
      :headers="headers"
      :footer-props="{}"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <CheckingForm
        :key="componentKey"
        :clientName="clientName"
        :checking="checking"
        :isReadOnly="isReadOnly"
        @editForm="editForm"
        @cancelForm="cancelForm"
        @closeForm="editDialog = false"
        @saveForm="saveForm"
      ></CheckingForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import checkingService from "@/services/checkingService";
import CheckingModel from "@/models/clients/CheckingModel"
import CheckingForm from "@/components/clients/CheckingForm"

export default {
  value: "Checking",
  components: {
    CheckingForm
  },
  props: {
    clientId: Number,
    clientName: String,
    checkings: {
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
        data: []
      },
      checking: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'xero_id', text: 'Xero Id' }
      // , { id: 3, value: 'client_id', text: 'Client Id' }
      , { id: 4, value: 'name_on_account', text: 'Name on Acct' }
      , { id: 5, value: 'account_status', text: 'Account Status' }
      , { id: 6, value: 'device', text: 'Device' }
      , { id: 7, value: 'open_date', text: 'Open Date' }
      // , { id: 8, value: 'login', text: 'Account Login' }
      // , { id: 9, value: 'pwd', text: 'Account Pwd' }
      , { id: 10, value: 'bank', text: 'Bank' }
      , { id: 11, value: 'routing', text: 'Rount #' }
      , { id: 12, value: 'account', text: 'Account #' }
      , { id: 13, value: 'member_number', text: 'Member' }
      // , { id: 15, value: 'debit_info', text: 'Debit Info' }
      // , { id: 16, value: 'reconciled_on', text: 'Reconciled On' }
      // , { id: 17, value: 'zelle', text: 'Zelle' }
      // , { id: 18, value: 'wise', text: 'Wise' }
      // , { id: 19, value: 'wise_device', text: 'Wise Device' }
      // , { id: 20, value: 'checking_info', text: 'Checking Info' }
      // , { id: 21, value: 'task', text: 'Task' }
      // , { id: 22, value: 'notes', text: 'Notes' }
      // , { id: 23, value: 'recorded_on', text: 'Recorded On' }
      , { id: 30, value: "actions", text: "Actions", sortable: false }
      ],
      search: "",
      componentKey: false,
      editDialog: false,
      isReadOnly: false,	  
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getChecking() {
        this.loading = true;
        this.response = await checkingService.getChecking();
        this.loading = false;
    },
    formatDate(date) {
      return commonService.formatDate(date)
    },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm( checking) {
      this.$emit('saveItem', this.checkings, checking);
      this.editDialog = false
    },
    cancelForm() {
      this.editDialog = false;
    },
    editItem(item) {
      this.checking = item;
      this.editDialog = true;
    },
    addItem() {
      this.componentKey = !this.componentKey
      this.checking = CheckingModel.newChecking(this.clientId, this.cbms_id);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete";
      this.confirmDlgTitle = "Checking";
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