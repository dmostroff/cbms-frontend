<template>
  <div>
    <h1>CLIENT LEFT NAV</h1>
    <menu-display :menuItems="menuItems"></menu-display>
  </div>
</template>
<script>
import MenuDisplay from '@/components/common/MenuDisplay';

export default{
    name: "ClientLeftNav",
    components: {
        MenuDisplay
    },
    props: {
        user: {
          default: 0,
          type: Number
        }
    },
    data () {
      return {
      userId: {
        type: Number,
        default: 0,
      },
      menuItems: [
        {
          prompt: "Client",
          link: { name: "clientDetail", params: { userId: this.userId }},
        },
        {
          prompt: "Credit Cards",
          link: { name: "clientCcAccounts", params: { userId: this.userId } },
        },
        {
          prompt: "Bank Accounts",
          link: { name: "clientBankAccounts", params: { userId: this.userId } },
        },
        {
          prompt: "Documents",
          link: { name: "clientDocuments", params: { userId: this.userId } },
        },
      ],
      }
    },
    mounted() {
      console.log( this.userId)
    }
}
</script>