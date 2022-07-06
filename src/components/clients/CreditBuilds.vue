<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="msg" xs12>\{ msg \}</div>
    <div v-else>
    <v-data-table
      title="Credit Build"
      :items="creditBuilds"
      :headers="headers"
    ></v-data-table>
    </div>
    <v-dialog v-model="editDialog">
      <CreditBuildDetail
        :key="componentKey"
        :clientName="clientName"
        :creditBuild="creditBuild"
        :isReadOnly="isReadOnly"
        @editForm="editForm"
        @cancelForm="cancelForm"
        @closeForm="editDialog = false"
        @saveForm="saveForm"
      ></CreditBuildDetail>
    </v-dialog>
  </div>
</template>

<script>
import creditBuildService from "@/services/creditBuildService";
import CreditBuildModel from '@/models/clients/CreditBuildModel'
import BeatLoader from "@/components/common/Spinner.vue";

export default {
  value: "CreditBuild",
  components: {
    BeatLoader,
  },
  props: {
    clientId: Number,
    clientName: String,
    creditBuilds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      msg: null,
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
      search: "",
      componentKey: false,
      editDialog: false,
      isReadOnly: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getCreditBuild() {
        this.loading = true;
        this.response = await creditBuildService.getCreditBuild();
        this.loading = false;
    },
    editForm() {
      this.isReadOnly = false;
    },
    saveForm( clientLoan) {
      this.$emit('saveItem', this.clientLoans, clientLoan);
      this.editDialog = false
    },
    cancelForm() {
      this.editDialog = false;
    },
    editItem(item) {
      this.creditBuild = item;
      this.editDialog = true;
    },
    addItem() {
      this.componentKey = !this.componentKey
      this.creditBuild = CreditBuildModel.newCrediitBuild(this.clientId, this.cbms_id);
      this.isReadOnly = false;
      this.editDialog = true;
    },
    deleteItem(item) {
      this.confirmDlgKeyname = "delete";
      this.confirmDlgTitle = "Credit Build";
      this.comfirmDlgPrompt =
        "Delete " + item.client_name + "?";
      this.confirmDlgShow = true;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>