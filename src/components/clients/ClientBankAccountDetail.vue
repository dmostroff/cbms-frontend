<template>
  <v-card>
    <v-card-header :md-elevation="2">
      Client Bank Account
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Id</span>:</v-col>
          <v-col>
            {{clientBankAccount.id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Client Id</span>:</v-col>
          <v-col>
            {{clientBankAccount.client_id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Bank Name</span>:</v-col>
          <v-col>
            {{clientBankAccount.bank_name}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Account Num</span>:</v-col>
          <v-col>
            {{clientBankAccount.account_num}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Routing Num</span>:</v-col>
          <v-col>
            {{clientBankAccount.routing_num}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Branch Num</span>:</v-col>
          <v-col>
            {{clientBankAccount.branch_num}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Iban</span>:</v-col>
          <v-col>
            {{clientBankAccount.iban}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Country</span>:</v-col>
          <v-col>
            {{clientBankAccount.country}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Account Login</span>:</v-col>
          <v-col>
            {{clientBankAccount.account_login}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Account Pwd</span>:</v-col>
          <v-col>
            {{clientBankAccount.account_pwd}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Account Status</span>:</v-col>
          <v-col>
            {{clientBankAccount.account_status}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Debit Card</span>:</v-col>
          <v-col>
            {{clientBankAccount.debit_card}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Debit Info</span>:</v-col>
          <v-col>
            {{clientBankAccount.debit_info}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Recorded On</span>:</v-col>
          <v-col>
            {{clientBankAccount.recorded_on}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  value: "ClientBankAccount",
  components: {
  },
  props: {
    clientBankAccount: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editClientBankAccountForm" )
    },
    cancelForm() {
      this.$emit( "cancelClientBankAccountForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>