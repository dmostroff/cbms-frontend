<template>
  <v-card>
    <v-card-title :md-elevation="2"> Cc Account {{clientName}} </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <span class="subtitle-2">Cc Account Id</span>:
            {{ ccAccount.cc_account_id }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="subtitle-2">Cc Card Id</span>:
            {{ ccAccount.cc_card_id }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><span class="subtitle-2">Card Name</span>:
            {{ ccAccount.card_name }}
          </v-col>
          <v-col>
            <span class="subtitle-2">Card Holder</span>:
            {{ ccAccount.card_holder }}
          </v-col>
          <v-col>
            <span class="subtitle-2">Open Date</span>:
            {{ ccAccount.open_date }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="subtitle-2">Account Info</span>:
            {{ ccAccount.account_info }}
          </v-col>
          <v-col>
            <span class="subtitle-2">Cc Login</span>: {{ ccAccount.cc_login }}
          </v-col>
          <v-col>
            <span class="subtitle-2">Cc Status</span>:
            {{ ccAccount.cc_status }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><span class="subtitle-2">Annual Fee Waived</span>:
              <v-switch
                v-model="ccAccount.annual_fee_waived"
                label="Annual Fee Waived"
                color="green"
                value="Y"
                hide-details
                readonly
              ></v-switch>
          </v-col>
          <v-col
            ><span class="subtitle-2">Credit Limit</span>:
            {{ ccAccount.credit_limit }}
          </v-col>
          <v-col
            ><span class="subtitle-2">Last Checked</span>:
            {{ ccAccount.last_checked }}
          </v-col>
          <v-col
            ><span class="subtitle-2">Last Charge</span>:
            {{ ccAccount.last_charge }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><span class="subtitle-2">Addtional Card</span>:
            <v-col cols="12" md="4">
              <v-switch
                v-model="ccAccount.addtional_card"
                label="Additional Card"
                color="green"
                :value="true"
                hide-details
                readonly
              ></v-switch>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><span class="subtitle-2">Balance Transfer</span>:
            {{ ccAccount.balance_transfer }}
          </v-col>
          <v-col
            ><span class="subtitle-2">Notes</span>:
            {{ ccAccount.notes }}
          </v-col>
          <v-col
            ><span class="subtitle-2">Ccaccount Info</span>:
            {{ ccAccount.ccaccount_info }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><span class="subtitle-2">Recorded On</span>:
            {{ ccAccount.recorded_on }}
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
import commonService from '@/services/commonService'

export default {
  name: "CcAccountDetail",
  components: {},
  props: {
    clientName: String,
    ccAccount: Object,
  },
  data() {
    return {
      prevCcAccount: null,
    };
  },
  computed: {},
  mounted() {
    this.prevCcAccount = commonService.clone( this.ccAccount)
  },
  methods: {
    editForm() {
      this.$emit("editForm", this.ccAccount);
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