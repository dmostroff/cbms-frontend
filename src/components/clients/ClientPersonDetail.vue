<template>
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
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
    <v-dialog v-model="editDialog">
      <ClientPersonForm
        :clientPerson="clientPerson"
        @saveForm="saveForm"
        @cancel="cancelForm"
      ></ClientPersonForm>
    </v-dialog>
      </v-container>
</template>

<script>
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
    },
    cancelForm() {
      this.editDialog = false;
    },
    saveForm( person) {
      this.clientPerson = commonService.clone(person)
      this.editDialog = false;
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