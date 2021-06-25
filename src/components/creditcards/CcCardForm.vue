<template>
  <v-form>
    <v-card width="75%" class="ma-auto align-self-center">
      <v-card-title class="green accent-5 white--text"> Credit Card {{companyName}} </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ ccCard.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(ccCard.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="ccCard.cc_company_id"
                label="Cc Company"
                :items="[]"
                :readonly="isReadOnly"
                >
              </v-select>
              <v-text-field
                v-model="ccCard.cc_company_id"
                label="Cc Company Id"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccCard.card_name"
                label="Card Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccCard.version"
                label="Version"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccCard.annual_fee"
                label="Annual Fee"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-switch
                v-model="ccCard.first_year_free"
                label="First Year Free"
                color="green"
                :value="true"
                hide-details
                :readonly="isReadOnly"
              >
              </v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancelBtn
          :isReadOnly="isReadOnly"
          @editForm="editForm"
          @saveForm="saveForm"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
        ></EditSaveCancelBtn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
// import admService from '@/services/admService'
import ccCardService from "@/services/ccCardService";
import EditSaveCancelBtn from "@/components/common/EditSaveCancelBtn";

export default {
  value: "CcCard",
  components: {
    EditSaveCancelBtn,
  },
  props: {
    ccCard: Object,
    companyName: String,
    companies: Array,
  },
  data() {
    return {
      isReadOnly: true,
      prevCcCard: null,
    };
  },
  computed: {},
  mounted() {
    this.prevCcCard = commonService.clone(this.ccCard);
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      let ccCard = await ccCardService.postCcCard(this.ccCard);
      this.isReadOnly = true;
      this.$emit("saveForm", ccCard);
    },
    cancelForm() {
      this.isReadOnly = true;
      let ccCard = commonService.clone(this.prevCcCard);
      this.$emit("cancelForm", ccCard);
    },
    closeForm() {
      let ccCard = this.ccCard;
      this.$emit("cancelForm", ccCard);
    },
  },
  created() {},
};
</script>
<style scoped>
</style>