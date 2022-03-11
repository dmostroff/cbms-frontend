<template>
  <v-card>
    <v-card-title>Credit Card Accounts</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-treeview activatable :items="ccTreeView">
              <template slot="label" slot-scope="{ item }">
                <a @click="selectCard(item)">{{ item.name }}</a>
              </template>
            </v-treeview>
          </v-col>
          <v-col cols="10">
            <CcAccounts :ccAccounts="ccCardAccounts"></CcAccounts>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import commonService from "@/services/commonService";
import ccCardService from "@/services/ccCardService";
import CcAccounts from './CcAccounts.vue';

export default {
  name: "CcAccountsHome",
  components: {
    CcAccounts
    // CcCardList,
    // CcCompanies,
    // CcAccounts,
  },
  props: [],
  data() {
    return {
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      currentItem: 0,
      isValidClient: true,
      companyData: null,
      cardData: [],
      ccAccounts: [],
      ccTreeView: [],
      currentCard: {},
    };
  },
  computed: {
    ccCards: function () {
      return this.cardData;
    },
    ccCardAccounts: function() {
      let cardAccounts = this.filterCcAccountsByCard();
      return cardAccounts; 
    },
  },
  mounted() {
    this.getData();
  },
  updated() {},
  destroyed() {},
  methods: {
    async getData() {
      await this.getCcCompanies();
      await this.getCcCards();
      await this.getCcAccounts();
      this.createTreeView();
    },
    async getCcCompanies() {
      this.loading = true;
      let response = await ccCardService.getCcCompanies();
      if (response.rc == 1) {
        this.companyData = response.data;
      }
      console.log("CcCompanies", response);
      this.loading = false;
    },
    async getCcCards() {
      this.loading = true;
      let response = await ccCardService.getCreditCards();
      if (response.rc == 1) {
        this.cardData = response.data;
      }
      console.log("CcCards", this.ccCards);
      this.loading = false;
    },
    async getCcAccounts() {
      this.loading = true;
      let response = await ccCardService.getCcAccounts();
      if (response.rc == 1) {
        this.ccAccounts = response.data;
      }
    },
    createTreeView() {
      let q4 = [];
      let cards = this.cardData;
      this.cardData.forEach((item) => {
        if (q4.filter((x) => x["id"] === item["cc_company_id"]).length === 0) {
          let children = cards
            .filter(
              (childitem) =>
                childitem["cc_company_id"] === item["cc_company_id"]
            )
            .map((carditem) => {
              return { id: carditem["id"], name: carditem["card_name"] };
            });
          q4.push({
            id: item["cc_company_id"],
            name: item["company_name"],
            children: children,
          });
        }
      });
      this.ccTreeView = q4;
    },
    setCompanies(data) {
      this.companyList = data.map((item) => {
        return { text: item.company_name, value: item.id };
      });
    },
    selectCard(item) {
      this.currentCard = item;
      console.log( item);
    },
    filterCcAccountsByCard() {
      let selectedCard = this.currentCard;
      let accounts = this.ccAccounts.filter((item) => item.cc_card_id == selectedCard.id);
      console.log( accounts);
      return accounts;
    },
    saveItem(itemArray, newItem) {
      commonService.upsert(itemArray, newItem);
    },
  },
};
</script>

