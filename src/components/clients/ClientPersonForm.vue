<template>
<v-form>
  <v-card>
    <v-card-title :md-elevation="2">
      Edit Client {{person.client_id }} {{person.first_name}} {{person.last_name}}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <!-- <v-col cols="2" md="4">
            <span class="caption">Client Id</span>
            <span class="">{{person.client_id }}</span>
          </v-col> -->
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.last_name"
              label="Last Name"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.first_name"
              label="First Name"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.middle_name"
              label="Middle"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-date-picker
              v-model="person.dob"
              label="Date of Birth"
              >
            </v-date-picker>
          </v-col>
          <v-col cols="2" md="4">
            <v-radio-group 
              v-model="person.gender"
              label="Gender"
              >
              <v-radio v-for="(item, idx) in [['Male', 'M'], ['Female', 'F']]" :key="idx" 
                :value="item[1]"
                :label="item[0]"
                >
              </v-radio>
              </v-radio-group>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.ssn"
              label="SSN"
              :keydown="formatSSN()"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.mmn"
              label="MMN"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.email"
              label="Email"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.pwd"
              label="Pwd"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.phone"
              label="Phone"
              :keydown="formatPhone('phone')"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.phone_2"
              label="Phone 2"
              :keydown="formatPhone('phone_2')"
              >
            </v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.phone_cell"
              label="Phone Cell"
              :keydown="formatPhone('phone_2')"
              >
            </v-text-field>
          </v-col>
          <!-- <v-col cols="2" md="4">
            <v-text-field
              v-model="person.phone_fax"
              label="Phone Fax"
              >
            </v-text-field>
          </v-col> -->
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.phone_official"
              label="Phone Official"
              :keydown="formatPhone('phone_official')"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col cols="2" md="4">
            <v-text-field
              v-model="person.client_info"
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
import commonService from '../../services/commonService';

export default {
  name: "personForm",
  components: {
  },
  props: {
    clientPerson: Object,
    clientStatuses: Array,
  },
  watch: { 
    personId: function(newpersonId) {
      this.getpersonByClientId( newpersonId)
      },
  },
  data() {
    return {
      person: {}
    };
  },
  computed: {
    recordedOn: function() { return cs.formatDate( this.person.recordedOn)}
  },
  mounted() {
    this.person = this.clientPerson
  },
  methods: {
    formatPhone( field) {
      this.$nextTick(() => {
        this.person[field] = commonService.formatPhone( this.person[field]);
        })
    },
    formatSSN () {
      this.$nextTick(() => {
        this.person.ssn = commonService.formatSSN( this.person.ssn);
        })
    },
    function(event) {
      console.log(event)
      this.$nextTick(() => {
        this.person.phone = commonService.formatPhone( this.person.phone);
        })
    },
    saveForm() {
      this.$emit( "saveForm", this.person )
    },
    cancelForm() {
      this.$emit( "cancelpersonForm" )
    },
    async getpersonByClientId( clientId) {
      console.log( clientId)
      this.response = await cs.getpersonByClientId( clientId)
      console.log( this.response)
      if( this.response && this.response.rc == 1) {
        this.person = this.response.data[0];
        let client_status = this.person.client_status;
        this.clientStatus = this.clientStatuses.filter( e => e.value === client_status)[0].text;
      }
    },
  },
  created() {
    this.getpersonByClientId(this.personId)
  },
};
</script>
<style scoped>
</style>