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
          <v-flex align-self-end class="subtitle-2">{{ clientName }}</v-flex>
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
            <v-col cols="2"
              >CARD NAME
              <!-- <v-select
            :items="[{ text: 'blue', value: 1}, { text: 'red', value: 2}, { text: 'green', value: 3}, ]"
            label="Select a Card"
            ></v-select> -->
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="ccAccount.card_holder"
                label="Card Holder"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" sm="6" md="4">
              <DialogDatePicker
                :date="ccAccount.open_date"
                tag="open_date"
                label="Open Date"
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
                v-model="ccAccount.cc_login"
                label="Cc Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="ccAccount.cc_status"
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
                v-model="ccAccount.annual_fee_waived"
                label="Annual Fee Waived"
                color="green"
                value="Y"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="ccAccount.credit_limit"
                label="Credit Limit"
                :readonly="isReadOnly"
              >
              </v-text-field>
              <!-- :keydown="formatCreditLimit()"> -->
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="ccAccount.last_checked"
                tag="last_checked"
                label="Last Checked"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="3">
              <DialogDatePicker
                :date="ccAccount.last_charge"
                tag="last_charge"
                label="Last Charge"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-switch
                v-model="ccAccount.addtional_card"
                label="Additional Card"
                color="green"
                :value="true"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccAccount.balance_transfer"
                label="Balance Transfer"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ccAccount.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ccAccount.ccaccount_info"
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
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import ccAccountService from "@/services/ccAccountService";
import EditSaveCancelBtn from "@/components/common/EditSaveCancelBtn";
import DialogDatePicker from "@/components/common/DialogDatePicker";

export default {
  value: "CcAccount",
  components: {
    EditSaveCancelBtn,
    DialogDatePicker,
  },
  props: {
    clientName: String,
    ccAccount: Object,
  },
  data() {
    return {
      prevCcAccount: null,
      cardStatuses: [],
      isReadOnly: true,
      openDate: new Date().toISOString(),
      openDateModal: false,
    };
  },
  computed: {},
  mounted() {
    this.prevCcAccount = commonService.clone(this.ccAccount);
    this.getCardStatuses();
  },
  methods: {
    async getCardStatuses() {
      this.cardStatuses = await admService.getSettingsAsSelectByPrefix(
        "CARDSTATUS"
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
      let ccAccount = await ccAccountService.postCcAccount(this.ccAccount);
      this.isReadOnly = true;
      this.$emit("saveForm", ccAccount);
    },
    cancelForm() {
      this.isReadOnly = true;
      this.ccAccount = commonService.clone(this.prevCcAccount);
    },
    closeForm() {
      this.$emit("cancelForm");
    },
    datePicker(tag, date) {
      this.ccAccount[tag] = date;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>