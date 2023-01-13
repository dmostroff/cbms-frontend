<template>
  <v-container fluid>
    <v-row v-if="isValidClient">
      <v-col cols="2" align-self-flex-start><v-btn class="secondary" @click="goBack()">Back</v-btn></v-col>
      <v-spacer></v-spacer>
      <v-col class="subtitle-2">Id:{{ id }} Code: {{ client.person.client_code }}-{{ randnum }}</v-col>
      <v-col cols="6" align-self-center class="display-1">{{ client.person.client_name }}</v-col>
      <v-col cols="1" class="mr-2"><span v-if="clientAge">Age: {{ clientAge }}</span></v-col>
    </v-row>
    <v-row>
      <v-col>
        <ClientCreditSummary :creditSummary="client.credit_summary"></ClientCreditSummary>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-list :dense="true" dark class="overflow-y-auto" max-height="400">
          <v-list-item-group class="caption">
            <v-list-item v-for="(item, index) in tabItems" :key="index" @click="setTabItem(index)">
              {{ item.text }}
            </v-list-item></v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="10">
        <v-container fluid>
          <v-row>
            <div class="subtitle-2 pt-3 pb-0">
              {{ currentTab.text }}
            </div>
          </v-row>
          <v-row v-if="loading"> <!-- clientPersonIsReadOnly"-->
            <!-- <div>{{ client.person.last_name }}</div> -->
            <ClientPersonForm v-if="currentTab.value == 'person'" :clientPerson="client.person"
              :readonly="false" :showTitle="false" :key="randnum" @changeDob="changeDob" @saveItem="saveItem"
              @cancelForm="cancelForm"></ClientPersonForm>
            <ClientAddresses v-if="currentTab.value == 'addresses'" :clientPerson="client.person"
              :clientAddresses="client.addresses"
              :showTitle="false" :key="randnum" @setCurrentAddress="setCurrentAddress"
              @saveItem="saveItem"></ClientAddresses>
            <ClientIsraels v-if="currentTab.value == 'client_israels'" :clientPerson="client.person" :clientIsraels="client.client_israels" :showTitle="false"
              @saveItem="saveItem"></ClientIsraels>
            <CcAccounts v-if="currentTab.value == 'cc_accounts'" :clientPerson="client.person"
              :ccAccounts="client.cc_accounts" :showTitle="false" :key="randnum" @saveItem="saveItem"
              @cancelItem="cancelItem"></CcAccounts>
            <ClientLoans v-if="currentTab.value == 'loans'" :clientPerson="client.person"
              :clientLoans="client.loans" :showTitle="false" @saveItem="saveItem"></ClientLoans>
            <CreditReports
              v-if="currentTab.value == 'credit_reports'"
              :clientPerson="client.person"
              :creditReports="client.credit_reports"
              :showTitle="false"
              @saveItem="saveItem"
            ></CreditReports>
            <Checkings v-if="currentTab.value == 'checking'" :clientPerson="client.person"
              :checkings="client.checkings" :showTitle="false" :key="randnum" @saveItem="saveItem"
              @cancelForm="cancelForm">
            </Checkings>
            <CreditLineHistories v-if="currentTab.value == 'credit_line_histories'" :clientPerson="client.person"
              :creditLineHistories="client.credit_line_histories" :showTitle="false"
              @saveItem="saveItem" @cancelForm="cancelForm">
            </CreditLineHistories>
            <ClientInfoForm v-if="currentTab.value == 'client_info'" :clientPerson="client.person"
              :showTitle="false" @saveItem="saveItem"
              @cancelForm="cancelForm">
            </ClientInfoForm>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonService from "@/services/commonService";
import clientService from "@/services/clientService";
import ClientCreditSummary from "@/components/clients/ClientCreditSummary";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ClientAddresses from "@/components/clients/ClientAddresses";
import ClientIsraels from "@/components/clients/ClientIsraels";
import CcAccounts from "@/components/clients/CcAccounts";
import ClientLoans from "@/components/clients/ClientLoans";
import CreditReports from "@/components/clients/CreditReports";
import Checkings from "@/components/clients/Checkings";
import CreditLineHistories from "@/components/clients/CreditLineHistories";
import ClientInfoForm from "@/components/clients/ClientInfoForm";
import ClientModel from "@/models/clients/ClientModel";

export default {
  name: "ClientHome",
  components: {
    ClientCreditSummary,
    ClientPersonForm,
    ClientAddresses,
    ClientIsraels,
    CcAccounts,
    ClientLoans,
    CreditReports,
    Checkings,
    CreditLineHistories,
    ClientInfoForm,
  },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      loading: false,
      response: {
        rc: -1,
        msg: null,
        data: [],
      },
      isValidClient: false,
      client: ClientModel.client(),
      creditSummary: [],
      currentTabIndex: 0,
      tabItems: [
        {
          text: "Personal",
          value: "person",
        },
        {
          text: "Addresses",
          value: "addresses",
        },
        {
          text: "Credit Cards",
          value: "cc_accounts",
        },
        {
          text: "Loans",
          value: "loans",
        },
        {
          text: "Checking",
          value: "checking",
        },
        {
          text: "Credit Reports",
          value: "credit_reports",
        },
        {
          text: "Israel Info",
          value: "client_israels",
        },
        {
          text: "Credit Line History",
          value: "credit_line_histories"
        },
        // {
        //   text: "Info/Other Accounts",
        //   value: "client_info",
        // },
        // {
        //   text: "Client Documents",
        //   value: "documents",
        // },
        // {
        //   text: "Account Promos",
        //   value: "cc_account_promos",
        // },
        // {
        //   text: "Contact Info",
        //   value: "clientinfo",
        // },
      ],
      clientPersonIsReadOnly: false,
      randnum: Math.trunc((Math.random() * 100)),
      // currentTab: null,
    };
  },
  computed: {
    clientAge() {
      return commonService.getAge(this.client.person['dob']);
    },
    currentTab() {
      return this.tabItems[this.currentTabIndex];
    },
    isCurrentTab(item) {
      return (item && 'value' in item) ? item.value == this.currentTab.value : false
    }
  },
  watch: {
    id: function (val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
  created() { },
  mounted() {
    this.getClientInfo(this.id);
    this.randnum = Math.trunc((Math.random() * 100))
    this.loading = true;
  },
  methods: {
    async getClientInfo(id) {
      this.loading = true;
      this.isValidClient = false;
      this.response = await clientService.getClientData(id);
      console.log("ClientHome", this.response);
      let clientdata = commonService.getResponseDataIfSuccess(this.response);
      if (clientdata) {
        // console.log( clientdata);
        this.client = clientdata;
        this.isValidClient = true;
        this.client_age = commonService.getAge(this.client.person.dob);
        this.currentTabIndex = 0;
      }
      this.randnum = Math.trunc((Math.random() * 1000))
    },
    goBack() {
      this.$router.go(-1);
    },
    menuSelect(menuItem) {
      this.currentItem = menuItem;
    },
    setTabItem(tabIndex) {
      this.currentTabIndex = tabIndex;
      // this.currentTab = tabItem;
    },
    cancelForm(formName, clientPerson) {
      if (formName === "ClientPersonForm") {
        this.clientPersonIsReadOnly = true;
        this.client.person = clientPerson;
        this.goBack();
      }
      if (formName === "ClientInfoForm") {
        this.currentTabIndex = 0;
        this.clientPersonIsReadOnly = false;
      }
    },
    changeDob(dob) {
      try {
        this.client.person['dob'] = dob;
      } catch (e) {
        console.error(e);
      }
    },
    setCurrentAddress(address_current_status) {
      try {
        this.client.addresses.forEach((item, idx) => {
          let foundItem = address_current_status.filter(ii => ii.id === item.id);
          console.log(item, foundItem);
          if (foundItem.length > 0) {
            console.log(item, idx, foundItem);
            item['is_current'] = foundItem[0].is_current;
          }
        });

      } catch (e) {
        console.error(e);
      }
    },
    cancelItem() {
      this.randnum = Math.trunc((Math.random() * 1000))
    },
    saveItem(itemArray, newItem) {
      // console.log('saveItem', itemArray, newItem);
      commonService.upsert(itemArray, newItem);
      this.randnum = Math.trunc((Math.random() * 1000))
    }
  },
};
</script>
