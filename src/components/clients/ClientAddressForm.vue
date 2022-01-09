<template>
  <v-form>
    <v-card>
      <v-card-title class="primary white--text">
        <v-layout class="mr-1">
          <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-else>Edit</span>
            Client Address</v-flex
          >
          <v-spacer></v-spacer>
          <v-flex align-self-end class="subtitle-2"
            >{{ clientName }}
            <span align-self-end class="caption mx-4"
              >Client Id: {{ clientAddress.client_id }}</span
            >
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ clientAddress.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(clientAddress.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="clientAddress.address_type"
                label="Address Type"
                :items="addressTypes"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="clientAddress.address_1"
                label="Address 1"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientAddress.address_2"
                label="Address 2"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="clientAddress.city"
                label="City"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="clientAddress.state"
                label="State"
                :items="states"
              >
              </v-select>
              <!-- <v-text-field
                v-model="clientAddress.state"
                label="State"
                :readonly="isReadOnly"
                message="Use two letter state code"
                maxlength="2"
                :rules="stateRules"
              >
              </v-text-field> -->
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="clientAddress.zip"
                label="Zip"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="clientAddress.country"
                label="Country"
                :items="countries"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="clientAddress.valid_from"
                label="Valid From"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="clientAddress.valid_to"
                label="Valid To"
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
          :isValid="isValid"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
          @saveForm="saveForm"
          @editForm="editForm"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="msgBox.dialog"
      class="ma">
      <MessageBox
        :title="msgBox.title"
        :prompt="msgBox.prompt"
        :isError="true"
        @close="msgBox.dialog = false"
      ></MessageBox>
    </v-dialog>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import clientService from "@/services/clientService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";

export default {
  value: "ClientAddress",
  components: {
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientName: String,
    clientAddress: Object,
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addressTypes: [],
      countries: [],
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
      return this.clientAddress.address_type > ''
        && this.clientAddress.address_1 > ''
        && commonService.isValidZip(this.clientAddress.zip);
    }
  },
  mounted() {
    this.prevClientAddress = commonService.clone(this.clientAddress);
    this.getDropDowns();
    this.clientAddress.valid_from = this.formatDate(
      this.clientAddress.valid_from
    );
    this.clientAddress.valid_to = this.formatDate(this.clientAddress.valid_to);
  },
  methods: {
    formatDate(date) {
      return commonService.formatDate(date);
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    async getDropDowns() {
      this.addressTypes = await admService.getSettingsAsSelectByPrefix(
        "ADDRESSTYPE"
      );
      this.countries = await admService.getSettingsAsSelectByPrefix("COUNTRY");
      this.states = admService.getStatesSelect();
    },
    editForm() {
      this.$emit( 'editForm');
    },
    validateResidentDates() {
      if (this.clientAddress.valid_from) {
        this.clientAddress.valid_from = new Date(this.clientAddress.valid_from)
          .toISOString()
          .slice(0, 10);
      }
      if (this.clientAddress.valid_to) {
        this.clientAddress.valid_to = new Date(this.clientAddress.valid_to)
          .toISOString()
          .slice(0, 10);
      }
    },
    async saveForm() {
      this.validateResidentDates();
      console.log(this.clientAddress);
      let response = await clientService.postClientAddress(this.clientAddress);
      if( !commonService.emitSaveForm(this, response)) {
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
  },
  created() {},
};
</script>
<style scoped>
</style>