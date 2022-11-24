<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Credit Line History</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientName }}</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1">
              <span class="caption">Id: {{ creditLineHistory.id }}</span>
            </v-col>
            <v-spacer />
            <v-col cols="1">
              <span class="caption">Client Code: {{ creditLineHistory.client_code }}</span>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <span class="caption"
                >Recorded on:
                {{ formatDateTime(creditLineHistory.recorded_on) }}</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2"><!-- should be drop down -->
              <v-text-field
                v-model="myCreditLineHistory.xero_id"
                label="Xero ID"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <DialogDatePicker
                :date="myCreditLineHistory.cl_date"
                label="Date"
                tag="cl_date"
                @datepicker="datePicker"
                :isReadOnly="isReadOnly"
              ></DialogDatePicker>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myCreditLineHistory.amount"
                label="Amount"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="myCreditLineHistory.cl_stattus"
                :items="creditLineHistoryStatuses"
                label="Status"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            </v-row><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myCreditLineHistory.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
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
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import DialogDatePicker from "@/components/common/DialogDatePicker";
import CreditLineHistoryModel from "@/models/clients/CreditLineHistoryModel.js"


export default {
  value: "CreditLineHistoryForm",
  components: {
    EditSaveCancel,
    MessageBox,
    DialogDatePicker,
  },
  props: {
    clientName: String,
    creditLineHistory: Object,
    isReadOnly: Boolean,
  },
  data() {
    return {
      prevCreditLineHostory: null,
      myCreditLineHistory: new CreditLineHistoryModel.CreditLineHistoryModel(),
      creditLineHistoryStatuses: [],
      msgBox: {
        dialog: false,
        title: "Credit Line History Form",
        prompt: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.prevCreditLineHistory = commonService.clone(this.creditLineHistory);
    this.myCreditLineHistory = commonService.clone(this.creditLineHistory);
    this.getCreditLineHistoryStatuses();
  },
  methods: {
    async getCreditLineHistoryStatuses() {
      this.creditLineHistoryStatuses = await admService.getSettingsAsSelectByPrefix(
        "CREDITLINESTATUS"
      );
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = (this.creditLineHistory.id) ? this.creditLineHistory.id : 0;
      let response = await clientService.postClientBankAccount( id, this.creditLineHistory);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client Bank Account",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
    closeForm() {
      this.$emit("cancelForm");
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
    datePicker(tag, date) {
      this.myCreditLineHistory[tag] = date;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>