<template>
  <v-form>
    <v-card>
      <v-card-title>Other Accounts</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <div class="title">Other Accounts</div>
              <v-checkbox
                v-for="item in otherAccountsList"
                :key="item.id"
                v-model="clientPerson.client_info.otherAccounts[item.keyname]"
                :label="item.keyvalue"
                color="green"
                >{{ item.keyvalue }}
              </v-checkbox>
            </v-col>
            <v-col cols="3">
              <div class="title">Filed Taxes?</div>
              <v-checkbox
                v-model="clientPerson.client_info.filedTaxes"
                label="Filed taxes this year"
                color="green"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="3">
              <div class="title">Experian</div>
              <v-text-field
                v-model="clientPerson.client_info.experianUser"
                label="Experian"
              ></v-text-field>
              <Password
                :pwd = "clientPerson.client_info.experianPassword"
                label="Experian Password"
                tag="experianPassword"
                @passwordDone="passwordDone"
              >
              </Password>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
          :isValid="isValid"
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
        @close="msgBox.dialog = false"
      ></MessageBox>
    </v-dialog>
  </v-form>
</template>
<script>
import commonService from "@/services/commonService";
import admService from "@/services/admService";
import clientService from "@/services/clientService";
import Password from "@/components/common/Password";
import EditSaveCancel from "@/components/common/EditSaveCancel";
import MessageBox from "@/components/common/MessageBox";

export default {
  name: "ClientInfoForm",
  components: {
    Password,
    EditSaveCancel,
    MessageBox,
  },
  props: {
    clientId: [String, Number],
    clientName: String,
    clientPerson: Object,
  },
  data() {
    return {
      loading: true,
      response: {
        rc: -1,
        msg: null,
        data: [],
      },
      isValid: true,
      isReadOnly: false,
      otherAccountsList: [],
      otherAccounts: {},
      clientInfoOtherData: {},
      msgBox: {
        dialog: false,
        title: "Client Address",
        prompt: "",
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getOtherAccounts(this.id);
    this.getClientInfoOtherData();
  },
  methods: {
    async getOtherAccounts() {
      this.otherAccountsList = await admService.getSettingsByPrefix(
        "OTHERACCOUNTS"
      );
    },
    defaultOtherAccounts() {
      let defaultAccounts = {};
      this.otherAccountsList.forEach( item => {
        defaultAccounts[item.keyname] = false;
        });
      return defaultAccounts;
    },
    extractOtherAccounts() {
      let defaultAccounts = {};
      this.otherAccountsList.forEach( item => {
        defaultAccounts[item.keyname] = false;
        });
      let currentOtherAccounts = commonService.getJsonData(
        this.clientPerson.client_info,
        "otherAccounts",
        defaultAccounts
      );
      return currentOtherAccounts;
    },
    getClientInfoOtherData() {
      if(!this.clientPerson.client_info) {
        this.clientPerson.client_info = {};
      }
      this.clientInfoOtherData = { filedTaxes: false, experianUser: '', experianPassword: '', otherAccounts: this.defaultOtherAccounts()};
      Object.keys(this.clientInfoOtherData).forEach( k => {
        this.clientPerson.client_info[k] = commonService.getJsonData(
          this.clientPerson.client_info,
          k,
          this.clientInfoOtherData[k]
        );
        console.log( k, this.clientPerson.client_info[k]);
      });
    },
    passwordDone(password, tag) {
      if( tag === 'experianPassword') {
        this.clientPerson.client_info[tag] = password;
      }
    },

    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      console.log("Save Form", this.clientPerson.client_info);
      let response = await clientService.postClientPerson(this.clientPerson);
      if (!commonService.emitSaveForm(this, response)) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Client other Accounts",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
      this.isReadOnly = true;
    },
    cancelForm() {
      this.$emit("cancelForm", "ClientInfoForm", null);
    },
    closeForm() {
      this.$emit("cancelForm", "ClientInfoForm", null);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
  },
};
</script>
