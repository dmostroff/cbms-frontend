<template>
  <v-form>
    <v-card>
      <v-card-title :md-elevation="2">
        Edit Client {{ person.client_id }} {{ person.first_name }}
        {{ person.last_name }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- <v-col cols="2" md="4">
            <span class="caption">Client Id</span>
            <span class="">{{person.client_id }}</span>
          </v-col> -->
            <v-col cols="2" md="4">
              <v-text-field v-model="person.last_name" label="Last Name">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.first_name" label="First Name">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.middle_name" label="Middle">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              <v-select
                v-model="person.client_status"
                label="Status"
                :items="clientStatuses"
                >
              </v-select>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="2" md="4">
              <div @click="showDOB=!showDOB">Date of Birth3{{showDOB}}</div>
              <v-date-picker v-if="showDOB" v-model="person.dob" label="Date of Birth">
              </v-date-picker>
            </v-col>
            <v-col cols="2" md="4">
              <v-radio-group v-model="person.gender" label="Gender">
                <v-radio
                  v-for="(item, idx) in [
                    ['Male', 'M'],
                    ['Female', 'F'],
                  ]"
                  :key="idx"
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
            </v-col> </v-row
          ><v-row>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.mmn" label="MMN"> </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.email" label="Email">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.pwd" label="Pwd"> </v-text-field>
            </v-col> </v-row
          ><v-row>
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
             </v-row>
             <v-row>
            <v-col cols="2" md="4">
              <v-text-field v-model="person.client_info" label="Client Info">
              </v-text-field>
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
import commonService from '@/services/commonService'
import admService from '@/services/admService'
import clientService from '@/services/clientService'


export default {
  name: "personForm",
  components: {},
  props: {
    clientPerson: Object,
  },
  data() {
    return {
      person: {},
      showDOB: false,
      clientStatuses: [],
    };
  },
  computed: {
    recordedOn: function () {
      return commonService.formatDate(this.person.recordedOn);
    },
  },
  mounted() {
    this.person = commonService.clone(this.clientPerson)
    this.getClientStatuses()
  },
  methods: {
    async getClientStatuses() {
      this.clientStatuses = await admService.getSettingsAsSelectByPrefix('CLIENTSTATUS')
    },
    formatDateTime(recordedOn) {
      return commonService.formatDateTime(recordedOn);
    },
    formatPhone(field) {
      this.$nextTick(() => {
        this.person[field] = commonService.formatPhone(this.person[field]);
      });
    },
    formatSSN() {
      this.$nextTick(() => {
        this.person.ssn = commonService.formatSSN(this.person.ssn);
      });
    },
    async saveForm() {
      let resp = await clientService.postClientPerson( this.person)
      if( 'rc' in resp && resp.rc == 1) {
        this.person = await clientService.getClientPersonById( this.resp.data.id)
        this.$emit("saveForm", this.person);
      }
      console.log( 'save client', this.person)
    },
    cancelForm() {
      // this.person = commonService.clone(this.clientPerson)
      this.$emit("cancel");
    },
  },
  created() {},
};
</script>
<style scoped>
</style>