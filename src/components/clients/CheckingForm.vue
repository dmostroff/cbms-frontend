<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Loan
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">
            <span align-self-end class="caption mx-4"
              >{{ myChecking.client_id }}
            </span>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ myChecking.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(myChecking.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.cbms_id"
                label="Cbms Id"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myChecking.bank_name"
                label="Bank Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.routing_num"
                label="Routing Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.account_num"
                label="Account Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <DialogDatePicker
                :date="myChecking.open_date"
                tag="open_date"
                label="Open Date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.account_login"
                label="Account Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.account_pwd"
                label="Account Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myChecking.debit_card"
                label="Debit Card"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_exp"
                label="Debit Exp"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_cvv"
                label="Debit Cvv"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_pin"
                label="Debit Pin"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="2">
              <v-text-field v-model="myChecking.debit_info" label="Debit Info" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row> -->
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.account_status"
                label="Account Status"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myChecking.reconciled_on"
                tag="reconciled_on"
                label="Reconciled On"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.zelle"
                label="Zelle"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.wise"
                label="Wise"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.paypal"
                label="Paypal"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.is_significant"
                label="Is Significant"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myChecking.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.task"
                label="Task"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          <!-- </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.checking_info"
                label="Checking Info"
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
import checkingService from "@/services/checkingService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import DialogDatePicker from "@/components/common/DialogDatePicker";

export default {
  value: "Checking",
  components: {
    EditSaveCancel,
    MessageBox,
    DialogDatePicker,
  },
  props: {
    checking: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myChecking: {},
      prevChecking: null,
      isReadOnly: true,
      msgBox: {
        dialog: false,
        prompt: ["", ""],
      },
      rand: "",
    };
  },
  computed: {
    isValid: () => {
      return true;
      // return this.checking;
    },
  },
  mounted() {
    this.myChecking = commonService.clone(this.checking);
    this.prevChecking = commonService.clone(this.checking);
    this.isReadOnly = this.readonly;
  },
  created() {
    this.rand = Math.round(Math.random() * 1000);
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async saveForm() {
      let response = await checkingService.postChecking(this.checking);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Checking",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      let checking = commonService.clone(this.prevChecking);
      this.$emit("cancelForm", checking);
    },
    closeForm() {
      this.$emit("closeForm", this.checking);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
    editForm() {
      this.isReadOnly = false;
    },
    datePicker(tag, date) {
      this.myChecking[tag] = date;
    },
  },
};
</script>
<style scoped>
</style>