<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>HelpClient Person
    <MenuDisplay title="Client" :menuItems="menuItems"></MenuDisplay>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <!-- <div v-if="isRequest">
        <ClientPersonForm></ClientPersonForm>
    </div> -->
    <v-select :items="clientStatuses"></v-select>
    <div v-if="response.data">
      <v-data-table
        title="Client Person"
        :items="response.data"
        :headers="headers"
      >
        <template v-slot:item.dob="{ item }">
            {{ formatDate(item.dob) }}
        </template>
        <template v-slot:item.client_status="{ item }">
          <v-select
            :items="clientStatuses"
            v-model="item.client_status"
            ></v-select>
        </template>
        <template v-slot:item.gender="{ item }">
          <v-chip :color="getColor(item.gender)" dark @click="editItem(item)">
            {{ item.gender }}
          </v-chip>
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
        :clientStatuses="clientStatuses"
        @editClientPersonForm="editClientPersonForm"
        @cancelClientPersonDetail="cancelClientPersonDetail"
      ></ClientPersonDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <ClientPersonForm
        :aClientPerson="clientPerson"
        :clientStatuses="clientStatuses"
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
import admService from "@/services/admService"
import BeatLoader from "@/components/common/Spinner";
import MenuDisplay from "@/components/common/MenuDisplay";
import ClientPersonDetail from "./ClientPersonDetail.vue";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ConfirmDlg from '@/components/common/ConfirmDlg'

export default {
  value: "ClientPersons",
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
      clientStatuses: [],
      headers: [
        { id: 1, value: "client_id", text: "Client Id" },
        { id: 2, value: "last_name", text: "Last Name" },
        { id: 3, value: "first_name", text: "First Name" },
        { id: 4, value: "middle_name", text: "Middle Name" },
        { id: 5, value: "dob", text: "Dob" },
        { id: 6, value: "gender", text: "Gender" },
        { id: 7, value: "ssn", text: "Ssn" },
        { id: 8, value: "mmn", text: "Mmn" },
        { id: 9, value: "email", text: "Email" },
        { id: 10, value: "pwd", text: "Pwd" },
        { id: 11, value: "phone", text: "Phone" },
        { id: 12, value: "phone_2", text: "Phone 2" },
        { id: 13, value: "phone_cell", text: "Phone Cell" },
        { id: 15, value: "phone_official", text: "Phone Official" },
        { id: 16, value: "client_status", text: "Status" },
        { id: 17, value: "client_info", text: "Client Info" },
        { id: 18, value: "recorded_on", text: "Recorded On" },
        { id: 19, value: 'actions', text: 'Actions', sortable: false}
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
    async getClientPersons() {
      this.loading = true;
      this.response = await clientService.getClientPersons();
      this.loading = false;
    },
    async getClientStatuses() {
      let resp = await admService.getAdmSettingByPrefix( 'CLIENTSTATUS')
      if( resp.rc === 1) {
        this.clientStatuses = resp.data.map( e => { return {"text": e.keyvalue, "value": e.keyname} });
        console.log( this.clientStatuses)
      }
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
    this.getClientPersons();
    this.getClientStatuses();
  },
};
</script>
<style scoped>
</style>