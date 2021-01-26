<template>
  <v-card>
    <v-card-header :md-elevation="2">
      Cc Account Promo
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Promo Id</span>:</v-col>
          <v-col>
            {{ccAccountPromo.promo_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Cc Account Id</span>:</v-col>
          <v-col>
            {{ccAccountPromo.cc_account_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Offer</span>:</v-col>
          <v-col>
            {{ccAccountPromo.offer}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Loan Amt</span>:</v-col>
          <v-col>
            {{ccAccountPromo.loan_amt}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Bal Transfer Date</span>:</v-col>
          <v-col>
            {{ccAccountPromo.bal_transfer_date}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Bal Transfer Amt</span>:</v-col>
          <v-col>
            {{ccAccountPromo.bal_transfer_amt}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Promo Info</span>:</v-col>
          <v-col>
            {{ccAccountPromo.promo_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Recorded On</span>:</v-col>
          <v-col>
            {{ccAccountPromo.recorded_on}}
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
  value: "CcAccountPromo",
  components: {
  },
  props: {
    ccAccountPromo: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editCcAccountPromoForm" )
    },
    cancelForm() {
      this.$emit( "cancelCcAccountPromoForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>