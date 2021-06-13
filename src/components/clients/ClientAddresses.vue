<template>
  <div>
    <div v-if="clientAddress.msg" xs12>{{ clientAddress.msg }}</div>
    <div v-if="clientAddresses">
    <v-data-table
      title="Client Address"
      :items="clientAddresses"
      :headers="headers"
    ></v-data-table>
    </div>
    <!-- <v-dialog v-model="dialogDetail">
      <ClientAddressDetail
        :clientAddressId="clientAddressId"
        @editClientPersonForm="editClientAddressForm"
        @cancelClientAddressDetail="cancelClientAddressDetail"
      ></ClientAddressDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <ClientAddressForm
        :aclientAddress="clientAddress"
        @cancelClientAddressForm="cancelClientAddressForm"
        @saveForm="saveForm"
      ></ClientAddressForm>
    </v-dialog> -->
  </div>
</template>

<script>
// import client_addressService from "@/services/client_addressService";

export default {
  name: "ClientAddresses",
  components: {
  },
  props: {
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
      clientAddress: {},
      headers: [
      { id: 1, value: 'address_id', text: 'Address Id' }
      , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'address_type', text: 'Address Type' }
      , { id: 4, value: 'address_1', text: 'Address 1' }
      , { id: 5, value: 'address_2', text: 'Address 2' }
      , { id: 6, value: 'city', text: 'City' }
      , { id: 7, value: 'state', text: 'State' }
      , { id: 8, value: 'zip', text: 'Zip' }
      , { id: 9, value: 'country', text: 'Country' }
      , { id: 10, value: 'valid_from', text: 'Valid From' }
      , { id: 11, value: 'valid_to', text: 'Valid To' }
      , { id: 12, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // async getClientAddress() {
    //     // this.response = await client_addressService.getClientAddress();
    // }
  },
  created() {},
};
</script>
<style scoped>
</style>