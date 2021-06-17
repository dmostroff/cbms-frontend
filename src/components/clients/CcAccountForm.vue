<template>
  <v-form>
    <v-card>
      <v-card-header :md-elevation="2"> Cc Account </v-card-header>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <span class="caption">Cc Account Id</span>:
              <span class="">{{ ccAccount.cc_account_id }}</span>
            </v-col>
            <!-- </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.cc_card_id"
              label="Client Id"
            </v-text-field>
            
          </v-col> -->
          </v-row>
          <v-row>
            <v-col cols="2">
              <!-- <v-select
            :items="[{ text: 'blue', value: 1}, { text: 'red', value: 2}, { text: 'green', value: 3}, ]"
            label="Select a Card"
            ></v-select> -->
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="ccAccount.card_holder" label="Card Holder">
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="ccAccount.open_date" label="Open Date">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="ccAccount.account_info" label="Account Info">
              </v-text-field>
            </v-col> -->
            <v-col cols="4" md="4">
              <v-text-field
                v-model="ccAccount.cc_login" label="Cc Login">
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="ccAccount.cc_status" label="Cc Status">
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="3" md="4">
              <v-switch
                v-model="ccAccount.annual_fee_waived"
                label="Annual Fee Waived"
                color="green"
                value="Y"
                hide-details
              ></v-switch>
            </v-col>
            <v-col cols="3" md="4">
              <v-text-field
                v-model="ccAccount.credit_limit" label="Credit Limit">
              </v-text-field>
                <!-- :keydown="formatCreditLimit()"> -->
            </v-col>
            <v-col cols="3" md="4">
              <v-text-field
                v-model="ccAccount.last_checked" label="Last Checked">
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="ccAccount.last_charge" label="Last Charge">
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="12" md="4">
              <v-switch
                v-model="ccAccount.addtional_card"
                label="Additional Card"
                color="green"
                :value="true"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" md="4">
              <v-text-field>
                v-model="ccAccount.balance_transfer" label="Balance Transfer"
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="4" md="4">
              <v-text-field>
                v-model="ccAccount.notes" label="Notes"
              </v-text-field>
            </v-col>
            <v-col cols="6" md="4">
              <v-text-field>
                v-model="ccAccount.ccaccount_info" label="Ccaccount Info"
              </v-text-field>
            </v-col>
            <v-col cols="2" md="4">
              {{ ccAccount.recorded_on }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions align-self-right>
        <v-btn @click="saveForm">Save</v-btn>
        <v-btn @click="cancelForm">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";

export default {
  value: "CcAccount",
  components: {},
  props: {
    ccAccount: Object,
  },
  data() {
    return {
      prevCcAccount: null,
    };
  },
  computed: {},
  mounted() {
    this.prevCcAccount = commonService.clone(this.ccAccount);
  },
  methods: {
    formatCreditLimit() {
      this.$nextTick(() => {
        this.ccAccount.credit_limit = commonService.formatCurrency(this.ccAccount.credit_limit);
      });
    },
    saveForm() {
      this.$emit("saveForm", this.ccAccount);
    },
    cancelForm() {
      this.$emit("cancel", this.prevCcAccount);
    },
  },
  created() {},
};
</script>
<style scoped>
</style>