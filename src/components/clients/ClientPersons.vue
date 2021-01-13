<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>HelpClient Person
    <MenuDisplay title="Client" :menuItems="menuItems"></MenuDisplay>
    <div v-if="response.msg" xs12>{{ response.msg}}</div>
    <!-- <div v-if="isRequest">
        <ClientPersonForm></ClientPersonForm>
    </div> -->
    <div v-if="response.data">
    <v-data-table
      title="Client Person"
      :items="response.data"
      :headers="headers"
      @click:row="handleClick"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
      <ClientPersonDetail 
        :clientPersonId="clientPersonId"
        @editClientPersonForm="editClientPersonForm"
        @cancelClientPersonDetail="cancelClientPersonDetail"
        ></ClientPersonDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <ClientPersonForm :clientPersonId="clientPerson"
        @cancelClientPersonForm="cancelClientPersonForm"
        @saveForm="saveForm"
      ></ClientPersonForm>
    </v-dialog>
  </div>
</template>

<script>
import clientService from '@/services/clientService'
import BeatLoader from '@/components/common/Spinner'
import MenuDisplay from '@/components/common/MenuDisplay'
import ClientPersonDetail from './ClientPersonDetail.vue';
import ClientPersonForm from '@/components/clients/ClientPersonForm'

export default {
  value: "ClientPersons",
  components: {
    BeatLoader,
    MenuDisplay,
    ClientPersonDetail,
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
        data: []
      },
      clientPerson: null,
      clientPersonId: 0,
      headers: [
      { id: 1, value: 'client_id', text: 'Client Id' }
      , { id: 2, value: 'last_name', text: 'Last Name' }
      , { id: 3, value: 'first_name', text: 'First Name' }
      , { id: 4, value: 'middle_name', text: 'Middle Name' }
      , { id: 5, value: 'dob', text: 'Dob' }
      , { id: 6, value: 'gender', text: 'Gender' }
      , { id: 7, value: 'ssn', text: 'Ssn' }
      , { id: 8, value: 'mmn', text: 'Mmn' }
      , { id: 9, value: 'email', text: 'Email' }
      , { id: 10, value: 'pwd', text: 'Pwd' }
      , { id: 11, value: 'phone', text: 'Phone' }
      , { id: 12, value: 'phone_2', text: 'Phone 2' }
      , { id: 13, value: 'phone_cell', text: 'Phone Cell' }
      , { id: 14, value: 'phone_fax', text: 'Phone Fax' }
      , { id: 15, value: 'phone_official', text: 'Phone Official' }
      , { id: 16, value: 'client_info', text: 'Client Info' }
      , { id: 17, value: 'recorded_on', text: 'Recorded On' }
      ],
      menuItems: [
        { prompt: "Detail", link: { name: 'persondetail' }},
        { prompt: "Edit", link: { name: 'personform' }},
      ],
      dialogDetail: false,
      dialogDetailEdit: false,
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
    handleClick( rowValue) {
      this.clientPersonId = rowValue.client_id
      this.dialogDetail = true;
    },
    editClientPersonForm( clientPerson) {
      this.clientPerson = clientPerson;
      this.dialogDetailEdit = true;
      this.dialogDetail = false;
    },
    cancelClientPersonDetail() {
      this.dialogDetail = false;
    },
    saveForm( clientPerson) {
      this.clientPerson = clientPerson;
      this.dialogDetailEdit = false;
    },
    cancelClientPersonForm() {
      this.dialogDetailEdit = false;
    }
  },
  created() {
    this.getClientPersons()
  },
};
</script>
<style scoped>
</style>