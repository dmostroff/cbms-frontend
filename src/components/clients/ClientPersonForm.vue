<template>
  <v-form>
    <v-card>
      <v-card-title>
        <ClientCardTitle cardTitle="" :clientPerson="myClientPerson" :itemId="myClientPerson.id" :isReadOnly="isReadOnly"></ClientCardTitle>
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
            <v-col cols="2">
              <v-text-field
                v-model="myClientPerson.client_code"
                label="Client Code"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.last_name"
                label="Last Name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.first_name"
                label="First Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientPerson.middle_name"
                label="Middle"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="myClientPerson.client_status"
                label="Status"
                :items="clientStatuses"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            <v-col justify-end cols="3">Age {{ clientAge }} {{ myClientPerson.dob }}</v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="myClientPerson.dob"
                tag="dob"
                label="Date of Birth"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <!-- <v-col cols="2">
              <v-radio-group
                v-model="myClientPerson.gender"
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
            </v-col> -->
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.ssn"
                label="SSN"
                :keydown="formatSSN()"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.mmn"
                label="MMN"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myClientPerson.email"
                label="Email"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <password
                :pwd="myClientPerson.pwd"
                label="User Password"
                tag="pwd"
                :isReadOnly="isReadOnly"
                :key="randnum"
                @passwordDone="passwordDone"
              >
              </password>
              <!-- <v-text-field
                v-model="myClientPerson.pwd"
                label="Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>-->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.occupation"
                label="Occupation"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientPerson.employer"
                label="Employer"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientPerson.income"
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
                v-model="myClientPerson.phone"
                label="Phone"
                :keydown="formatPhone('phone')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientPerson.phone_2"
                label="Phone 2"
                :keydown="formatPhone('phone_2')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <!-- <v-col cols="4">
              <v-text-field
                v-model="myClientPerson.client_info"
                label="Client Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col> -->
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="myClientPerson.tax_status"
                label="Tax Status"
                :readonly="isReadOnly"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-switch
                v-model="myClientPerson.wise"
                color="green"
                label="Wise"
                hide-details
                readonly
              ></v-switch>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myClientPerson.notes"
                label="Notes"
                :readonly="isReadOnly"
              ></v-text-field>
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
    <v-dialog v-model="msgBox.dialog" class="ma">
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
import ClientCardTitle from "@/components/clients/ClientCardTitle"
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import Password from "@/components/common/Password";
import ClientPersonModel from "@/models/clients/ClientPersonModel";

export default {
  name: "ClientPersonForm",
  components: {
    DialogDatePicker,
    ClientCardTitle,
    EditSaveCancel,
    MessageBox,
    Password,
  },
  props: {
    clientPerson: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      myClientPerson: ClientPersonModel.person(),
      prevClientPerson: {},
      showDOB: false,
      clientStatuses: [],
      otherAccounts: [],
      isReadOnly: true,
      msgBox: {
        dialog: false,
        title: "Client",
        prompt: "",
      },
      randnum: 0,
    };
  },
  computed: {
    isValid() {
      return (
        this.myClientPerson.last_name > "" &&
        this.myClientPerson.first_name > ""
      );
    },
    clientAge() {
      return commonService.getAge(this.myClientPerson["dob"]);
    },
    recorded_on() {
      return commonService.formatDateTime(this.myClientPerson.recorded_on);
    },
  },
  // watch: {
  //   readonly: function (val) {
  //     this.isReadOnly = val;
  //   },
  //   clientPerson: function (val) {
  //     this.myClientPerson.dob =
  //       val && "dob" in val && val.dob
  //         ? val.dob.replace("T", " ").replace("Z", "")
  //         : null;
  //   },
  // },
  mounted() {
    this.dataInit();
    this.getClientStatuses();
    this.isReadOnly = this.readonly;
    this.randnum = Math.random()
  },
  methods: {
    dataInit() {
      if (this.clientPerson) {
        this.myClientPerson = commonService.clone(this.clientPerson);
        this.prevClientPerson = commonService.clone(this.clientPerson);
        if (this.myClientPerson) {
          this.myClientPerson.income = commonService.formatCurrency(
            this.myClientPerson.income
          );
        }
      }
    },
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
        this.myClientPerson[field] = commonService.formatPhone(
          this.myClientPerson[field]
        );
      });
    },
    formatSSN() {
      this.$nextTick(() => {
        this.myClientPerson.ssn = commonService.formatSSN(
          this.myClientPerson.ssn
        );
      });
    },
    formatCurrencyInput(field) {
      this.$nextTick(() => {
        this.myClientPerson[field] = commonService.formatCurrencyInput(
          this.myClientPerson[field]
        );
      });
    },
    datePicker(tag, date) {
      this.myClientPerson[tag] = date;
      if( tag === "dob") {
        this.$emit( "changeDob", date);
      }
    },
    passwordDone(password, tag) {
      this.randnum = Math.random();
      this.myClientPerson[tag] = password;
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // console.log( "Save Form", this.clientPerson)
      let response = await clientService.postClientPerson(this.myClientPerson);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
      // this.isReadOnly = true;
      // console.log("save client", this.response);
    },
    cancelForm() {
      // this.isReadOnly = true;
      this.myClientPerson = commonService.clone(this.prevClientPerson);
      // this.$emit("cancelForm", "ClientPersonForm", clientPerson);
    },
    closeForm() {
      this.$emit("cancelForm", "ClientPersonForm", this.myClientPerson);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
  },
};
</script>
<style scoped>
</style>