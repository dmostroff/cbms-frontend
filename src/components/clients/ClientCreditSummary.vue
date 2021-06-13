<template>
  <v-layout>
    <v-flex class="caption"># of card</v-flex
    ><v-flex>{{ creditSummary.number_of_cards }}</v-flex>
    <v-flex class="caption">Credit Limit</v-flex
    ><v-flex>{{ formatCurrency(creditSummary.total_credit_limit) }}</v-flex>
    <v-flex class="caption">Start Date</v-flex
    ><v-flex>{{ formatDate(creditSummary.start_date) }}</v-flex>
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
  computed: {},
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