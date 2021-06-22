<template>
  <div>
    <div v-if="msg" xs12>{{ msg }}</div>
    <div v-if="clientAddresses">
    <v-data-table
      :items="clientAddresses"
      :headers="headers"
    >
    <template v-slot:item.address_type="{ item }">
      {{getAddressTypeDesc( item.address_type)}}
    </template>
    <template v-slot:item.valid_from ="{ item }">
      {{formatDate( item.valid_from)}}
    </template>
    <template v-slot:item.valid_to ="{ item }">
      {{formatDate( item.valid_to)}}
    </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="showItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    </div>
    <v-dialog v-model="editDialog">
      <ClientAddressForm
        :clientName="clientName"
        :clientAddress="clientAddress"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></ClientAddressForm>
    </v-dialog>
  </div>
</template>

<script>
import commonService from "@/services/commonService";
import ClientAddressForm from '@/components/clients/ClientAddressForm'
import admService from '../../services/admService';

export default {
  name: "ClientAddresses",
  components: {
    ClientAddressForm,
  },
  props: {
    clientName: String,
    clientAddresses: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      msg: null,
      clientAddress: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      // , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'address_type', text: 'Address Type' }
      , { id: 4, value: 'address_1', text: 'Address 1' }
      , { id: 5, value: 'address_2', text: 'Address 2' }
      , { id: 6, value: 'city', text: 'City' }
      , { id: 7, value: 'state', text: 'State' }
      , { id: 8, value: 'zip', text: 'Zip' }
      , { id: 9, value: 'country', text: 'Country' }
      , { id: 10, value: 'valid_from', text: 'Valid From' }
      , { id: 11, value: 'valid_to', text: 'Valid To' }
      // , { id: 12, value: 'recorded_on', text: 'Recorded On' }
      , { id: 20, value: "actions", text: "Actions", sortable: false }
      ],
      editDialog: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    formatDate(date) {
      return commonService.formatDate(date)
    },
    getAddressTypeDesc( addressType) {
      return admService.getDescription( 'ADDRESSTYPE', addressType)
    },
    showItem(item) {
      this.clientAddress = item
      this.editDialog = true
    },
    async saveForm( ) {
      this.editDialog = false
      // this.clientCcAccount = item
    },
    cancelForm( item) {
      console.log( 'cancelForm', item)
      this.clientAddress = item
      this.editDialog = false
    }
  },
  created() {},
};
</script>
<style scoped>
</style>