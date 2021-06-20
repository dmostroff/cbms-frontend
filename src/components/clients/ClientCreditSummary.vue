<template>
  <v-layout>
    <v-flex class="caption"># of card</v-flex
    ><v-flex>{{ summary.number_of_cards }}</v-flex>
    <v-flex class="caption">Credit Limit</v-flex
    ><v-flex>{{ formatCurrency(summary.total_credit_limit) }}</v-flex>
    <v-flex class="caption">Start Date</v-flex
    ><v-flex>{{ formatDate(summary.start_date) }}</v-flex>
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
    }
  },
  mounted() {},
  methods: {
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatCurrency(amount) {
      return commonService.formatCurrency(amount);
    },
  },
  created() {},
};
</script>