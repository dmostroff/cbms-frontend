<template>
  <v-card>
    <v-card-header :md-elevation="2">
      Cc Account
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Cc Account Id</span>:</v-col>
          <v-col>
            {{ccAccount.cc_account_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Cc Card Id</span>:</v-col>
          <v-col>
            {{ccAccount.cc_card_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Client Id</span>:</v-col>
          <v-col>
            {{ccAccount.client_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Card Name</span>:</v-col>
          <v-col>
            {{ccAccount.card_name}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Card Holder</span>:</v-col>
          <v-col>
            {{ccAccount.card_holder}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Open Date</span>:</v-col>
          <v-col>
            {{ccAccount.open_date}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Account Info</span>:</v-col>
          <v-col>
            {{ccAccount.account_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Cc Login</span>:</v-col>
          <v-col>
            {{ccAccount.cc_login}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Cc Status</span>:</v-col>
          <v-col>
            {{ccAccount.cc_status}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Annual Fee Waived</span>:</v-col>
          <v-col>
            {{ccAccount.annual_fee_waived}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Credit Limit</span>:</v-col>
          <v-col>
            {{ccAccount.credit_limit}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Last Checked</span>:</v-col>
          <v-col>
            {{ccAccount.last_checked}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Last Charge</span>:</v-col>
          <v-col>
            {{ccAccount.last_charge}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Addtional Card</span>:</v-col>
          <v-col>
            {{ccAccount.addtional_card}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Balance Transfer</span>:</v-col>
          <v-col>
            {{ccAccount.balance_transfer}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Notes</span>:</v-col>
          <v-col>
            {{ccAccount.notes}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Ccaccount Info</span>:</v-col>
          <v-col>
            {{ccAccount.ccaccount_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Recorded On</span>:</v-col>
          <v-col>
            {{ccAccount.recorded_on}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
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