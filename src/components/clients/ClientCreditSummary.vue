<template>
  <v-layout>
    <v-spacer></v-spacer>
    <v-flex class="caption">{{ numberOfCardsMsg }}</v-flex>
    <v-flex class="caption">Credit Limit: {{ formatCurrency(summary.total_credit_limit) }}</v-flex>
    <v-flex v-if="hasStartDate">Start Date: <span>{{ formatDate(summary.start_date) }}</span></v-flex>
  </v-layout>
</template>
<script> 
import commonService from "@/services/commonService";

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
      return (this.creditSummary) ? this.creditSummary : { number_of_cards: 0, total_credit_limit: 0, start_date: ''}
    },
    hasStartDate: function() {
      return ('startDate' in this.creditSummary && '' !== this.formatDate( this.creditSummary.start_date)) ? true : false; 
    },
    numberOfCardsMsg: function() {
      if( this.creditSummary !== undefined) {
        return '# of card' + ((this.creditSummary.number_of_cards === 1) ? '' : 's') + ' ' + this.creditSummary.number_of_cards;
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