<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Credit Card Accounts</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientName }} {{ myCcAccount.client_id}}</v-flex>
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
            <v-col cols="2">
              <v-text-field
                v-model="myCcAccount.card_name"
                label="Card"
                readonly
                ></v-text-field>
                <v-btn x-small @click="cardPickDialog=!cardPickDialog">Select Card</v-btn>
              <!-- <v-select
            :items="[{ text: 'blue', value: 1}, { text: 'red', value: 2}, { text: 'green', value: 3}, ]"
            label="Select a Card"
            ></v-select> -->
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="myCcAccount.card_holder"
                label="Card Holder"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" sm="6" md="4">
              <DialogDatePicker
                :date="myCcAccount.open_date"
                tag="open_date"
                label="Open Date"
                @datepicker="datePicker"
              ></DialogDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="12">
              <v-text-field
                v-model="ccAccount.account_info" label="Account Info">
              </v-text-field>
            </v-col> -->
            <v-col cols="4">
              <v-text-field
                v-model="myCcAccount.cc_login"
                label="Cc Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="myCcAccount.cc_status"
                label="Cc Status"
                :items="cardStatuses"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-switch
                v-model="myCcAccount.annual_fee_waived"
                label="Annual Fee Waived"
                color="green"
                value="Y"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="myCcAccount.credit_limit"
                label="Credit Limit"
                :readonly="isReadOnly"
              >
              </v-text-field>
              <!-- :keydown="formatCreditLimit()"> -->
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCcAccount.last_checked"
                tag="last_checked"
                label="Last Checked"
                @datepicker="datePicker"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="myCcAccount.last_charge"
                tag="last_charge"
                label="Last Charge"
                :isReadOnly="isReadOnly"
                @datepicker="datePicker"
              ></DialogDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-switch
                v-model="myCcAccount.addtional_card"
                label="Additional Card"
                color="green"
                :value="true"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myCcAccount.balance_transfer"
                label="Balance Transfer"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="myCcAccount.task"
                label="Task"
                :items="ccAccountTasks"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="myCcAccount.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="myCcAccount.ccaccount_info"
                label="Ccaccount Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2"> </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancelBtn
          :isReadOnly="isReadOnly"
          @editForm="editForm"
          @saveForm="saveForm"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
        ></EditSaveCancelBtn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="cardPickDialog">
      <CcCardPick
        :a_card_id = "ccAccount.cc_card_id"
        @saveCcCardPick="saveCcCardPick"
        @cancelCcCardPick="cancelCcCardPick"
      ></CcCardPick>
    </v-dialog>
    <v-dialog v-model="msgBoxDialog"
      class="ma">
      <MessageBox
        :title="msgBoxTitle"
        :prompt="msgBoxPrompt"
        :isError="true"
        @close="messageBoxClose"
      ></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import ccAccountService from "@/services/ccAccountService";
import EditSaveCancelBtn from "@/components/common/EditSaveCancelBtn";
import DialogDatePicker from "@/components/common/DialogDatePicker";
import CcCardPick from "@/components/creditcards/CcCardPick";
import CcAccountModel from "@/models/clients/CcAccountModel";
import MessageBox from "@/components/common/MessageBox";

export default {
  value: "CcAccount",
  components: {
    EditSaveCancelBtn,
    DialogDatePicker,
    CcCardPick,
    MessageBox,
  },
  props: {
    clientName: String,
    ccAccount: Object,
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myCcAccount: {},
      prevCcAccount: null,
      cardStatuses: [],
      ccAccountTasks: [],
      openDate: new Date().toISOString(),
      openDateModal: false,
      cardPickDialog: false,
      msgBoxDialog: false,
      msgBoxTitle: "Cc Account Form",
      msgBoxPrompt: ""
    };
  },
  computed: {
    isReadOnly() { return !this.isEditMode;},
  },
  created() {
    this.myCcAccount = new CcAccountModel();
  },
  mounted() {
    this.prevCcAccount = this.myCcAccount = commonService.clone(this.ccAccount);
    this.getCardStatuses();
    this.getCCAccountTasks();
  },
  methods: {
    async getCardStatuses() {
      this.cardStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
      );
    },
    async getCCAccountTasks() {
      this.ccAccountTasks = await admService.getSettingsAsSelectByPrefix(
        "CCACCOUNTTASK"
      );
    },
    formatCreditLimit() {
      this.$nextTick(() => {
        this.ccAccount.credit_limit = commonService.formatCurrency(
          this.ccAccount.credit_limit
        );
      });
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      let response = await ccAccountService.postCcAccount(this.myCcAccount);
      let bret = commonService.emitSaveForm(this, response);
      console.log( bret, response);
      if( !bret) {
        this.msgBoxDialog = true;
        this.msgBoxPrompt = ['Unable to save CC Account', ` ${response.rc}] ${response.msg}`];
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
    closeForm() {
      this.$emit("cancelForm");
    },
    datePicker(tag, date) {
      this.myCcAccount[tag] = date;
    },
    saveCcCardPick( ccCard) {
      if( ccCard) {
        console.log( ccCard);
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
      this.msgBoxDialog = false;
    }
  },
};
</script>
<style scoped>
</style>