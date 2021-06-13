<template>
  <v-card>
    <v-card-title :md-elevation="2">
      <v-layout class="layout" row red>
        <v-flex v-if="showTitle" align-self-start>
      {{clientPerson.client_id}}] {{clientPerson.last_name}}, {{clientPerson.first_name}} {{clientPerson.middle_name}}
        </v-flex>
        <v-flex align-self-start>Help</v-flex>
        <v-flex align-self-end xs12>
          <v-btn small @click="editForm" align-self-end><v-icon>mdi-pencil</v-icon> Edit</v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Status</span>: 
            {{clientPerson.client_status_desc}}
          </v-col>
          <v-col><span class="subtitle-2">Dob</span>:
            {{formatDate(clientPerson.dob)}}
          </v-col>
          <v-col><span class="subtitle-2">Gender</span>:
            {{clientPerson.gender}}
          </v-col>
          <v-col><span class="subtitle-2">Ssn</span>:
            {{ formatSSN(clientPerson.ssn) }}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Mmn</span>: {{clientPerson.mmn}}
          </v-col>
          <v-col><span class="subtitle-2">Email</span>: {{clientPerson.email}}
          </v-col>
        <!-- </v-row><v-row>
          <v-col><span class="subtitle-2">Pwd</span>:</v-col>
          <v-col>
            {{clientPerson.pwd}}
          </v-col> -->
        </v-row><v-row>
          <v-col><span class="subtitle-2">Phone</span>: {{ formatPhone(clientPerson.phone) }}
          </v-col>
          <v-col><span class="subtitle-2">Phone Cell</span>: {{clientPerson.phone_cell}}
          </v-col>
          <v-col><span class="subtitle-2">Phone Official</span>: {{clientPerson.phone_official}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Client Info</span>:</v-col>
          <v-col>
            {{clientPerson.client_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Recorded On</span>:</v-col>
          <v-col>
            {{formatDateTime(clientPerson.recorded_on)}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
    <v-dialog v-model="editDialog">
      <ClientPersonForm :clientPerson="clientPerson"></ClientPersonForm>
    </v-dialog>
  </v-card>
</template>

<script>
import cs from '@/services/clientService'
import commonService from '@/services/commonService'
import ClientPersonForm from '@/components/clients/ClientPersonForm'

export default {
  value: "ClientPersonDetail",
  components: {
    ClientPersonForm
  },
  props: {
    clientPerson: Object,
    clientPersonId: Number,
    clientStatuses: Array,
    showTitle: {
      type: Boolean,
      default: true
    },
  },
  watch: { 
    clientPersonId: function(newClientPersonId) {
      this.getClientPersonByClientId( newClientPersonId)
      },
  },
  data() {
    return {
      response: {
        rc: 0,
        msg: '',
        data: []
      },
      clientStatus: "",
      editDialog: false,
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    editForm() {
      this.editDialog = true
      // this.$emit( "editClientPersonForm", this.clientPerson )
    },
    cancelForm() {
      this.$emit( "cancelClientPersonDetail" )
    },
    async getClientPersonByClientId( clientId) {
      this.response = await cs.getClientPersonByClientId( clientId)
      console.log( this.response)
      if( this.response && this.response.rc == 1) {
        this.clientPerson = this.response.data[0];
        let client_status = this.clientPerson.client_status;
        this.clientStatus = this.clientStatuses.filter( e => e.value === client_status)[0].text;
      }

    },
    formatDate( date) {
      return commonService.formatDate( date)
    },
    formatDateTime( datetime) {
      return commonService.formatDateTime( datetime)
    },
    formatPhone( phone) {
      return commonService.formatPhone( phone)
    },
    formatSSN( ssn) {
      return commonService.formatSSN(ssn)
    }
  },
  created() {
    // this.getClientPersonByClientId(this.clientPersonId)
  },
};
</script>
<style scoped>
</style>