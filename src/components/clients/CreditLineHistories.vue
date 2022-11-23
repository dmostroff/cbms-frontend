<template>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        Client Id {{ clientId }}
        <v-spacer></v-spacer>
        <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
      </v-card-title>
      <div v-if="msg" xs12>{{ msg }}</div>
      <v-data-table
        title="Credit Line History"
        :items="creditLineHistories"
        :headers="headers"
        :search="search"
      >
          <template v-slot:[`item.recorded_on`]="{ item }">
              {{ formatDateTime(item.recorded_on) }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
      </v-data-table>
      <!-- <v-dialog v-model="dialogDetail">
        <ClientBankAccountDetail
          :creditLineHistoriesId="creditLineHistoriesId"
          @editClientPersonForm="editClientBankAccountForm"
          @cancelClientBankAccountDetail="cancelClientBankAccountDetail"
        ></ClientBankAccountDetail>
      </v-dialog>-->
      <v-dialog v-model="editDialog">
        <CreditLineHistoryForm
          :clientName="clientName"
          :creditLineHistories="creditLineHistories"
          :isReadOnly="isReadOnly"
          @cancelForm="cancelForm"
          @saveForm="saveForm"
        ></CreditLineHistoryForm>
      </v-dialog>
    </v-card>
  </template>
  
  <script>
  import commonService from '@/services/commonService';
  import CreditLineHistoryForm from '@/components/clients/CreditLineHistoryForm';
  import CreditLineHistoryModel from '@/models/clients/CreditLineHistoryModel';
  
  export default {
    value: "CreditLineHistories",
    components: {
      CreditLineHistoryForm
    },
    props: {
      clientId: Number,
      clientName: String,
      creditLineHistories: Array
    },
    data() {
      return {
        creditLineHistory: null,
        msg: null,
        headers: [
        { id: 1, value: 'id', text: 'Id' }
        , { id: 2, value: 'client_id', text: 'Client Id' }
        , { id: 3, value: 'client_code', text: 'Client Code' }
        , { id: 4, value: 'card_id', text: 'Card Id' }
        , { id: 5, value: 'xero_id', text: 'Xero Id' }
        , { id: 6, value: 'cl_date', text: 'Date' }
        , { id: 7, value: 'amount', text: 'Amount' }
        , { id: 8, value: 'cl_status', text: 'Status' }
        , { id: 9, value: 'notes', text: 'Notes' }
        , { id: 10, value: 'cl_info', text: 'Info' }
        , { id: 11, value: 'recorded_on', text: 'Recorded On' }
        , { id: 19, value: 'actions', text: 'Actions', sortable: false}
        ],
        isReadOnly:false,
        editDialog: false,
        search: "",
      };
    },
    computed: {},
    mounted() {
    },
    methods: {
      formatDateTime( datetime) {
        return commonService.formatDateTime( datetime)
      },
      addItem() {
        this.creditLineHistory = new CreditLineHistoryModel();
        this.creditLineHistory.client_id = this.clientId;
        this.isReadOnly = false;
        this.editDialog = true;
      },
      editItem( item) {
        this.creditLineHistory = item
        this.editDialog = true
      },
      saveForm(creditLineHistory) {
        this.$emit('saveItem', this.creditLineHistory, creditLineHistory);
        this.editDialog = false;
        // this.$forceUpdate();
      },
      cancelForm( item) {
        this.creditLineHistory = item
        this.editDialog = false
      }
    },
    created() {},
  };
  </script>
  <style scoped>
  </style>