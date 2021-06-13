<template>
  <v-card>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab v-for="item in tabItems" :key="item.key">
          {{ item.prompt}}
        </v-tab>
      </v-tabs>
    <v-card-title>
        <v-layout v-if="isValidClient"><v-flex align-self-start>Id:{{id}}</v-flex>
        <v-flex align-self-center class="h2">{{ clientName }}</v-flex>
        </v-layout>
      </v-card-title>
    <v-card-subtitle>
      <ClientCreditSummary :creditSummary="client.credit_summary"></ClientCreditSummary>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab-item v-for="item in tabItems" :key="item.key">
          <v-card>
            <ClientPersonDetail v-if="item.key == 'person'" :clientPerson="client.person" :showTitle="false"></ClientPersonDetail>
            <ClientAddresses v-if="item.key == 'addresses'" :clientAddresses="client.addresses" :showTitle="false"></ClientAddresses>
            <ClientBankAccounts v-if="item.key == 'bank_accounts'" :bankAccounts="client.bank_accounts" :showTitle="false"></ClientBankAccounts>
            <ClientCcAccounts v-if="item.key == 'cc_accounts'" :ccAccounts="client.cc_accounts" :showTitle="false"></ClientCcAccounts>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
import clientService from "@/services/clientService";
import ClientCreditSummary from '@/components/clients/ClientCreditSummary';
import ClientPersonDetail from "@/components/clients/ClientPersonDetail";
import ClientAddresses from '@/components/clients/ClientAddresses';
import ClientBankAccounts from "@/components/clients/ClientBankAccounts";
import ClientCcAccounts from "@/components/clients/ClientCcAccounts";

export default {
  name: "ClientHome",
  components: {
    ClientCreditSummary,
    ClientPersonDetail,
    ClientAddresses,
    ClientBankAccounts,
    ClientCcAccounts,
  },
  props: ["id"],
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
        cc_account: []

      },
      creditSummary: [],
      currentItem: null,
      tabItems: [
        {
          prompt: "Personal",
          key: "person",
          link: { name: "clientPersonDetail" },
        },
        {
          prompt: "Addresses",
          key: "addresses",
          link: { name: "clientAddresses" },
        },
        {
          prompt: "Credit Cards",
          key: "cc_accounts",
          link: { name: "clientCreditCards" },
        },
        {
          prompt: "Bank Accounts",
          key: "bank_accounts",
          link: { name: "clientBankAccounts" },
        },
        {
          prompt: "Client Documents",
          key: "documents",
          link: { name: "clientDocuments" },
        },
        {
          prompt: "Account Promos",
          key: "cc_account_promos",
          link: { name: "clientAccountPromos" },
        },
        {
          prompt: "Contact Info",
          key: "clientinfo",
          link: { name: "clientContactInformation" },
        },
      ],
    };
  },
  computed: {
    clientName: function() {
      return (this.client.person) ?
        `${this.client.person.last_name}, ${this.client.person.first_name} ${this.client.person.middle_name}`
      : '' }
  },
  watch: {
    id: function (val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
  mounted() {
    console.log("ClientHome", this.id, 'worm');
    console.log(this.$router);
    this.getClientInfo();
  },
  methods: {
    async getClientInfo(id) {
      this.loading = true;
      this.isValidClient = false;
      this.response = await clientService.getClientData(id);
      if ("rc" in this.response) {
        if (1 === this.response.rc) {
          this.client = this.response.data;
          this.isValidClient = true;
          console.log( this.client)
        }
      }
      console.log(this.response);
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    menuSelect( menuItem) {
      this.currentItem = menuItem
    }
  },
};
</script>
