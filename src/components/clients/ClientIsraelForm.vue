<template>
  <v-form>
    <v-card class="ma-6">
      <v-card-title class="primary white--text">
        <ClientCardTitle :clientPerson="clientPerson" cardTitle="Client Israel Info"
          :itemId="myClientIsrael.id" :isReadOnly="isReadOnly"></ClientCardTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1">
              <span class="caption">Id: {{ myClientIsrael.id }}</span>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <span class="caption">Recorded on:
                {{ formatDateTime(myClientIsrael.recorded_on) }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="myClientIsrael.bank" label="Bank" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myClientIsrael.branch" label="Branch" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myClientIsrael.account" label="Account #" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row><v-row>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.iban" label="IBAN" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.iban_name" label="IBAN Name" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row><v-row>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.address" label="Address" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.city" label="City" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.zip" label="Zip" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="myClientIsrael.phone" label="Phone" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col v-if="false" cols="4">
              <v-text-field v-model="myClientIsrael.notes" label="Notes" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel :isReadOnly="isReadOnly" @editForm="editForm" @saveForm="saveForm" @cancelForm="cancelForm"
          @closeForm="closeForm"></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="msgBox.dialog" class="ma">
      <MessageBox :title="msgBox.title" :prompt="msgBox.prompt" :isError="true" @close="messageBoxClose"></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import clientIsraelService from "@/services/clientIsraelService";
import ClientCardTitle from "@/components/clients/ClientCardTitle";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
// import ClientIsraelModel from "../../models/clients/ClientIsraelModel";


export default {
  value: "ClientIsrael",
  components: {
    ClientCardTitle,
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientPerson: Object,
    clientIsrael: Object,
    isReadOnly: Boolean,
  },
  data() {
    return {
      myClientIsrael: {},
      prevClientIsrael: null,
      accountStatuses: [],
      countries: [],
      banks: [],
      msgBox: {
        dialog: false,
        title: "Client Israel Info Form",
        prompt: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.dataInit();
  },
  methods: {
    dataInit() {
      this.myClientIsrael = commonService.clone(this.clientIsrael);
      this.prevClientIsrael = commonService.clone(this.clientIsrael);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = (this.myClientIsrael.id) ? this.myClientIsrael.id : 0;
      let response = await clientIsraelService.postClientIsrael(id, this.myClientIsrael);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client Israel Info",
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
  created() { },
};
</script>
<style scoped>

</style>