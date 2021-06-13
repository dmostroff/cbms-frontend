<template>
  <v-card>
    <v-tabs v-model="currentItem" background-color="primary" dark>
      <v-tab v-for="item in tabItems" :key="item.key">
        {{ item.prompt }}
      </v-tab>
    </v-tabs>
    <v-card-title>
      <v-layout v-if="isValidClient">
        <v-flex align-self-center class="h2">Credit Card Central</v-flex>
      </v-layout>
    </v-card-title>
    <v-card-subtitle>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab-item v-for="item in tabItems" :key="item.key">
          <v-card>
            {{item.key}} :: {{ currentItem}}
            <CcCards v-if="item.key == 'cccards'" :companies="companyList" :cards="ccCards"></CcCards>
            <CcCompanies v-if="item.key == 'cccompanies'" :companies="ccCompanies"></CcCompanies>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
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
        data: []
      },
      currentItem: null,
      isValidClient: true,
      tabItems: [
        {
          prompt: "Credit Cards",
          key: "cccards",
        },
        {
          prompt: "Companies",
          key: "cccompanies",
        },
      ],
      companyList: [],
      ccCompanies: null,
      ccCards: null,
    };
  },
  computed: {},
  mounted() {
    this.getCcCompanies()
    this.getCcCards()
  },
  updated() {},
  destroyed() {},
  methods: {
    async getCcCompanies() {
        this.loading = true;
        this.response = await ccCardService.getCcCompanies();
        if( 'rc' in this.response && this.response.rc == 1) {
          this.ccCompanies = this.response.data
          this.setCompanies(this.ccCompanies)
        }
        console.log( 'CcCompanies', this.response)
        this.loading = false;
    },
    async getCcCards() {
      this.loading = true;
      this.response = await ccCardService.getCreditCards();
        if( 'rc' in this.response && this.response.rc == 1) {
          this.ccCards = this.response.data
        }
      console.log("CcCards", this.ccCards);
      this.loading = false;
    },
    setCompanies( data) {
      this.companyList = data.map(( item) => { return { text: item.company_name, value: item.cc_company_id  }})
      console.log( 'SetCompanies', data, this.companyList)
    }

  },
};
</script>

