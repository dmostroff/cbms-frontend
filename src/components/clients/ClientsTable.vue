<template>
  <v-card>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <v-card-title>
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
    <div v-if="response.data">
      <v-data-table
        title="Client Person"
        :items="response.data"
        :headers="headers"
        :search="search"
      >
        <template v-slot:[`item.last_name`]="{ item }">
          {{ item.last_name }}, {{ item.first_name }} {{ item.middle_name }}
        </template>
        <template v-slot:[`item.dob`]="{ item }">
          {{ formatDate(item.dob) }}
        </template>
        <template v-slot:[`item.client_status`]="{ item }">
          <v-select
            :items="clientStatuses"
            v-model="item.client_status"
          ></v-select>
        </template>
        <template v-slot:[`item.gender`]="{ item }">
          <v-chip :color="genderColor(item.gender)" dark> <!-- getColor(item.gender)" dark> -->
            {{ item.gender }}
          </v-chip>
        </template>
        <template v-slot:[`item.ssn`]="{ item }">
          {{ formatSSN(item.ssn) }}
        </template>
        <template v-slot:[`item.income`]="{ item }">
          {{ formatCurrency(item.income) }}
        </template>
        <template v-slot:[`item.phone`]="{ item }">
          {{ formatPhone(item.phone) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="clientHome(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="addPersonDlg">
      <ClientPersonForm
        clientName=""
        :clientPerson="clientPerson"
        :readonly="false"
        :showTitle="false"
        @saveForm="saveForm"
        @cancelForm="cancelForm"
      ></ClientPersonForm>
    </v-dialog>
    <v-dialog v-model="confirmDlg.show">
      <ConfirmDlg
        :keyname="confirmDlg.keyname"
        :title="confirmDlg.title"
        :prompt="confirmDlg.prompt"
        :areyousure="true"
        @confirmResult="confirmResult"
      >
      </ConfirmDlg>
    </v-dialog>
  </v-card>
</template>

<script>
import clientService from "@/services/clientService";
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import BeatLoader from "@/components/common/Spinner";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
// import MenuDisplay from "@/components/common/MenuDisplay";
import ConfirmDlg from "@/components/common/ConfirmDlg";
import ClientPersonModel from "@/models/clients/ClientPersonModel";
import colors from 'vuetify/lib/util/colors'

export default {
  name: "ClientsTable",
  components: {
    BeatLoader,
    ConfirmDlg,
    ClientPersonForm,
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
      search: "",
      headers: [
        { id: 1, value: "id", text: "Id" },
        { id: 2, value: "last_name", text: "Last Name" },
        // { id: 3, value: "first_name", text: "First Name" },
        // { id: 4, value: "middle_name", text: "Middle Name" },
        { id: 5, value: "dob", text: "Dob" },
        { id: 6, value: "gender", text: "Gender" },
        // { id: 7, value: "ssn", text: "Ssn" },
        // { id: 8, value: "mmn", text: "Mmn" },
        { id: 9, value: "email", text: "Email" },
        // { id: 10, value: "pwd", text: "Pwd" },
        { id: 11, value: "phone", text: "Phone" },
        // { id: 12, value: "income", text: "Income" },
        // { id: 13, value: "phone_cell", text: "Phone Cell" },
        // { id: 15, value: "phone_official", text: "Phone Official" },
        { id: 16, value: "client_status_desc", text: "Status" },
        // { id: 17, value: "client_info", text: "Client Info" },
        { id: 18, value: "recorded_on", text: "Recorded On" },
        { id: 19, value: "actions", text: "Actions", sortable: false },
      ],
      confirmDlg: {
        keyname: "",
        title: "",
        prompt: "",
        show: false,
      },
      addPersonDlg: false,
    };
  },
  watch: {
    search: function (val) {
      // want to remember the search criteria
      clientService.setClientSearch(val);
    },
  },
  computed: {
  },
  mounted() {
    this.search = clientService.getClientSearch();
  },
  methods: {
    genderColor(gender) {
      const gendercolors = { 'M': colors.blue.lighten4, 'F': colors.pink.lighten4}
      return ( gender in gendercolors) ? gendercolors[gender] : colors.grey.lighten3;
    },
    async getClientPersons() {
      this.loading = true;
      this.response = await clientService.getClientPersons();
      if( this.response.rc === -8) {
        this.$router.push({name:'login'})
      }
      this.loading = false;
    },
    async getClientStatuses() {
      let resp = await admService.getAdmSettingByPrefix("CLIENTSTATUS");
      if (resp.rc === 1) {
        this.clientStatuses = resp.data.map((e) => {
          return { text: e.keyvalue, value: e.keyname };
        });
      }
    },
    clientHome(item) {
      const client_id = +item.id;
      // console.log("clientHome", client_id);
      this.$router.push({ name: "client", params: { id: client_id } });
    },
    deleteItem(item) {
      this.confirmDlg.keyname = "delete";
      this.confirmDlg.title = "Client";
      this.confirmDlg.prompt =
        "Delete " + item.first_name + " " + item.last_name + "?";
      this.confirmDlg.show = true;
    },
    confirmResult(result) {
      this.confirmDlg.show = false;
      if (result[0] == "ok" && result[1] == "delete") {
        alert(result[1]);
        this.deleteItem();
        clientService.deleteClientPersonById();
      }
      if (result[0] == "ok" && result[1] == "edit") {
        this.deleteItem();
        clientService.deleteClientPersonById();
      }
    },
    formatDate(d) {
      return commonService.formatDate(d);
    },
    formatPhone(p) {
      return commonService.formatPhone(p);
    },
    formatSSN(s) {
      return commonService.formatSSN(s);
    },
    formatCurrency(a) {
      return commonService.formatCurrency(a);
    },
    addItem() {
      this.clientPerson = ClientPersonModel.person;
      this.addPersonDlg = true;
    },
    saveForm() {
      console.log( 'client person save form');
      this.getClientPersons();
      this.addPersonDlg = false;
      // commonService.upsert( itemArray, newItem);
    },
    cancelForm( formName) {
      console.log( formName);
      if( formName === "ClientPersonForm") {
        this.addPersonDlg = false;
      }
    }
  },
  created() {
    this.getClientPersons();
    this.getClientStatuses();
  },
};
</script>
<style scoped>
</style>