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
              <v-text-field
                v-model="clientBankAccount.bank_name"
                label="Bank Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="clientBankAccount.account_num"
                label="Account #"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="clientBankAccount.routing_num"
                label=""
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
            </v-col> </v-row
          ><v-row>
            <v-col cols="4">
              <v-text-field
                v-model="clientBankAccount.account_login"
                label="Account Login"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="clientBankAccount.account_pwd"
                label="Account Password"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="clientBankAccount.account_status"
                :items="accountStatuses"
                label="Account Status"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col> </v-row
          ><v-row>
            <v-col cols="4">
              <v-switch
                v-model="clientBankAccount.debit_card"
                label="Debit Card"
                :readonly="isReadOnly"
              >
              </v-switch>
            </v-col>
            <v-col cols="4">
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
import clientService from "@/services/clientService";
import EditSaveCancelBtn from "@/components/common/EditSaveCancelBtn";

export default {
  value: "ClientBankAccount",
  components: {
    EditSaveCancelBtn,
  },
  props: {
    clientName: String,
    clientBankAccount: Object,
  },
  data() {
    return {
      isReadOnly: true,
      prevClientBankAccount: null,
      accountStatuses: [],
      countries: [],
    };
  },
  computed: {},
  mounted() {
    this.prevClientBankAccount = commonService.clone(this.clientBankAccount);
    this.getAccountStatuses();
    this.getCountries();
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
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      let bankAccount = await clientService.postClientBankAccount(this.clientBankAccount);
      this.isReadOnly = true;
      this.$emit("saveForm", bankAccount);
    },
    cancelForm() {
      this.clientBankAccount = commonService.clone(this.prevClientBankAccount);
      this.isReadOnly = true;
    },
    closeForm() {
      this.$emit("cancelForm", this.clientBankAccount);
    },
  },
  created() {},
};
</script>
<style scoped>
</style>