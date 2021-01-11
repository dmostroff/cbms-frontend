<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Client Person
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            
            <span class="caption">Client Id</span>
            <span class="">{{clientPerson.client_id }}</span>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.last_name"
              label="First Name"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.first_name"
              label="Middle Name"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.middle_name"
              label="Dob"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.dob"
              label="Gender"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.gender"
              label="Ssn"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.ssn"
              label="Mmn"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.mmn"
              label="Email"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.email"
              label="Pwd"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.pwd"
              label="Phone"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.phone"
              label="Phone 2"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.phone_2"
              label="Phone Cell"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.phone_cell"
              label="Phone Fax"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.phone_fax"
              label="Phone Official"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.phone_official"
              label="Client Info"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.client_info"
              label="Recorded On"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="clientPerson.recorded_on"
              label=""
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>

export default {
  name: "ClientPersonForm",
  components: {
  },
  props: {
//    clientPerson: Object
  },
  data() {
    return {
      clientPerson: {
        client_id: null
        , client_info: null
        , dob: null
        , email: null
        , first_name: null
        , gender: null
        , last_name: null
        , middle_name: null
        , mmn: null
        , phone: null
        , phone_2: null
        , phone_cell: null
        , phone_fax: null
        , phone_official: null
        , pwd: null
        , recorded_on: null
        , ssn: null
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editClientPersonForm" )
    },
    cancelForm() {
      this.$emit( "cancelClientPersonForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>