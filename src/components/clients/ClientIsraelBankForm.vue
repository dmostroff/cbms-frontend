<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Israel Bank Info</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2">{{ clientName }}</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1">
              <span class="caption">Id: {{ myClientIsraelBank.id }}</span>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <span class="caption"
                >Recorded on:
                {{ formatDateTime(myClientIsraelBank.recorded_on) }}</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="myClientIsraelBank.bank"
                label="Bank"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientIsraelBank.branch"
                label="Branch"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="myClientIsraelBank.account"
                label="Account #"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            </v-row><v-row>
            <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.iban"
                label="IBAN"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.iban_name"
                label="IBAN Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            </v-row><v-row>
              <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.address"
                label="Address"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.city"
                label="City"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.zip"
                label="Zip"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="myClientIsraelBank.phone"
                label="Phone"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="false" cols="4">
              <v-text-field
                v-model="myClientIsraelBank.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
          @editForm="editForm"
          @saveForm="saveForm"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="msgBox.dialog" class="ma">
      <MessageBox
        :title="msgBox.title"
        :prompt="msgBox.prompt"
        :isError="true"
        @close="messageBoxClose"
      ></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import clientService from "@/services/clientService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import ClientIsraelBankModel from "../../models/clients/ClientIsraelBankModel";


export default {
  value: "ClientIsraelBank",
  components: {
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientName: String,
    clientIsraelBank: Object,
    isReadOnly: Boolean,
  },
  data() {
    return {
      myClientIsraelBank: new ClientIsraelBankModel(),
      prevClientIsraelBank: null,
      accountStatuses: [],
      countries: [],
      banks: [],
      msgBox: {
        dialog: false,
        title: "Client Israel Bank Form",
        prompt: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.myClientIsraelBank = commonService.clone(this.clientIsraelBank);
    this.prevClientIsraelBank = commonService.clone(this.clientIsraelBank);
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = (this.myClientIsraelBank.id) ? this.myClientIsraelBank.id : 0;
      let response = await clientService.postClientIsraelBank( id, this.myClientIsraelBank);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client Israel Bank Info",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
    closeForm() {
      this.$emit("cancelForm");
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>