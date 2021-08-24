<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-form>
        <v-card elevation outlined>
          <v-card-title class="green accent-5 white--text">
            Select A Credit Card</v-card-title
          >
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="4" class="mx-4">
                  <v-select
                    v-model="companyId"
                    label="Cc Company"
                    :items="companies"
                  >
                  </v-select
                  >{{ companyId }}
                </v-col>
                <v-col cols="4" class="mx-4">
                  <v-select
                    v-if="companyId > 0"
                    v-model="cardId"
                    label="Cc Card"
                    :items="companyCards"
                  >
                  </v-select>
                  {{ cardId }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col>{{ validCard }}</v-col>
                <v-col cols="3">
                  <v-btn v-if="validCard" @click="saveCcCardPick">OK</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn @click="cancelCcCardPick">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import ccCardService from "@/services/ccCardService";

export default {
  value: "CcCard",
  components: {},
  props: {
    a_card_id: Number,
  },
  data() {
    return {
      isReadOnly: true,
      ccCardData: null,
      cardId: 0,
      ccCards: [],
      companyId: 0,
      companies: [],
    };
  },
  computed: {
    companyCards() {
      let company_id = +this.companyId;
      let retval = this.ccCards.filter((item) => {
        return item.company_id === company_id;
      });
      return retval;
    },
    validCard() {
      return 0 < this.companyId && 0 < this.cardId;
    },
  },
  mounted() {
    this.getCcCards();
  },
  methods: {
    async getCcCards() {
      let resp = await ccCardService.getCreditCards();
      console.log(resp);
      if (resp && "data" in resp && resp.rc === 1) {
        this.ccCardData = resp.data;
        this.setCompanies();
        this.setCards();
        this.setCardAndCompanyId();
      }
      this.ccCard = this.ccCardData.map((item) => {
        return { value: item.cc_company_id, text: item.company_name };
      });
    },
    setCompanies() {
      let companies = {};
      this.ccCardData.forEach((item) => {
        if (!(item.cc_company_id in companies)) {
          companies[item.cc_company_id] = item.company_name;
        }
      });
      this.companies = Object.keys(companies).map((id) => {
        return { value: +id, text: companies[id] };
      });
    },
    setCards() {
      this.ccCards = this.ccCardData.map((item) => {
        return {
          company_name: item.company_name,
          company_id: +item.cc_company_id,
          value: +item.id,
          text: item.card_name,
        };
      });
    },
    setCardAndCompanyId() {
      console.log(this.a_card_id);
      let card_id = +this.a_card_id;
      let thisCard = this.ccCardData.filter((item) => item.id === card_id);
      console.log(thisCard, thisCard.length);
      if (thisCard.length > 0) {
        this.cardId = +thisCard[0].id;
        this.companyId = +thisCard[0].cc_company_id;
      }
    },
    saveCcCardPick() {
      console.log("saveCcCardPick", this.cardId);
      let cardId = this.cardId;
      let ccCards = this.ccCards
        .filter((item) => item.value === cardId)
        .map((item) => {
          return {
            cc_card_id: cardId,
            card_name: item.text,
            company_name: item.company_name,
            cc_company_id: item.company_id,
          };
        });
      if (ccCards.length > 0) {
        this.$emit("saveCcCardPick", ccCards[0]);
      }
    },
    cancelCcCardPick() {
      this.$emit("cancelCcCardPick");
    },
  },
  created() {},
};
</script>
<style scoped>
</style>