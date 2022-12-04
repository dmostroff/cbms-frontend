<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-if="myChecking.id">Edit</span>
            <span v-else>Add</span>
            Client Checking
          </v-flex>
          <v-flex><span class="title">{{clientName}}</span></v-flex>
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">
            <span align-self-end class="caption mx-4"
              >{{ myChecking.client_id }} {{ myChecking.client_code }}
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
                v-model="myChecking.xero_id"
                label="Xero Id"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-switch
                v-model="myChecking.xero_main"
                label="Xero Main"
                :readonly="isReadOnly"
                true-value="Y"
                false-value="N"
              ></v-switch>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myChecking.name_on_account"
                label="Name on Account"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="myChecking.bank"
                label="Bank"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.routing"
                label="Routing Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.account"
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
                v-model="myChecking.login"
                label="Account Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.pwd"
                label="Account Pwd"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.member_number"
                label="Member Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myChecking.debit_card_num"
                label="Debit Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_card_exp"
                label="Debit Exp"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_card_cvv"
                label="Debit Cvv"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myChecking.debit_card_pin"
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
            <v-col cols="2">
              <v-select
                v-model="myChecking.account_status"
                label="Account Status"
                :items="accountStatuses"
                :readonly="isReadOnly"
              >
              </v-select>
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
              <v-switch
                v-model="myChecking.wise"
                label="Wise"
                :readonly="isReadOnly"
                color="blue"
                true-value="Y"
                false-value="N"
              ></v-switch>
            </v-col>
            <v-col cols="3">
              <v-select
              v-if="myChecking.wise == 'Y'"
                v-model="myChecking.wise_device"
                label="Wise Device"
                :items="devices"
                :readonly="isReadOnly"
              >
              </v-select>
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
import admService from '@/services/admService'
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
    clientName: String,
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
      accountStatuses: [],
      devices: [],
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
    this.getAccountStatuses();
    this.getDevices();
  },
  created() {
    this.rand = Math.round(Math.random() * 1000);
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async saveForm() {
      let response = await checkingService.postChecking(this.myChecking);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Checking",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    async getAccountStatuses() {
      this.accountStatuses = await admService.getSettingsAsSelectByPrefix(
        "ACCOUNTSTATUS"
      );
    },
    async getDevices() {
      this.devices = await admService.getSettingsAsSelectByPrefix(
        "DEVICE"
      );
    },
    getAccountStatusDescription( account_status) {
      return commonService.getSettingDescription( this.accountStatuses, account_status);
    },
    cancelForm() {
      let checking = commonService.clone(this.prevChecking);
      this.$emit("cancelForm", checking);
    },
    closeForm() {
      this.$emit("closeForm", this.myChecking);
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