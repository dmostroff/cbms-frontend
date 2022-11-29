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
      <v-spacer></v-spacer>
      <div class="d-flex" @click="addItem">{{this.randnum}} Add <v-icon>mdi-plus-circle-outline</v-icon></div>
    </v-card-title>
    <v-data-table
      :items="clientAddresses"
      :headers="headers"
      :footer-props="{}"
      :search="search"
    >
    <template v-slot:[`item.is_current`]="{ item }" class="title">
      #{{item.is_current}}#
      <v-switch
      :class="item.is_current == 'Y' ? 'title' : ''"
                v-model="item.is_current"
                label="Current"
                color="green"
                value="Y"
                hide-details
                :readonly="true"
              >
              </v-switch>
      </template>
      <!-- <template v-slot:[`item.street_address`]="{ item }">
        <div :class="item.is_current == 'Y' ? 'title' : ''">{{ formatAddress(item) }}</div>
      </template> -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog">
      <ClientAddressForm
        :clientName="clientName"
        :clientAddress="clientAddress"
        :isReadOnly = "isReadOnly"
        @editForm="editForm"
        @cancelForm="cancelForm"
        @closeForm="editDialog = false"
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
    randnum: Number,
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
        { id: 2, value: 'client_code', text: 'Client Code' },
        { id: 3, value: "is_current", text: "Is Current" },
        { id: 4, value: "street_address", text: "Address" },
        { id: 6, value: "city", text: "City" },
        { id: 7, value: "state", text: "State" },
        { id: 8, value: "zip", text: "Zip" },
        // { id: 9, value: "country", text: "Country" },
        // , { id: 12, value: 'recorded_on', text: 'Recorded On' }
        { id: 20, value: "actions", text: "Actions", sortable: false },
      ],
      editDialog: false,
      isReadOnly: false,
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
    editItem(item) {
      this.clientAddress = item;
      this.editDialog = true;
    },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm( clientAddress) {
      this.editDialog = false;
      this.$emit('saveItem', this.clientAddresses, clientAddress);
    },
    closeForm() {
      this.editDialog = false;
    },
    cancelForm() {
      this.editDialog = false;
    },
    addItem() {
      this.myClientAddress = ClientAddressModel.newClientAddress(this.clientId);
      this.isReadOnly = false;
      this.editDialog = true;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>