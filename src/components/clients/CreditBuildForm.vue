<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <ClientCardTitle :clientPerson="clientPerson" cardTitle="Credit Builder" :itemId="myCreditBuild.id" :isReadOnly="isReadOnly"></ClientCardTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ myCreditBuild.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(myCreditBuild.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="2">
            <v-text-field
              v-model="myCreditBuild.client_id"
              label="Client Id"
              :readonly="isReadOnly"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row> -->

            <!-- <v-col cols="2">
            <v-text-field
              v-model="myCreditBuild.client_name"
              label="Client Name"
              :readonly="isReadOnly"
              >
            </v-text-field>
          </v-col>
        </v-row><v-row> -->

            <v-col cols="4">
              <v-text-field
                v-model="myCreditBuild.bank_name"
                label="Bank Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myCreditBuild.account_login"
                label="Account Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myCreditBuild.account_pwd"
                label="Account Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
             </v-row><v-row>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCreditBuild.start_date"
                tag="start_date"
                label="Start Date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCreditBuild.end_date"
                tag="end_date"
                label="End Date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="myCreditBuild.bank_account"
                label="Bank Account"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
             </v-row><v-row>

            <v-col cols="3">
              <DialogDatePicker
                :date="myCreditBuild.payment_date"
                tag="payment_date"
                label="Payment Date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCreditBuild.reconciled_on"
                tag="reconciled_on"
                label="Reconciled On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCreditBuild.applied_on"
                tag="applied_on"
                label="Applied On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
             </v-row><v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myCreditBuild.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myCreditBuild.task"
                label="Task"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <!-- <v-col cols="2">
              <v-text-field
                v-model="myCreditBuild.credit_info"
                label="Credit Info"
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
// import admService from '@/services/admService'
import creditBuildService from "@/services/creditBuildService";
import ClientCardTitle from "@/components/clients/ClientCardTitle";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import DialogDatePicker from "@/components/common/DialogDatePicker";

export default {
  value: "CreditBuild",
  components: {
    ClientCardTitle,
    EditSaveCancel,
    MessageBox,
    DialogDatePicker,
  },
  props: {
    clientPerson: String,
    creditBuild: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myCreditBuild: {},
      prevCreditBuild: null,
      isReadOnly: true,
      msgBox: {
        dialog: false,
        prompt: ["", ""],
      },
    };
  },
  computed: {
    isValid: () => {
      return true;
      // if( !this.myCreditBuild) {
      //   return false;
      // }
      // return this.myCreditBuild && this.myCreditBuild['bank_name'] > '';
    },
  },
  mounted() {
    this.myCreditBuild = commonService.clone(this.creditBuild);
    this.prevCreditBuild = commonService.clone(this.creditBuild);
    this.isReadOnly = this.readonly;
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async saveForm() {
      let response = await creditBuildService.postCreditBuild(this.creditBuild);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Credit Build",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      let creditBuild = commonService.clone(this.prevCreditBuild);
      this.$emit("cancelForm", creditBuild);
    },
    closeForm() {
      this.$emit("closeForm", this.creditBuild);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
    editForm() {
      this.isReadOnly = false;
    },
    datePicker(tag, date) {
      this.myCreditBuild[tag] = date;
    },
  },
};
</script>
<style scoped>
</style>