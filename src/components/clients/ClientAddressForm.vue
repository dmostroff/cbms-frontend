<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <ClientCardTitle :clientPerson="clientPerson" cardTitle="Client Address" :itemId="myClientAddress.id" :isReadOnly="isReadOnly"></ClientCardTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-if="myClientAddress.id" cols="2" class="caption"> Id: {{ myClientAddress.id }} </v-col>
            <v-col cols="2" class="caption"> Client Code: {{ myClientAddress.client_code }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(myClientAddress.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-switch v-model="myClientAddress.is_current" label="Is Current" :readonly="isReadOnly" color="blue"
                true-value="Y" false-value="N"></v-switch>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="myClientAddress.street_address" label="Street Address" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="myClientAddress.city" label="City" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select v-model="myClientAddress.state" label="State" :items="states">
              </v-select>
            </v-col>
            <v-col cols="1">

              <v-text-field v-model="myClientAddress.state" label="State" :readonly="true"
                message="Use two letter state code" maxlength="2" :rules="stateRules">
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="myClientAddress.zip" label="Zip" :readonly="isReadOnly">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel :isReadOnly="isReadOnly" :isValid="isValid" @cancelForm="cancelForm" @closeForm="closeForm"
          @saveForm="saveForm" @editForm="editForm"></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="msgBox.dialog" class="ma">
      <MessageBox :title="msgBox.title" :prompt="msgBox.prompt" :isError="true" @close="msgBox.dialog = false">
      </MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import clientService from "@/services/clientService";
import ClientCardTitle from "@/components/clients/ClientCardTitle";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";
import ClientAddressModel from '@/models/clients/ClientAddressModel';

export default {
  name: "ClientAddressForm",
  components: {
    ClientCardTitle
    , EditSaveCancel
    , MessageBox
  },
  props: {
    clientPerson: Object
    , clientAddress: Object
    , isEdit: Boolean
    , isReadOnly: Boolean
  },
  data() {
    return {
      myClientAddress: ClientAddressModel.clientAddress(),
      holderData: {},
      states: [],
      stateRules: [(v) => (v && v.length <= 2) || "Max 2 characters"],
      msgBox: {
        dialog: false,
        title: "Client Address",
        prompt: ""
      },
    };
  },
  computed: {
    isValid() {
      return commonService.isValidZip(this.myClientAddress.zip);
    }
  },
  mounted() {
    this.myClientAddress = commonService.clone(this.clientAddress);
    // console.log(this.myClientAddress);
    this.prevClientAddress = commonService.clone(this.clientAddress);
    this.getDropDowns();

  },
  methods: {
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async getDropDowns() {
      // this.countries = await admService.getSettingsAsSelectByPrefix("COUNTRY");
      this.states = await admService.getStatesSelect();
    },
    editForm() {
      this.$emit('editForm');
    },
    datePicker(tag, date) {
      this.clientAddress[tag] = date;
    },
    async saveForm() {
      let response = await clientService.postClientAddress(this.myClientAddress);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = ['Unable to save Address', ` ${response.rc}] ${response.msg}`];
      }
    },
    cancelForm() {
      let clientAddress = commonService.clone(this.prevClientAddress);
      this.$emit("cancelForm", clientAddress);
    },
    closeForm() {
      this.$emit("closeForm", this.clientAddress);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    }
  }
};
</script>

