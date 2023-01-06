<template>
  <v-layout>
    <v-spacer></v-spacer>
    <v-flex class="caption">{{ numberOfCardsMsg }}</v-flex>
    <v-flex class="caption">Credit Limit: {{ formatCurrency(summary.total_credit_limit) }}</v-flex>
    <v-flex v-if="hasStartDate">Start Date: <span>{{ formatDate(summary.min_open_date) }}</span></v-flex>
  </v-layout>
</template>
<script> 
import commonService from "@/services/commonService";
import CreditSummaryModel from "@/models/clients/CreditSummaryModel";

export default {
  name: "ClientCreditSummary",
  components: {
  },
  props: {
    creditSummary: Object,
  },
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
    };
  },
  computed: {
    summary: function() {
      let credit_summary = CreditSummaryModel.credit_summary();
      return (this.creditSummary) ? this.creditSummary : credit_summary
    },
    hasStartDate: function() {

      return (this.creditSummary && 'min_open_date' in this.creditSummary && '' !== this.formatDate( this.creditSummary.min_open_date)) ? true : false; 
    },
    numberOfCardsMsg: function() {
      if( this.creditSummary) {
        return '# of card' + ((this.creditSummary && this.creditSummary.cc_account_count === 1) ? '' : 's') + ' ' + this.creditSummary.cc_account_count;
      } else {
        return 'No Cards'
      }
    }
  },
  mounted() {},
  methods: {
    formatDate(date) {
      return ( (new Date(date)).getYear() === 0 ) ? "" : commonService.formatDate(date);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
  },
  created() {},
};
</script>