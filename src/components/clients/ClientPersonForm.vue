<template>
<v-form>
  <v-card>
    <v-card-title :md-elevation="2">
      Edit Client {{clientPerson.client_id }} {{clientPerson.first_name}} {{clientPerson.last_name}}
    </v-card-title>
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
            <v-date-picker
              v-model="clientPerson.dob"
              label="Date of Birth"
              >
            </v-date-picker>
          </v-col>
          <v-col cols="2" md="4">
            <v-list><v-list-item-group
              v-model="clientPerson.gender"
              label="Gender"
              >
              <v-list-item v-for="(item, idx) in ['Male', 'Female']" :key="idx">
                <v-list-item-content>{{ item}}</v-list-item-content>
              </v-list-item>
              </v-list-item-group></v-list>
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
            <label>Recorded On</label> {{recordedOn}}
            </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="saveForm">Save</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>
import cs from '@/services/commonService'

export default {
  name: "ClientPersonForm",
  components: {
  },
  props: {
    aClientPerson: Object
  },
  watch: { 
    aClientPerson: function(newClientPerson) {
      let clientPerson = {}
      Object.keys(newClientPerson).forEach( (k) => clientPerson[k] = newClientPerson[k]);
      this.clientPerson = clientPerson
      console.log( newClientPerson, this.clientPerson)
      },
  },
  data() {
    return {
      clientPerson: {}
    };
  },
  computed: {
    recordedOn: function() { return cs.formatDate( this.clientPerson.recordedOn)}
  },
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