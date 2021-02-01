<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>Credit Summary
    <MenuDisplay title="Credit Summary" :menuItems="menuItems"></MenuDisplay>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <!-- <div v-if="isRequest">
        <ClientPersonForm></ClientPersonForm>
    </div> -->
    <div v-if="response.data">
      <v-data-table
        title="Credit Summary"
        :items="response.data"
        :headers="headers"
      >
        <template v-slot:item.start_date="{ item }">
            {{ formatDate(item.start_date) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
         <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
      </v-data-table>
    </div>
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
      @confirmResult="confirmResult">
      </ConfirmDlg>
    </v-dialog>
  </div>
</template>

<script>
import clientService from "@/services/clientService";
import commonService from "@/services/commonService";
import BeatLoader from "@/components/common/Spinner";
import MenuDisplay from "@/components/common/MenuDisplay";
import ClientPersonDetail from "./ClientPersonDetail.vue";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ConfirmDlg from '@/components/common/ConfirmDlg'

export default {
  value: "CreditSummary",
  components: {
    BeatLoader,
    MenuDisplay,
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
        { id: 1, value: "client_id", text: "Client Id" },
        { id: 2, value: "client_name", text: "Client Name" },
        { id: 3, value: "address", text: "Address" },
        { id: 4, value: "email", text: "Email" },
        { id: 5, value: "phone", text: "Phone" },
        { id: 6, value: "start_date", text: "Start Date" },
        { id: 7, value: "total_credit_limit", text: "Total Credit Limit" },
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
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getCreditSummary() {
      this.loading = true;
      this.response = await clientService.getCreditSummary();
      this.loading = false;
    },
    handleClick(rowValue) {
      this.clientPersonId = rowValue.client_id;
      this.dialogDetail = true;
    },
    getColor(calories) {
      if (calories == "M") return "red";
      else if (calories === "F") return "orange";
      else return "green";
    },
    editItem(item) {
      this.clientPersonId = item.client_id;
      this.dialogDetail = true;
    },
    deleteItem(item) {
      this.confirmDlgTitle = "Delete "+item.first_name+ ' '+item.last_name
      this.comfirmDlgPrompt = "Delete "+item.first_name+ ' '+item.last_name+"? Are you sure?"
      this.confirmDlgShow = true
    },
    confirmResult( result) {
      this.confirmDlgShow = false
      alert( result)
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
    formatDate(d) { return commonService.formatDate(d) }
  },
  created() {
    this.getCreditSummary();
  },
};
</script>
<style scoped>
</style>