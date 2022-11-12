<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Loan {{ rand }}</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2"
            >{{ clientName }}
            <span align-self-end class="caption mx-4"
              >{{ clientLoan.client_id }}
            </span>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ myClientLoan.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" class="caption">
              Client Code: {{ myClientLoan.client_code }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(myClientLoan.recorded_on) }}
            </v-col> </v-row
          ><v-row>
            <v-col cols="1">
              <v-text-field
                v-model="myClientLoan.xero_id"
                label="Xero Id"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientLoan.first_name"
                label="First Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientLoan.last_name"
                label="Last Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="myClientLoan.loan_status"
                label="Loan Status"
                :readonly="isReadOnly"
                :items="loanStatuses"
              >
              </v-select>
            </v-col> </v-row
          ><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myClientLoan.card_name"
                label="Card Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientLoan.loan_number"
                label="Loan Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="myClientLoan.credit_line"
                label="Credit Line"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="myClientLoan.device"
                label="Device"
                :readonly="isReadOnly"
                :items="devices"
              >
              </v-select>
            </v-col> </v-row
          ><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myClientLoan.login"
                label="Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientLoan.pwd"
                label="Loan Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="2">
              <DialogDatePicker
                :date="myClientLoan.open_date"
                tag="open_date"
                label="Open Date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="myClientLoan.reconciled_on"
                tag="reconciled_on"
                label="Reconciled On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="myClientLoan.due_on"
                tag="due_on"
                label="Due On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="myClientLoan.maturity_on"
                tag="maturity_on"
                label="Maturity On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col> </v-row
          ><v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myClientLoan.loan_info"
                label="Loan Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myClientLoan.task"
                label="Task"
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
import clientLoanService from "@/services/clientLoanService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import DialogDatePicker from "@/components/common/DialogDatePicker";

export default {
  value: "ClientLoan",
  components: {
    EditSaveCancel,
    MessageBox,
    DialogDatePicker,
  },
  props: {
    clientName: String,
    clientLoan: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myClientLoan: {},
      prevClientLoan: null,
      isReadOnly: true,
      msgBox: {
        dialog: false,
        prompt: ["", ""],
      },
      rand: "",
      devices: [],
      loanStatuses: [],
    };
  },
  computed: {
    isValid: () => {
      return true;
      // return this.myClientLoan && this.myClientLoan.client_id > '' && this.myClientLoan.loan_num > '';
    },
  },
  mounted() {
    this.myClientLoan = commonService.clone(this.clientLoan);
    this.prevClientLoan = commonService.clone(this.clientLoan);
    this.isReadOnly = this.readonly;
    this.getDevices();
    this.getLoanStatuses();
  },
  created() {
    this.rand = Math.round(Math.random() * 1000);
  },
  methods: {
    async getDevices() {
      this.devices = await admService.getSettingsAsSelectByPrefix("DEVICE");
    },
    async getLoanStatuses() {
      this.loanStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
      );
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async saveForm() {
      let response = await clientLoanService.postClientLoan(this.myClientLoan);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client Loan",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      let clientLoan = commonService.clone(this.prevClientLoan);
      this.$emit("cancelForm", clientLoan);
    },
    closeForm() {
      this.$emit("closeForm", this.clientLoan);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
    editForm() {
      this.isReadOnly = false;
    },
    datePicker(tag, date) {
      this.myClientLoan[tag] = date;
    },
  },
};
</script>
<style scoped>
</style>