<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Cc Account Promo
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            
            <span class="caption">Promo Id</span>
            <span class="">{{ccAccountPromo.promo_id }}</span>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.cc_account_id"
              label="Offer"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.offer"
              label="Loan Amt"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.loan_amt"
              label="Bal Transfer Date"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.bal_transfer_date"
              label="Bal Transfer Amt"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.bal_transfer_amt"
              label="Promo Info"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.promo_info"
              label="Recorded On"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="ccAccountPromo.recorded_on"
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