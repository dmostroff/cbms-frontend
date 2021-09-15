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
                v-model="otherAccounts[item.keyname]"
                :label="item.keyvalue"
                color="green"
                >{{ item.keyvalue }}
              </v-checkbox>
            </v-col>
            <v-col cols="3">
              <div class="title">Filed Taxes?</div>
              <v-checkbox
                v-model="clientInfoOtherData.filedTaxes"
                label="Filed taxes this year"
                color="green"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="3">
              <div class="title">Experian</div>
              <v-text-field
                v-model="clientInfoOtherData.experianUser"
                label="Experian"
              ></v-text-field>
              <Password
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
      console.log("Victoria", this.otherAccountsList, this.clientPerson);
      this.otherAccounts = this.extractOtherAccounts();
    },
    extractOtherAccounts() {
      let currentOtherAccounts = commonService.getJsonData(
        this.clientPerson.client_info,
        "otherAccounts"
      );
      this.otherAccountsList.forEach((item) => {
        if (!(item.keyname in currentOtherAccounts)) {
          currentOtherAccounts[item.keyname] = false;
        }
      });
      return currentOtherAccounts;
    },
    getClientInfoOtherData() {
      this.clientInfoOtherData["filedTaxes"] = commonService.getJsonData(
        this.clientPerson.client_info,
        "filedTaxes"
      );
    },
    passwordDone(password, tag) {
      this.clientInfoOtherData[tag] = password;
    },

    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      commonService.setJsonData(
        this.clientPerson,
        "client_info",
        "otherAccounts",
        this.otherAccounts
      );
      Object.keys(this.clientInfoOtherData).forEach((keyname) => {
        commonService.setJsonData(
          this.clientPerson,
          "client_info",
          keyname,
          this.clientInfoOtherData[keyname]
        );
      });
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
      console.log("save client other accounts", this.response);
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
