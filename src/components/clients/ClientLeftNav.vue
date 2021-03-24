<template>
    <menu-display :menuItems="menuItems"></menu-display>
</template>
<script>
import MenuDisplay from '@/components/common/MenuDisplay';

export default{
    name: "ClientLeftNav",
    components: {
        MenuDisplay
    },
    props: {
        userId: Number
    },
    data: () => ({
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
    }),
}
</script>