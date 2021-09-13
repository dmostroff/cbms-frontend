<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Bank Account</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientName }}</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1">
              <span class="caption">Id: {{ clientBankAccount.id }}</span>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <span class="caption"
                >Recorded on:
                {{ formatDateTime(clientBankAccount.recorded_on) }}</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-combobox
                v-model="clientBankAccount.bank_name"
                :items="banks"
                label="Bank Name"
                :readonly="isReadOnly"
              >
              </v-combobox>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientBankAccount.account_num"
                label="Account #"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientBankAccount.routing_num"
                label="Routing"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientBankAccount.branch_num"
                label="Branch Num"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            </v-row><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="clientBankAccount.iban"
                label="IBAN"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="clientBankAccount.country"
                :items="countries"
                label="Country"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            </v-row><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="clientBankAccount.account_login"
                label="Account Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="clientBankAccount.account_pwd"
                label="Account Password"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="clientBankAccount.account_status"
                :items="accountStatuses"
                label="Account Status"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            <v-col cols="3">
              <v-switch
                v-model="clientBankAccount.debit_card"
                label="Debit Card"
                :readonly="isReadOnly"
              >
              </v-switch>
            </v-col>
            <v-col v-if="false" cols="4">
              <v-text-field
                v-model="clientBankAccount.debit_info"
                label="Debit Info"
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
import ccAccountService from "@/services/ccAccountService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";


export default {
  value: "ClientBankAccount",
  components: {
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientName: String,
    clientBankAccount: Object,
    isReadOnly: Boolean,
  },
  data() {
    return {
      prevClientBankAccount: null,
      accountStatuses: [],
      countries: [],
      banks: [],
      msgBox: {
        dialog: false,
        title: "Client Bank Account Form",
        prompt: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.prevClientBankAccount = commonService.clone(this.clientBankAccount);
    this.getAccountStatuses();
    this.getCountries();
    this.getBanks();
  },
  methods: {
    async getAccountStatuses() {
      this.accountStatuses = await admService.getSettingsAsSelectByPrefix(
        "ACCOUNTSTATUS"
      );
    },
    async getCountries() {
      this.countries = await admService.getSettingsAsSelectByPrefix("COUNTRY");
    },
    async getBanks() {
      this.banks = await ccAccountService.getBanks();
      // this.banks = bank_array.map( item => {
      //   return { text: item, value: item }
      // });
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = (this.clientBankAccount.id) ? this.clientBankAccount.id : 0;
      let response = await clientService.postClientBankAccount( id, this.clientBankAccount);
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
  },
  created() {},
};
</script>
<style scoped>
</style>