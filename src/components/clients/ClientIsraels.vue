<template>
  <v-card>
    <v-card-title>
      <v-col cols="6" v-if="clientIsraels.length > 0">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
      </v-col>
    </v-card-title>
    <div v-if="msg" xs12>{{ msg }}</div>
    <v-data-table title="Client Israel Account" :items="clientIsraels" :headers="headers" :search="search"
      :key="randnum">
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
        :clientIsraelId="clientIsraelId"
        @editClientPersonForm="editClientBankAccountForm"
        @cancelClientBankAccountDetail="cancelClientBankAccountDetail"
      ></ClientBankAccountDetail>
    </v-dialog>-->
    <v-dialog v-model="editDialog">
      <ClientIsraelForm :clientPerson="clientPerson" :clientIsrael="clientIsrael" :isReadOnly="isReadOnly" :key="clientIsrael.id"
        @cancelForm="cancelForm" @saveForm="saveForm"></ClientIsraelForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from '@/services/commonService';
import ClientIsraelForm from '@/components/clients/ClientIsraelForm';
import ClientIsraelModel from '@/models/clients/ClientIsraelModel';

export default {
  value: "ClientIsraels",
  components: {
    ClientIsraelForm
  },
  props: {
    clientPerson: Object,
    clientIsraels: Array,
  },
  data() {
    return {
      clientIsrael: ClientIsraelModel.clientIsrael(),
      msg: null,
      headers: [
        { id: 1, value: 'id', text: 'Id' }
        // , { id: 2, value: 'client_id', text: 'Client Id' }
        , { id: 3, value: 'client_code', text: 'Client Code' }
        , { id: 4, value: 'bank', text: 'Bank' }
        , { id: 5, value: 'branch', text: 'Branch' }
        , { id: 6, value: 'account', text: 'Account #' }
        // , { id: 7, value: 'iban', text: 'IBAN' }
        // , { id: 8, value: 'iban_name', text: 'IBAN Name' }
        , { id: 9, value: 'address', text: 'Address' }
        , { id: 10, value: 'city', text: 'City' }
        , { id: 11, value: 'zip', text: 'Zip' }
        // , { id: 12, value: 'phone', text: 'Phone' }
        // , { id: 13, value: 'notes', text: 'Notes' }
        // , { id: 14, value: 'recorded_on', text: 'Recorded On' }
        , { id: 19, value: 'actions', text: 'Actions', sortable: false }
      ],
      isReadOnly: false,
      editDialog: false,
      search: "",
      randnum: 0,
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime)
    },
    addItem() {
      this.clientIsrael = ClientIsraelModel.newClientIsrael(this.clientPerson);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    editItem(item) {
      this.clientIsrael = item
      this.editDialog = true
    },
    saveForm(clientIsrael) {
      this.$emit('saveItem', this.clientIsraels, clientIsrael);
      this.randnum = Math.trunc((Math.random() * 1000))
      this.editDialog = false;
      // this.$forceUpdate();
    },
    cancelForm() {
      this.editDialog = false
    }
  },
  created() { },
};
</script>
<style scoped>

</style>