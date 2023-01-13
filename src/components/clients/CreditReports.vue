<template>
  <v-card>
    <v-card-title>
      <v-col cols="6" v-if="creditReports.length > 0">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
      </v-col>
    </v-card-title>
    <v-data-table :items="creditReports" :headers="headers" :footer-props="{}" :search="search">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <CreditReportForm :clientPerson="clientPerson" :creditReport="creditReport" :key="creditReport.id"
        :isReadOnly="isReadOnly" @editForm="editForm" @cancelForm="cancelForm" @closeForm="editDialog = false"
        @saveForm="saveForm"></CreditReportForm>
    </v-dialog>
  </v-card>
</template>

<script>
// import creditReportService from "@/services/creditReportService";
import CreditReportModel from "@/models/clients/CreditReportModel";
import CreditReportForm from "@/components/clients/CreditReportForm";

export default {
  value: "CreditReport",
  components: {
    CreditReportForm
  },
  props: {
    clientPerson: Object,
    creditReports: {
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
      creditReport: CreditReportModel.creditReport(),
      dataLength: 0,
      headers: [
        { id: 1, value: "id", text: "Id", align: 'end' },
        // { id: 2, value: "client_id", text: "Client Id" },
        { id: 3, value: "credit_bureau", text: "Credit Bureau" },
        { id: 4, value: "login", text: "Login" },
        // { id: 23, value: "recorded_on", text: "Recorded On" },
        { id: 30, value: "actions", text: "Actions", sortable: false },
      ],
      search: "",
      editDialog: false,
      isReadOnly: false,
      randnum: Math.random()
    };
  },
  computed: {},
  mounted() {
    console.log(this.creditReports);
  },
  methods: {
    // async getCreditReport() {
    //   this.loading = true;
    //   this.response = await creditReportService.getCreditReport();
    //   this.loading = false;
    // },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm(creditReport) {
      this.$emit('saveItem', this.creditReports, creditReport);
      this.editDialog = false
    },
    cancelForm() {
      this.editDialog = false;
    },
    editItem(item) {
      this.randnum = Math.random();
      this.creditReport = item;
      console.log(this.creditReport);
      this.editDialog = true;
    },
    addItem() {
      this.creditReport = CreditReportModel.newCreditReport(this.clientPerson);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete";
      this.confirmDlgTitle = "Credit Report";
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