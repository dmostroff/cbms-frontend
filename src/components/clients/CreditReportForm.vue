<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <ClientCardTitle :clientPerson="clientPerson" cardTitle="Credit Report" :itemId="myCreditReport.id" :isReadOnly="isReadOnly"></ClientCardTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
              v-model="myCreditReport.credit_bureau"
              label="Credit Bureau"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(myCreditReport.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myCreditReport.login"
                label="Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <password
                :pwd="myCreditReport.pwd"
                label="Password"
                tag="pwd"
                :isReadOnly="isReadOnly"
                :key="randnum"
                @passwordDone="passwordDone"
              >
              </password>
            </v-col>
            <v-col cols="3">
              <v-text-field
              v-model="myCreditReport.pin"
              label="Pin"
              :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          <!-- </v-row><v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myCreditReport.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myCreditReport.task"
                label="Task"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col> -->
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
import creditReportService from "@/services/creditReportService";
import CreditReportModel from "@/models/clients/CreditReportModel";
import ClientCardTitle from "@/components/clients/ClientCardTitle";
import Password from "@/components/common/Password";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";

export default {
  value: "CreditReportForm",
  components: {
    ClientCardTitle,
    Password,
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientPerson: Object,
    creditReport: Object,
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myCreditReport: CreditReportModel.creditReport(),
      prevCreditReport: null,
      msgBox: {
        title: "Credit Report",
        dialog: false,
        prompt: ["", ""],
      },
      randnum: Math.random()
    };
  },
  computed: {
    isValid: () => {
      return true;
      // return this.myCreditReport && this.myCreditReport.client_id > '' && this.myCreditReport.loan_num > '';
    },
  },
  created() {
    this.myCreditReport = CreditReportModel.creditReport;
    this.randnum = Math.round(Math.random() * 1000);
  },
  mounted() {
    this.dataInit();
  },
  methods: {
    dataInit() {
      this.myCreditReport = commonService.clone(this.creditReport);
      console.log( this.myCreditReport);
      this.prevCreditReport = commonService.clone(this.creditReport);
    },
    async saveForm() {
      let response = await creditReportService.postCreditReport(this.myCreditReport);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Credit Report",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      let creditReport = commonService.clone(this.prevCreditReport);
      this.$emit("cancelForm", creditReport);
    },
    closeForm() {
      this.$emit("closeForm", this.creditReport);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
    editForm() {
      // this.isReadOnly = false;
    },
    datePicker(tag, date) {
      this.myCreditReport[tag] = date;
    },
    passwordDone(password, tag) {
      this.randnum = Math.random();
      this.myCreditReport[tag] = password;
    },
    formatDateTime( datetime) {
      return commonService.formatDateTime(datetime);
    },
  },
};
</script>
<style scoped>
</style>