<template>
  <v-container fluid>
    <v-row v-if="isValidClient">
      <v-col cols="2" align-self-start><v-btn class="secondary" @click="goBack()">Back</v-btn></v-col>
      <v-col cols="1" align-self-start>Id:{{ id }}</v-col>
      <v-col cols="8" align-self-center class="display-1">{{ clientName }}</v-col>
      <v-col cols="1"><span v-if="clientAge">Age: {{clientAge}}</span></v-col>
    </v-row>
    <v-row>
      <v-col>
        <ClientCreditSummary
          :creditSummary="client.credit_summary"
        ></ClientCreditSummary>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-list :dense="true" dark class="overflow-y-auto" max-height="400">
          <v-list-item
            v-for="(item, index) in tabItems"
            :key="item.value"
            @click="setTabItem(index)"
            :class="{ secondary: item.value === currentTab.value }"
          >
            {{ item.text }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10">
        <v-container fluid>
        <v-row>
          <div class="subtitle-2 pt-3 pb-0">
            {{ currentTab.text }}
            </div>
          </v-row>
          <v-row>
            <ClientPersonForm
              v-if="currentTab.value == 'person'"
              :clientName="clientName"
              :clientPerson="client.person"
              :readonly="clientPersonIsReadOnly"
              :showTitle="false"
              @saveItem="saveItem"
              @cancelForm="cancelForm"
            ></ClientPersonForm>
            <ClientAddresses
              v-if="currentTab.value == 'addresses'"
              :clientId="client.person.id"
              :clientName="clientName"
              :clientAddresses="client.addresses"
              :showTitle="false"
              @saveItem="saveItem"
            ></ClientAddresses>
            <ClientBankAccounts
              v-if="currentTab.value == 'bank_accounts'"
              :clientName="clientName"
              :clientId="client.person.id"
              :bankAccounts="client.bank_accounts"
              :showTitle="false"
              @saveItem="saveItem"
            ></ClientBankAccounts>
            <CcAccounts
              v-if="currentTab.value == 'cc_accounts'"
              :clientName="clientName"
              :clientId="client.person.id"
              :ccAccounts="client.cc_accounts"
              :showTitle="false"
              @saveItem="saveItem"
            ></CcAccounts>
            <ClientLoans
              v-if="currentTab.value == 'loans'"
              :clientId="client.person.id"
              :clientName="clientName"
              :clientLoans="client.loans"
              :showTitle="false"
              @saveItem="saveItem"
            ></ClientLoans>
            <CreditBuilds
              v-if="currentTab.value == 'credit_builds'"
              :clientId="client.person.id"
              :clientName="clientName"
              :creditBuilds="client.credit_builds"
              :showTitle="false"
              @saveItem="saveItem"
            ></CreditBuilds>
            <ClientInfoForm
              v-if="currentTab.value == 'client_info'"
              :clientName="clientName"
              :clientId="client.person.id"
              :clientPerson="client.person"
              :showTitle="false"
              @saveItem="saveItem"
              @cancelForm="cancelForm"
            >
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
import ClientBankAccounts from "@/components/clients/ClientBankAccounts";
import CcAccounts from "@/components/clients/CcAccounts";
import ClientLoans from "@/components/clients/ClientLoans";
import CreditBuilds from "@/components/clients/CreditBuilds";
import ClientInfoForm from "@/components/clients/ClientInfoForm";

export default {
  name: "ClientHome",
  components: {
    ClientCreditSummary,
    ClientPersonForm,
    ClientAddresses,
    ClientBankAccounts,
    CcAccounts,
    ClientLoans,
    CreditBuilds,
    ClientInfoForm,
  },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      loading: true,
      response: {
        rc: -1,
        msg: null,
        data: [],
      },
      isValidClient: false,
      client: {
        person: null,
        credit_summary: null,
        addresses: [],
        bank_account: [],
        cc_account: [],
      },
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
          text: "Credit Build",
          value: "credit_builds",
        },
        {
          text: "Bank Accounts",
          value: "bank_accounts",
        },
        {
          text: "Info/Other Accounts",
          value: "client_info",
        },
        {
          text: "Client Documents",
          value: "documents",
        },
        {
          text: "Account Promos",
          value: "cc_account_promos",
        },
        {
          text: "Contact Info",
          value: "clientinfo",
        },
      ],
      clientPersonIsReadOnly: false,
      // currentTab: null,
    };
  },
  computed: {
    clientName() {
      let name = '';
      if( this.client.person) {
        let first_name = this.client.person.first_name;
        first_name += (this.client.person.middle_name) ? ' ' + this.client.person.middle_name : ''
        name = `${this.client.person.last_name}, ${first_name}`;
      }
      return name;
    },
    clientAge() {
      return commonService.getAge( this.client.person['dob']);
    },
    currentTab() {
      return this.tabItems[this.currentTabIndex];
    },
  },
  watch: {
    id: function (val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
  mounted() {
    this.getClientInfo(this.id);
  },
  methods: {
    async getClientInfo(id) {
      this.loading = true;
      this.isValidClient = false;
      this.response = await clientService.getClientData(id);
      let clientdata = commonService.getResponseDataIfSuccess( this.response);
      if( clientdata) {
        this.client = clientdata;
        this.isValidClient = true;
        this.client_age = commonService.getAge( this.client.person.dob);
      }
      this.loading = false;
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
    cancelForm( formName, clientPerson) {
      if( formName === "ClientPersonForm") {
        this.clientPersonIsReadOnly = true;
        this.client.person = clientPerson;
        this.goBack();
      }
      if( formName === "ClientInfoForm") {
        this.currentTabIndex = 0;
        this.clientPersonIsReadOnly = false;
      }
    },
    saveItem( itemArray, newItem) {
      console.log('saveItem', itemArray, newItem);
      commonService.upsert( itemArray, newItem);
      this.getClientInfo(this.id);
    }
  },
};
</script>
