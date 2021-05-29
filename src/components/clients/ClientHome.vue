<template>
  <v-card>
    <v-card-title>Id:{{id}}</v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="12" class="align-self-right">
            <div v-if="response.rc > -1">Client {{ response.data.person.last_name}}</div>{{response.rc}}
            <ClientPersonDetail :clientPerson="response.data.person"></ClientPersonDetail>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(item, index) in menuItems" :key="index">
            <v-btn>
              <router-link v-if="item.link" :to="item.link">{{
                item.prompt
              }}</router-link></v-btn
            >
          </v-col></v-row
        >
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import clientService from "@/services/clientService"
import ClientPersonDetail from "@/components/clients/ClientPersonDetail"

export default {
  name: "ClientHome",
  components: {
    ClientPersonDetail
  },
  props: [ 'id' ],
  // {
  //   id: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  data() {
    return {
      loading: true,
      response: {
        rc: -1,
        msg: null,
        data: [],
      },
      menuItems: [
        {
          prompt: "Personal",
          link: { name: "clientPersonDetail" },
        },
        {
          prompt: "Credit Cards",
          link: { name: "clientCreditCards" },
        },
        {
          prompt: "Bank Accounts",
          link: { name: "clientBankAccounts" },
        },
        {
          prompt: "Client Documents",
          link: { name: "clientDocuments" },
        },
        {
          prompt: "Account Promos",
          link: { name: "clientAccountPromos" },
        },
        {
          prompt: "Contact Info",
          link: { name: "clientContactInformation" },
        },
      ],
    };
  },
  watch: {
    "id": function(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    }
  },  
  mounted () {
    console.log( "ClientHome")
    console.log( this.$router)
    this.getClientInfo( this.id)
  },
  methods: {
    async getClientInfo( id)
    {
      this.loading = true
      this.response = await clientService.getClientData(id)
      console.log( this.response)
      this.loading = false
    },
    goBack() {
      this.$router.go(-1)
    },
  }
};
</script>
