<template>
  <v-form>
    <div v-if="clientPerson">
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientName }} ## isReadOnly: {{ isReadOnly }}## isValid: {{ isValid }}</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ clientPerson.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ recorded_on }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="clientPerson.last_name" label="Last Name">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="clientPerson.first_name"
                label="First Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="clientPerson.middle_name"
                label="Middle"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="clientPerson.client_status"
                label="Status"
                :items="clientStatuses"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="clientPerson.dob"
                tag="dob"
                label="Date of Birtha"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <v-radio-group
                v-model="clientPerson.gender"
                label="Gender"
                :readonly="isReadOnly"
              >
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
            <v-col cols="3">
              <v-text-field
                v-model="clientPerson.ssn"
                label="SSN"
                :keydown="formatSSN()"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="clientPerson.mmn"
                label="MMN"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="clientPerson.email"
                label="Email"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.pwd"
                label="Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.occupation"
                label="Occupation"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.employer"
                label="Employer"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.income"
                label="Income"
                :keydown="formatCurrencyInput('income')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.phone"
                label="Phone"
                :keydown="formatPhone('phone')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientPerson.phone_2"
                label="Phone 2"
                :keydown="formatPhone('phone_2')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="clientPerson.client_info"
                label="Client Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
          :isValid="isValid"
          @editForm="editForm"
          @saveForm="saveForm"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
    </div>
    <v-dialog v-model="msgBox.dialog"
      class="ma">
      <MessageBox
        :title="msgBox.title"
        :prompt="msgBox.prompt"
        :isError="true"
        @close="messageBoxClose"
      ></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import clientService from "@/services/clientService";
import DialogDatePicker from "@/components/common/DialogDatePicker";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox"

export default {
  name: "ClientPersonForm",
  components: {
    DialogDatePicker,
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientName: String,
    clientPerson: Object,
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      prevClientPerson: {},
      showDOB: false,
      clientStatuses: [],
      isReadOnly: true,
      msgBox: {
        dialog: false,
        title: "Client",
        prompt: ""
      },
    };
  },
  computed: {
    isValid() {
      return this.clientPerson.last_name > ''
        && this.clientPerson.first_name > ''
        ;
    },
    recorded_on() {
      return commonService.formatDateTime(this.clientPerson.recorded_on)
    }
  },
  watch: {
    readonly: function (val) {
      this.isReadOnly = val;
    },
    clientPerson: function( val) {
      this.clientPerson.dob = (val && 'dob' in val && val.dob) ? val.dob.replace('T', ' ').replace('Z', '') : null;
    }
  },
  mounted() {
    this.prevClientPerson = commonService.clone(this.clientPerson);
    if(this.clientPerson) {
      this.clientPerson.income = commonService.formatCurrency(this.clientPerson.income)
    }
    this.getClientStatuses();
    this.isReadOnly = this.readonly
  },
  methods: {
    async getClientStatuses() {
      this.clientStatuses = await admService.getSettingsAsSelectByPrefix(
        "CLIENTSTATUS"
      );
    },
    formatDate(field) {
      return commonService.formatDate(field);
    },
    formatPhone(field) {
      this.$nextTick(() => {
        this.clientPerson[field] = commonService.formatPhone(
          this.clientPerson[field]
        );
      });
    },
    formatSSN() {
      this.$nextTick(() => {
        this.clientPerson.ssn = commonService.formatSSN(this.clientPerson.ssn);
      });
    },
    formatCurrencyInput(field) {
      this.$nextTick(() => {
        this.clientPerson[field] = commonService.formatCurrencyInput(
          this.clientPerson[field]
        );
      });
    },
    datePicker(tag, date) {
      this.clientPerson[tag] = date;
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      console.log( "Save Form", this.clientPerson)
      let response = await clientService.postClientPerson(this.clientPerson);
      if( !commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = ['Unable to save Client', ` ${response.rc}] ${response.msg}`];
      }

      // if( 'rc' in resp && resp.rc == 1) {
      //   this.person = await clientService.getClientPersonById( this.resp.data.id)
      // }
      this.isReadOnly = true;
      console.log("save client", this.response);
    },
    cancelForm() {
      this.isReadOnly = true;
      let clientPerson = commonService.clone(this.prevClientPerson);
      this.$emit("cancelForm", "ClientPersonForm", clientPerson);
    },
    closeForm() {
      console.log( this)
      this.$emit("cancelForm", "ClientPersonForm", this.clientPerson);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>