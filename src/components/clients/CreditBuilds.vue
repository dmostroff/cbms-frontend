<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="creditBuild.msg" xs12>\{ creditBuild.msg \}</div>
    <div v-else>
    <v-data-table
      title="Credit Build"
      :items="response.data"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="dialogDetail">
      <CreditBuildDetail
        :creditBuildId="creditBuildId"
        @editClientPersonForm="editCreditBuildForm"
        @cancelCreditBuildDetail="cancelCreditBuildDetail"
      ></CreditBuildDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <CreditBuildForm
        :acreditBuild="creditBuild"
        @cancelCreditBuildForm="cancelCreditBuildForm"
        @saveForm="saveForm"
      ></CreditBuildForm>
    </v-dialog>
  </div>
</template>

<script>
import creditBuildService from "@/services/creditBuildService";
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CreditBuild",
  components: {
    BeatLoader,
  },
  props: [],
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      creditBuild: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'client_id', text: 'Client Id' }
      , { id: 3, value: 'client_name', text: 'Client Name' }
      , { id: 4, value: 'bank_name', text: 'Bank Name' }
      , { id: 5, value: 'account_login', text: 'Account Login' }
      , { id: 6, value: 'account_pwd', text: 'Account Pwd' }
      , { id: 7, value: 'start_date', text: 'Start Date' }
      , { id: 8, value: 'end_date', text: 'End Date' }
      , { id: 9, value: 'bank_account', text: 'Bank Account' }
      , { id: 10, value: 'payment_date', text: 'Payment Date' }
      , { id: 11, value: 'reconciled_on', text: 'Reconciled On' }
      , { id: 12, value: 'applied_on', text: 'Applied On' }
      , { id: 13, value: 'notes', text: 'Notes' }
      , { id: 14, value: 'task', text: 'Task' }
      , { id: 15, value: 'credit_info', text: 'Credit Info' }
      , { id: 16, value: 'recorded_on', text: 'Recorded On' }
      
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getCreditBuild() {
        this.loading = true;
        this.response = await creditBuildService.getCreditBuild();
        this.loading = false;
    }
  },
  created() {},
};
</script>
<style scoped>
</style>