<template>
  <v-container>
    <v-tabs v-model="currentItem" background-color="green darken-1" dark>
      <v-tab v-for="item in tabItems" :key="item.value">
        {{ item.text }}
      </v-tab>
      <v-tab-item v-for="item in tabItems" :key="item.value">
        <v-card>
          <component :is="currentComponent" v-bind="currentProps"></component>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import ccCardService from "@/services/ccCardService";
import CcCards from "@/components/creditcards/CcCards";
import CcCompanies from "@/components/creditcards/CcCompanies";

export default {
  name: "CcHome",
  components: {
    CcCards,
    CcCompanies,
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
      tabItems: [
        {
          text: "Credit Cards",
          value: "cccards",
          component: "CcCards",
          props: { companies: this.companyList, cards: this.ccCards },
        },
        {
          text: "Companies",
          value: "cccompanies",
          component: "CcCompanies",
          props: { companies: this.ccCompanies },
        },
      ],
      companyData: null,
      cardData: null,
    };
  },
  computed: {
    currentComponent: function () {
      return this.tabItems[this.currentItem].component;
    },
    currentProps: function () {
      let retval = {};
      if (this.tabItems[this.currentItem].value === "cccards") {
        retval = { companies: this.companyList, cards: this.ccCards };
      } else if (this.tabItems[this.currentItem].value === "cccompanies") {
        retval = { companies: this.ccCompanies };
      }
      console.log(retval);
      return retval;
    },
    companyList: function () {
      if (!this.companyData) {
        return [];
      }
      return this.companyData.map((item) => {
        return { text: item.company_name, value: item.id };
      });
    },
    ccCompanies: function () {
      return this.companyData;
    },
    ccCards: function () {
      return this.cardData;
    },
  },
  mounted() {
    this.getCcCompanies();
    this.getCcCards();
  },
  updated() {},
  destroyed() {},
  methods: {
    async getCcCompanies() {
      this.loading = true;
      this.response = await ccCardService.getCcCompanies();
      if ("rc" in this.response && this.response.rc == 1) {
        this.companyData = this.response.data;
      }
      console.log("CcCompanies", this.response);
      this.loading = false;
    },
    async getCcCards() {
      this.loading = true;
      this.response = await ccCardService.getCreditCards();
      if ("rc" in this.response && this.response.rc == 1) {
        this.cardData = this.response.data;
      }
      console.log("CcCards", this.ccCards);
      this.loading = false;
    },
    setCompanies(data) {
      this.companyList = data.map((item) => {
        return { text: item.company_name, value: item.id };
      });
      console.log("SetCompanies", data, this.companyList);
    },
  },
};
</script>

