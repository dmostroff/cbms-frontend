<template>
  <v-container>
    <beat-loader v-if="loading"></beat-loader>
    <v-row>
      <v-col cols="4" class="h2">Credit Summary</v-col>
      <v-spacer></v-spacer>
      <v-col v-if="response.msg" cols="4">{{ response.msg }}</v-col>
      <v-col># of Clients {{ clientCount }}</v-col>
    </v-row>
    <v-row v-if="response.data"><v-col cols="12">
      <v-data-table
        title="Credit Summary"
        :items="response.data"
        :headers="headers"
         @click:row="clientHome"
      >
        <template v-slot:[`item.start_date`]="{ item }">
          {{ formatDate(item.start_date) }}
        </template>
        <template v-slot:[`item.phone`]="{ item }">
          {{ formatPhone(item.phone) }}
        </template>
        <template v-slot:[`item.total_credit_limit`]="{ item }" class="red">
          <v-flex class="adjust-self-right">{{ formatCurrency( item.total_credit_limit)}}</v-flex>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="clientHome(item)">
            mdi-pencil
          </v-icon>
          <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
        </template>
      </v-data-table>
    </v-col>
    </v-row>
    <v-dialog v-model="dialogDetail">
      <ClientPersonDetail
        :clientPersonId="clientPersonId"
        @editClientPersonForm="editClientPersonForm"
        @cancelClientPersonDetail="cancelClientPersonDetail"
      ></ClientPersonDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <ClientPersonForm
        :aClientPerson="clientPerson"
        @cancelClientPersonForm="cancelClientPersonForm"
        @saveForm="saveForm"
      ></ClientPersonForm>
    </v-dialog>
    <v-dialog v-model="confirmDlgShow">
      <ConfirmDlg
        :title="confirmDlgTitle"
        :prompt="comfirmDlgPrompt"
        @confirmResult="confirmResult"
      >
      </ConfirmDlg>
    </v-dialog>
  </v-container>
</template>

<script>
import clientService from "@/services/clientService";
import commonService from "@/services/commonService";
import BeatLoader from "@/components/common/Spinner";
import ClientPersonDetail from "./ClientPersonDetail.vue";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ConfirmDlg from "@/components/common/ConfirmDlg";

export default {
  name: "CreditSummary",
  components: {
    BeatLoader,
    ClientPersonDetail,
    ClientPersonForm,
    ConfirmDlg,
  },
  props: [],
  data() {
    return {
      loading: true,
      isRequest: true,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      clientPerson: null,
      clientPersonId: 0,
      headers: [
        { id: 1, value: "id", text: "Id" },
        { id: 2, value: "client_name", text: "Client Name" },
        { id: 3, value: "address", text: "Address" },
        { id: 4, value: "email", text: "Email" },
        { id: 5, value: "phone", text: "Phone" },
        { id: 6, value: "start_date", text: "Start Date", align: "right" },
        { id: 7, value: "total_credit_limit", text: "Total Credit Limit", align: "right" },
        { id: 8, value: "actions", text: "Actions" },
      ],
      menuItems: [
        { prompt: "Detail", link: { name: "persondetail" } },
        { prompt: "Edit", link: { name: "personform" } },
      ],
      dialogDetail: false,
      dialogDetailEdit: false,
      confirmDlgTitle: "",
      comfirmDlgPrompt: "",
      confirmDlgShow: false,
      moneyOptions: {
        locale: "en_US",
        prefix: "$",
        suffix: "",
        length: 11,
        precision: 2,
      },
    };
  },
  computed: {
    clientCount() {
      return this.response.data.length;
    }
  },
  methods: {
    async getCreditSummary() {
      this.loading = true;
      this.response = await clientService.getCreditSummary();
      this.loading = false;
    },
    handleClick(rowValue) {
      this.clientPersonId = rowValue.id;
      this.dialogDetail = true;
    },
    getColor(calories) {
      if (calories == "M") return "red";
      else if (calories === "F") return "orange";
      else return "green";
    },
    clientHome(item) {
      const client_id = +item.id
      this.$router.push({ name: "client", params: { id: client_id } });
      // this.dialogDetail = true;
    },
    deleteItem(item) {
      this.confirmDlgTitle = "Delete " + item.first_name + " " + item.last_name;
      this.comfirmDlgPrompt =
        "Delete " + item.first_name + " " + item.last_name + "? Are you sure?";
      this.confirmDlgShow = true;
    },
    confirmResult(result) {
      this.confirmDlgShow = false;
      alert(result);
    },
    editClientPersonForm(clientPerson) {
      let cp = {};
      Object.keys(clientPerson).forEach((k) => (cp[k] = clientPerson[k]));
      this.clientPerson = cp;
      this.dialogDetailEdit = true;
      this.dialogDetail = false;
    },
    cancelClientPersonDetail() {
      this.dialogDetail = false;
    },
    saveForm(clientPerson) {
      this.clientPerson = clientPerson;
      this.dialogDetailEdit = false;
    },
    cancelClientPersonForm() {
      this.dialogDetailEdit = false;
    },
    formatDate(d) {
      return commonService.formatDate(d);
    },
    formatPhone(phone) {
      return commonService.formatPhone(phone);
    },
    formatCurrency( amount) {
      return commonService.formatCurrency(amount)
    }
  },
  mounted() {},
  created() {
    this.getCreditSummary();
  },
};
</script>
<style scoped>
</style>