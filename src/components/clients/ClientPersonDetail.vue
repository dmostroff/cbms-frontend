<template>
  <v-card>
    <v-card-title :md-elevation="2">
      Client Person
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Client Id</span>:</v-col>
          <v-col>
            {{clientPerson.client_id}}
          </v-col>
          <v-col><span class="subtitle-2">Last Name</span>:</v-col>
          <v-col>
            {{clientPerson.last_name}}
          </v-col>
          <v-col><span class="subtitle-2">First Name</span>:</v-col>
          <v-col>
            {{clientPerson.first_name}}
          </v-col>
          <v-col><span class="subtitle-2">Middle Name</span>:</v-col>
          <v-col>
            {{clientPerson.middle_name}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Dob</span>:</v-col>
          <v-col>
            {{clientPerson.dob}}
          </v-col>
          <v-col><span class="subtitle-2">Gender</span>:</v-col>
          <v-col>
            {{clientPerson.gender}}
          </v-col>
          <v-col><span class="subtitle-2">Ssn</span>:</v-col>
          <v-col>
            {{clientPerson.ssn}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Mmn</span>:</v-col>
          <v-col>
            {{clientPerson.mmn}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Email</span>:</v-col>
          <v-col>
            {{clientPerson.email}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Pwd</span>:</v-col>
          <v-col>
            {{clientPerson.pwd}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Phone</span>:</v-col>
          <v-col>
            {{clientPerson.phone}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Phone 2</span>:</v-col>
          <v-col>
            {{clientPerson.phone_2}}
          </v-col>
          <v-col><span class="subtitle-2">Phone Cell</span>:</v-col>
          <v-col>
            {{clientPerson.phone_cell}}
          </v-col>
          <v-col><span class="subtitle-2">Phone Fax</span>:</v-col>
          <v-col>
            {{clientPerson.phone_fax}}
          </v-col>
          <v-col><span class="subtitle-2">Phone Official</span>:</v-col>
          <v-col>
            {{clientPerson.phone_official}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Client Info</span>:</v-col>
          <v-col>
            {{clientPerson.client_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Recorded On</span>:</v-col>
          <v-col>
            {{clientPerson.recorded_on}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import cs from '@/services/clientService'

export default {
  value: "ClientPersonDetail",
  components: {
  },
  props: {
    clientPersonId: Number
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
      clientPerson: {}
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editClientPersonForm", this.clientPerson )
    },
    cancelForm() {
      this.$emit( "cancelClientPersonDetail" )
    },
    async getClientPersonByClientId( clientId) {
      this.response = await cs.getClientPersonByClientId( clientId)
      console.log( this.response)
      if( this.response && this.response.rc == 1) {
        this.clientPerson = this.response.data[0];
      }

    }
  },
  created() {
    this.getClientPersonByClientId(this.clientPersonId)
  },
};
</script>
<style scoped>
</style>