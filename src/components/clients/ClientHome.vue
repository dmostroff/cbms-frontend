<template>
  <v-container>
    <v-row v-if="isValidClient">
      <v-col align-self-start><v-btn class="secondary" @click="goBack()">Back</v-btn></v-col>
      <v-col align-self-start>Id:{{ id }}</v-col>
      <v-col align-self-center class="h2">{{ clientName }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <ClientCreditSummary
          :creditSummary="client.credit_summary"
        ></ClientCreditSummary>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
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
      <v-col cols="9">
        <v-card>
          <v-card-title class="subtitle-2 pt-3 pb-0">
            {{ currentTab.text }}
          </v-card-title>
          <v-card-text>
            <ClientPersonForm
              v-if="currentTab.value == 'person'"
              :clientName="clientName"
              :clientPerson="client.person"
              :readonly="clientPersonIsReadOnly"
              :showTitle="false"
            ></ClientPersonForm>
            <ClientAddresses
              v-if="currentTab.value == 'addresses'"
              :clientName="clientName"
              :clientAddresses="client.addresses"
              :showTitle="false"
            ></ClientAddresses>
            <ClientBankAccounts
              v-if="currentTab.value == 'bank_accounts'"
              :clientName="clientName"
              :bankAccounts="client.bank_accounts"
              :showTitle="false"
            ></ClientBankAccounts>
            <ClientCcAccounts
              v-if="currentTab.value == 'cc_accounts'"
              :clientName="clientName"
              :ccAccounts="client.cc_accounts"
              :showTitle="false"
            ></ClientCcAccounts>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import clientService from "@/services/clientService";
import ClientCreditSummary from "@/components/clients/ClientCreditSummary";
import ClientPersonForm from "@/components/clients/ClientPersonForm";
import ClientAddresses from "@/components/clients/ClientAddresses";
import ClientBankAccounts from "@/components/clients/ClientBankAccounts";
import ClientCcAccounts from "@/components/clients/ClientCcAccounts";

export default {
  name: "ClientHome",
  components: {
    ClientCreditSummary,
    ClientPersonForm,
    ClientAddresses,
    ClientBankAccounts,
    ClientCcAccounts,
  },
  props: {
    id: Number,
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
          link: { name: "clientPersonDetail" },
        },
        {
          text: "Addresses",
          value: "addresses",
          link: { name: "clientAddresses" },
        },
        {
          text: "Credit Cards",
          value: "cc_accounts",
          link: { name: "clientCreditCards" },
        },
        {
          text: "Bank Accounts",
          value: "bank_accounts",
          link: { name: "clientBankAccounts" },
        },
        {
          text: "Client Documents",
          value: "documents",
          link: { name: "clientDocuments" },
        },
        {
          text: "Account Promos",
          value: "cc_account_promos",
          link: { name: "clientAccountPromos" },
        },
        {
          text: "Contact Info",
          value: "clientinfo",
          link: { name: "clientContactInformation" },
        },
      ],
      clientPersonIsReadOnly: false,
      // currentTab: null,
    };
  },
  computed: {
    clientName: function () {
      return this.client.person
        ? `${this.client.person.last_name}, ${this.client.person.first_name} ${this.client.person.middle_name}`
        : "";
    },
    currentTab: function () {
      return this.tabItems[this.currentTabIndex];
    },
  },
  watch: {
    id: function (val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
  mounted() {
    console.log("ClientHome", this.id, "worm");
    console.log(this.$router);
    this.getClientInfo(this.id);
  },
  methods: {
    async getClientInfo(id) {
      this.loading = true;
      this.isValidClient = false;
      this.response = await clientService.getClientData(id);
      console.log(this.response);
      if ("rc" in this.response && 1 == this.response.rc) {
        this.client = this.response.data;
        this.isValidClient = true;
        console.log(this.client);
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
        this.clientPersonIsReadOnly = true
        this.client.person = clientPerson
      }
    }
  },
};
</script>
