<template>
  <v-form>
    <v-card>
      <v-card-title class="green accent-4 white--text">
        Cc Company
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ ccCompany.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption">
              Recorded on: {{ formatDateTime(ccCompany.recorded_on) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="ccCompany.company_name"
                label="Company Name"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="ccCompany.url"
                label="Url"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="ccCompany.contact"
                label="Contact"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="ccCompany.address_1"
                label="Address 1"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="ccCompany.address_2"
                label="Address 2"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="ccCompany.city"
                label="City"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="ccCompany.state"
                label="State"
                :items="states"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="ccCompany.zip"
                label="Zip"
                :keydown="formatZip()"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="ccCompany.country"
                label="Country"
                :items="countries"
                :readonly="isReadOnly"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="ccCompany.phone"
                label="Phone"
                :keydown="formatPhone('phone')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccCompany.phone_2"
                label="Phone 2"
                :keydown="formatPhone('phone_2')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="ccCompany.phone_fax"
                label="Phone Fax"
                :keydown="formatPhone('phone_fax')"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="ccCompany.company_info"
                label="Company Info"
                :readonly="isReadOnly"
              >
              </v-text-field>
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
import admService from '@/services/admService'
import ccCardService from "@/services/ccCardService";
import EditSaveCancelBtn from "@/components/common/EditSaveCancelBtn";

export default {
  value: "CcCompany",
  components: {
    EditSaveCancelBtn
  },
  props: {
    ccCompany: Object,
    companies: Array,
  },
  data() {
    return {
      isReadOnly: true,
      prevCcCompany: null,
      countries: [],
      states: [],
    };
  },
  computed: {},
  mounted() {
    this.prevCcCompany = commonService.clone(this.ccCompany);
    this.getCountries();
    this.states = admService.getStatesSelect()
  },
  methods: {
    async getCountries() {
      this.countries = await admService.getSettingsAsSelectByPrefix( 'COUNTRY')
    },
    formatPhone(field) {
      this.$nextTick(() => {
        this.ccCompany[field] = commonService.formatPhone(this.ccCompany[field])
      });
    },
    formatZip() {
      this.$nextTick(() => {
        this.ccCompany.zip = commonService.formatZip(this.ccCompany.zip);
      });
    },
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.isReadOnly = false;
    },
    async saveForm() {
      // let ccCompany = await ccCardService.postCcCompany(this.ccCompany);
      this.isReadOnly = true;
      return await ccCardService.postCcCompany(this.ccCompany);
      // this.$emit("saveForm", ccCompany);
    },
    cancelForm() {
      this.isReadOnly = true;
      this.ccCompany = commonService.clone(this.prevCcCompany);
    },
    closeForm() {
      this.$emit("cancelForm");
    },
  },
  created() {},
};
</script>
<style scoped>
</style>