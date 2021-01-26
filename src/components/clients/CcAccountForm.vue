<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Cc Account
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            
            <span class="caption">Cc Account Id</span>
            <span class="">{{ccAccount.cc_account_id }}</span>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.cc_card_id"
              label="Client Id"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.client_id"
              label="Card Name"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.card_name"
              label="Card Holder"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.card_holder"
              label="Open Date"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.open_date"
              label="Account Info"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.account_info"
              label="Cc Login"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.cc_login"
              label="Cc Status"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.cc_status"
              label="Annual Fee Waived"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.annual_fee_waived"
              label="Credit Limit"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.credit_limit"
              label="Last Checked"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.last_checked"
              label="Last Charge"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.last_charge"
              label="Addtional Card"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.addtional_card"
              label="Balance Transfer"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.balance_transfer"
              label="Notes"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.notes"
              label="Ccaccount Info"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.ccaccount_info"
              label="Recorded On"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccount.recorded_on"
              label=""
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>

export default {
  value: "CcAccount",
  components: {
  },
  props: {
    ccAccount: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editCcAccountForm" )
    },
    cancelForm() {
      this.$emit( "cancelCcAccountForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>