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
    <v-data-table
      :items="clientAddresses"
      :headers="headers"
      :footer-props="{}"
      :search="search"
    >
      <template v-slot:[`item.address_type`]="{ item }">
        {{ getAddressTypeDesc(item.address_type) }}
      </template>
      <template v-slot:[`item.address_1`]="{ item }">
        {{ formatAddress(item) }}
      </template>
      <template v-slot:[`item.valid_from`]="{ item }">
        {{ formatDate(item.valid_from) }}
      </template>
      <template v-slot:[`item.valid_to`]="{ item }">
        {{ formatDate(item.valid_to) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <ClientAddressForm
        :clientName="clientName"
        :clientAddress="clientAddress"
        :isEditMode = "isEditMode"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></ClientAddressForm>
    </v-dialog>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import ClientAddressForm from "@/components/clients/ClientAddressForm";
import admService from "../../services/admService";
import ClientAddressModel from '@/models/clients/ClientAddressModel'

export default {
  name: "ClientAddresses",
  components: {
    ClientAddressForm,
  },
  props: {
    clientId: Number,
    clientName: String,
    clientAddresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      msg: null,
      clientAddress: {},
      search: "",
      headers: [
        { id: 1, value: "id", text: "Id" },
        // , { id: 2, value: 'client_id', text: 'Client Id' }
        { id: 3, value: "address_type", text: "Address Type" },
        { id: 4, value: "address_1", text: "Address" },
        // { id: 5, value: "address_2", text: "Address 2" },
        // { id: 6, value: "city", text: "City" },
        // { id: 7, value: "state", text: "State" },
        // { id: 8, value: "zip", text: "Zip" },
        // { id: 9, value: "country", text: "Country" },
        { id: 10, value: "valid_from", text: "Valid From" },
        { id: 11, value: "valid_to", text: "Valid To" },
        // , { id: 12, value: 'recorded_on', text: 'Recorded On' }
        { id: 20, value: "actions", text: "Actions", sortable: false },
      ],
      editDialog: false,
      isEditMode: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    formatDate(date) {
      return commonService.formatDate(date)
    },
    formatAddress(address) {
      return commonService.formatAddress(address)
    },
    getAddressTypeDesc(addressType) {
      return admService.getDescription("ADDRESSTYPE", addressType)
    },
    showItem(item) {
      this.clientAddress = item;
      this.editDialog = true;
      this.isEditMode = false;
    },
    saveForm( clientAddress) {
      this.$emit('saveItem', this.clientAddresses, clientAddress);
      this.editDialog = false
      this.isEditMode = true;
    },
    cancelForm(item) {
      console.log("cancelForm", item);
      this.clientAddress = item;
      this.editDialog = false;
    },
    addItem() {
      this.clientAddress = ClientAddressModel.newClientAddress();
      this.clientAddress.client_id = this.clientId
      this.clientAddress.country = 'USA'
      this.isEditMode = true;
      this.editDialog = true;
      console.log( this.isEditMode);
    },
  },
  created() {},
};
</script>
<style scoped>
</style>