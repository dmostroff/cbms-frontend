<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Credit Card !{{ myCcAccount.card_status }}!
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientNameDefault }} {{ myCcAccount.client_id }}</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ ccAccount.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(ccAccount.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-text-field v-model="myCcAccount.xero_id" label="Xero ID" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.card_name" label="Card" readonly></v-text-field>
              <v-dialog v-model="cardPickDialog" transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small @click="cardPickDialog = !cardPickDialog" v-bind="attrs" v-on="on">Select Card</v-btn>
                </template>
                <template>
                  <CcCardPick :a_card_id="ccAccount.cc_card_id" @saveCcCardPick="saveCcCardPick"
                    @cancelCcCardPick="cancelCcCardPick"></CcCardPick>
                </template>
              </v-dialog>
              <!-- <v-select
            :items="[{ text: 'blue', value: 1}, { text: 'red', value: 2}, { text: 'green', value: 3}, ]"
            label="Select a Card"
            ></v-select> -->
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.first_name" label="First Name" :readonly="isReadOnly" clearable>
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.last_name" label="Last Name" :readonly="isReadOnly" clearable>
              </v-text-field>
            </v-col>
          </v-row><v-row>
            <v-col cols="2" sm="6" md="2">
              <DialogDatePicker :date="myCcAccount.open_date" tag="open_date" label="Open Date" @datepicker="datePicker"
                :isReadOnly="isReadOnly"></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <v-select v-model="myCcAccount.card_status" label="Card Status" :items="cardStatuses"
                :readonly="isReadOnly">
              </v-select>
            </v-col>
            <v-col cols="2">
              <v-select v-model="myCcAccount.device" label="Device" :items="devices" :readonly="isReadOnly">
              </v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.in_charge" label="In Charge" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="myCcAccount.card_num" label="Card #">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.card_exp" label="Card Exp">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.card_cvv" label="CVV">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.card_pin" label="Pin">
              </v-text-field>
            </v-col>
          </v-row><v-row>
            <v-col cols="4">
              <v-text-field v-model="myCcAccount.cc_login" label="Cc Login" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <password :pwd="myCcAccount.pwd" label="User Password" tag="pwd" :isReadOnly="isReadOnly" :key="randnum"
                @passwordDone="passwordDone">
              </password>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.credit_line" label="Credit Line" :readonly="isReadOnly"
                :keydown="formatCreditLine()">
              </v-text-field>
              <!-- :keydown="formatCreditLimit()"> -->
            </v-col>
            <v-col cols="3">
              <DialogDatePicker :date="myCcAccount.charged_on" tag="charged_on" label="Charged On"
                :isReadOnly="isReadOnly" @datepicker="datePicker"></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker :date="myCcAccount.due_on" tag="due_on" label="Due On" :isReadOnly="isReadOnly"
                @datepicker="datePicker"></DialogDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.bonus_to_spend" label="Bonus to Spend"
                :isReadOnly="isReadOnly"></v-text-field>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker :date="myCcAccount.bonus_spend_by" tag="bonus_spend_by" label="Spend by"
                :isReadOnly="isReadOnly" @datepicker="datePicker"></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myCcAccount.bonus_spent" label="Spent" :isReadOnly="isReadOnly"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select v-model="myCcAccount.task" label="Task" :items="ccAccountTasks" :readonly="isReadOnly">
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="myCcAccount.notes" label="Notes" :readonly="isReadOnly" clearable>
              </v-text-field>
            </v-col>
            <!-- <v-col cols="6">
              <v-text-field
                v-model="myCcAccount.ccaccount_info"
                label="Ccaccount Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2"> </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel :isReadOnly="isReadOnly" :isValid="isValid" @editForm="editForm" @saveForm="saveForm"
          @cancelForm="cancelForm" @closeForm="closeForm"></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="msgBox.dialog" class="ma">
      <MessageBox :title="msgBox.title" :prompt="msgBox.prompt" :isError="true" @close="messageBoxClose"></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import ccAccountService from "@/services/ccAccountService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import DialogDatePicker from "@/components/common/DialogDatePicker";
import CcCardPick from "@/components/creditcards/CcCardPick";
import CcAccountModel from "@/models/clients/CcAccountModel";
import Password from "@/components/common/Password";
import MessageBox from "@/components/common/MessageBox";

export default {
  value: "CcAccount",
  components: {
    EditSaveCancel,
    DialogDatePicker,
    Password,
    CcCardPick,
    MessageBox,
  },
  props: {
    clientName: String,
    ccAccount: Object,
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myCcAccount: CcAccountModel.cc_account(),
      prevCcAccount: null,
      cardStatuses: [],
      devices: [],
      ccAccountTasks: [],
      cardPickDialog: false,
      msgBox: {
        dialog: false,
        title: "Cc Account Form",
        prompt: "",
      },
      randnum: Math.random(),
    };
  },
  computed: {
    isValid() {
      return (
        this.myCcAccount.xero_id > "" &&
        this.myCcAccount.client_id > 0 &&
        this.myCcAccount.card_name > "" &&
        this.myCcAccount.first_name > "" &&
        this.myCcAccount.last_name > ""
      );
    },
    clientNameDefault() {
      return this.clientName > ""
        ? this.clientName
        : this.myCcAccount.client_name;
    },
  },
  // watch: {
  //   ccAccount: function (val) {
  //     this.myCcAccount = commonService.clone(val);
  //   },
  // },
  created() {
    this.myCcAccount = CcAccountModel.cc_account();
  },
  mounted() {
    this.prevCcAccount = this.myCcAccount = commonService.clone(this.ccAccount);
    console.log(this.myCcAccount)
    this.getCardStatuses();
    this.getDevices();
    this.getCCAccountTasks();
  },
  methods: {
    async getCardStatuses() {
      this.cardStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
      );
    },
    async getDevices() {
      this.devices = await admService.getSettingsAsSelectByPrefix(
        "DEVICE"
      );
    },
    async getCCAccountTasks() {
      this.ccAccountTasks = await admService.getSettingsAsSelectByPrefix(
        "CCACCOUNTTASK"
      );
    },
    formatCreditLine() {
      // this.$nextTick(() => {
      //   this.myCcAccount.credit_line = commonService.formatCurrencyInput(
      //     this.myCcAccount.credit_line
      //   );
      // });
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    passwordDone(password, tag) {
      this.randnum = Math.random();
      this.myCcAccount[tag] = password;
    },
    editForm() {
      console.log("CcAccountForm: editForm");
      this.$emit("editForm");
    },
    async saveForm() {
      console.log('form saveForm', this.myCcAccount);
      let response = await ccAccountService.postCcAccount(this.myCcAccount);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save CC Account",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      this.myCcAccount = commonService.clone(this.prevCcAccount);
      this.$emit("cancelForm");
    },
    closeForm() {
      this.$emit("cancelForm");
    },
    datePicker(tag, date) {
      this.myCcAccount[tag] = date;
      // console.log("datePicker", tag, this.myCcAccount[tag]);
    },
    saveCcCardPick(ccCard) {
      if (ccCard) {
        // console.log(ccCard);
        this.myCcAccount.cc_card_id = ccCard.cc_card_id;
        this.myCcAccount.card_name = ccCard.card_name;
        this.myCcAccount.company_name = ccCard.company_name;
        this.myCcAccount.cc_company_id = ccCard.company_id;
      }
      this.cardPickDialog = false;
    },
    cancelCcCardPick() {
      this.cardPickDialog = false;
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
  },
};
</script>
<style scoped>

</style>