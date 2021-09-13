<template>
  <v-card>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="response.msg" xs12>{{ response.msg }}</div>
    <v-card-title>
      <v-container v-if="response.data">
        <v-row>
          <v-col cols="2" class="h2">Credit Summary</v-col>
          <v-col class="subtitle-1">{{ displayClientCount }}</v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <span @click="addItem"
              >Add Client<v-icon>mdi-plus-circle-outline</v-icon></span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <v-container v-if="response.data">
        <v-row>
          <v-col cols="12">
            <v-data-table
              title="Credit Summary"
              :items="response.data"
              :headers="headers"
              :search="search"
              @click:row="clientHome"
            >
              <template v-slot:[`item.start_date`]="{ item }">
                {{ formatDate(item.start_date) }}
              </template>
              <template v-slot:[`item.phone`]="{ item }">
                {{ formatPhone(item.phone) }}
              </template>
              <template
                v-slot:[`item.total_credit_limit`]="{ item }"
                class="red"
              >
                <v-flex class="adjust-self-right">{{
                  formatCurrency(item.total_credit_limit)
                }}</v-flex>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="clientHome(item)">
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
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
        :title="confirmDlg.title"
        :prompt="confirmDlg.prompt"
        @confirmResult="confirmResult"
      >
      </ConfirmDlg>
    </v-dialog>
  </v-card>
</template>

<script>
import clientService from "@/services/clientService";
import commonService from "@/services/commonService";
import BeatLoader from "@/components/common/Spinner";
import ConfirmDlg from "@/components/common/ConfirmDlg";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ClientPersonModel from "@/models/clients/ClientPersonModel";

export default {
  name: "CreditSummary",
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
      search: null,
      clientPerson: null,
      clientPersonId: 0,
      headers: [
        { id: 1, value: "id", text: "Id" },
        { id: 2, value: "client_name", text: "Client Name" },
        { id: 3, value: "address", text: "Address" },
        { id: 4, value: "email", text: "Email" },
        { id: 5, value: "phone", text: "Phone" },
        { id: 6, value: "start_date", text: "Start Date", align: "right" },
        {
          id: 7,
          value: "total_credit_limit",
          text: "Total Credit Limit",
          align: "right",
        },
        { id: 8, value: "actions", text: "Actions" },
      ],
      menuItems: [
        { prompt: "Detail", link: { name: "persondetail" } },
        { prompt: "Edit", link: { name: "personform" } },
      ],
      addPersonDlg: false,
      confirmDlg: {
        title: "",
        prompt: "",
        show: false,
      },
    };
  },
  computed: {
    clientCount() {
      return this.response.data.length;
    },
    displayClientCount() {
      const len = ('data' in this.response && Array.isArray(this.response.data)) ? this.response.data.length : 0;
      if( len == 0) { return 'No clients'; }
      if( len === 1) { return 'One client'; }
      return len + ' clients';
    }
  },
  methods: {
    async getCreditSummary() {
      this.loading = true;
      this.response = await clientService.getCreditSummary();
      this.loading = false;
    },
    getColor(calories) {
      if (calories == "M") return "red";
      else if (calories === "F") return "orange";
      else return "green";
    },
    clientHome(item) {
      const client_id = +item.id;
      this.$router.push({ name: "client", params: { id: client_id } });
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
    cancelClientPersonForm() {
      this.dialogDetailEdit = false;
    },
    formatDate(d) {
      return commonService.formatDate(d);
    },
    formatPhone(phone) {
      return commonService.formatPhone(phone);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
    addItem() {
      this.clientPerson = ClientPersonModel.person;
      this.addPersonDlg = true;
    },
    async saveForm() {
      console.log( 'client person save form');
      await this.getCreditSummary();
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
  mounted() {},
  created() {
    this.getCreditSummary();
  },
};
</script>
<style scoped>
</style>