<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>HelpClient Person
    <!-- <MenuDisplay title="Client" :menuItems="menuItems"></MenuDisplay> -->
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
        <template v-slot:item.last_name="{ item }">
            {{ item.last_name }}, {{ item.first_name}} {{ item.middle_name }}
        </template>
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
        <template v-slot:item.ssn="{ item }">
            {{ formatSSN(item.ssn) }}
        </template>
        <template v-slot:item.phone="{ item }">
            {{ formatPhone(item.phone) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="clientHome(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
        :clientPersonId="clientPersonId"
        :clientStatuses="clientStatuses"
        @cancelClientPersonForm="cancelClientPersonForm"
        @saveForm="saveForm"
      ></ClientPersonForm>
    </v-dialog>
    <v-dialog v-model="confirmDlgShow">
      <ConfirmDlg
      :keyname="confirmDlgKeyname"
      :title="confirmDlgTitle"
      :prompt="comfirmDlgPrompt"
      :areyousure="true"
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
// import MenuDisplay from "@/components/common/MenuDisplay";
import ClientPersonDetail from "./ClientPersonDetail.vue";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ConfirmDlg from '@/components/common/ConfirmDlg'

export default {
  name: "ClientsTable",
  components: {
    BeatLoader,
    // MenuDisplay,
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
        // { id: 3, value: "first_name", text: "First Name" },
        // { id: 4, value: "middle_name", text: "Middle Name" },
        { id: 5, value: "dob", text: "Dob" },
        { id: 6, value: "gender", text: "Gender" },
        { id: 7, value: "ssn", text: "Ssn" },
        { id: 8, value: "mmn", text: "Mmn" },
        { id: 9, value: "email", text: "Email" },
        // { id: 10, value: "pwd", text: "Pwd" },
        { id: 11, value: "phone", text: "Phone" },
        // { id: 12, value: "phone_2", text: "Phone 2" },
        // { id: 13, value: "phone_cell", text: "Phone Cell" },
        // { id: 15, value: "phone_official", text: "Phone Official" },
        { id: 16, value: "client_status_desc", text: "Status" },
        { id: 17, value: "client_info", text: "Client Info" },
        { id: 18, value: "recorded_on", text: "Recorded On" },
        { id: 19, value: 'actions', text: 'Actions', sortable: false}
      ],
      // menuItems: [
      //   { prompt: "Detail", link: { name: "clientDetail", params: { id: item.client_id } }},
      //   { prompt: "Edit", link: { name: "clientEdit" , params: { id: item.client_id } }},
      // ],
      dialogDetail: false,

      dialogDetailEdit: false,
      confirmDlgKeyname: "",
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
    clientHome(item) {
      // this.clientPersonId = item.client_id;
      this.$router.push({ name: "client", params: { id: item.client_id } });
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete"
      this.confirmDlgTitle = "Client"
      this.comfirmDlgPrompt = "Delete "+item.first_name+ ' '+item.last_name+"?"
      this.confirmDlgShow = true
    },
    confirmResult( result) {
      this.confirmDlgShow = false
      if( result[0] == "ok" && result[1] == 'delete') {
        alert( result[1])
        this.deleteItem()
        clientService.deleteClientPersonById( )
      }
      if( result[0] == "ok" && result[1] == 'edit') {
        this.deleteItem()
        clientService.deleteClientPersonById( )
      }
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
    formatDate(d) { return commonService.formatDate(d) },
    formatPhone(p) { return commonService.formatPhone(p) },
    formatSSN(s) { return commonService.formatSSN(s) },
  },
  created() {
    this.getClientPersons();
    this.getClientStatuses();
  },
};
</script>
<style scoped>
</style>