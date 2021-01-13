<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Client Person
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="2" md="4">
            <span class="caption">Client Id</span>
            <span class="">{{clientPerson.client_id }}</span>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.last_name"
              label="Last Name"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.first_name"
              label="First Name"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.middle_name"
              label="Middle"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.dob"
              label="Date of Birth"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.gender"
              label="Gender"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.ssn"
              label="SSN"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.mmn"
              label="MMN"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.email"
              label="Email"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.pwd"
              label="Pwd"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.phone"
              label="Phone"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.phone_2"
              label="Phone 2">
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.phone_cell"
              label="Phone Cell"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.phone_fax"
              label="Phone Fax"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.phone_official"
              label="Phone Official"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.client_info"
              label="Client Info"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="clientPerson.recorded_on"
              label="Recorded On"
              readonly
              >
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="showDetail">Show</v-btn>
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
    aClientPerson: Object
  },
  watch: { 
    aClientPerson: function(newClientPerson) {
      this.clientPerson = JSON.parse(JSON.stringify( newClientPerson));
      console.log( newClientPerson, this.clientPerson)
      },
  },
  data() {
    return {
      clientPerson: {}
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    saveForm() {
      this.$emit( "saveForm", this.clientPerson )
    },
    cancelForm() {
      this.$emit( "cancelClientPersonForm" )
    },
  },
  created() {},
};
</script>
<style scoped>
</style>