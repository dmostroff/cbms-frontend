<template>
  <div>
      <p>Top Nav</p>
    <v-row align="center" justify="center" class="mx-12">
      <v-col v-for="(item, index) in showMenuItems" :key="index">
        <router-link :to="item.link">{{ item.prompt }}</router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userService from '@/services/userService'

export default {
  name: "TopNav",
  components: {},
  props: [],
  data() {
    return {
      menuItems: [
        {
          prompt: "Clients",
          link: { name: "clients" },
        },
        {
          prompt: "CC Accounts",
          link: { name: "ccaccounts" },
        },
        {
          prompt: "CC Companies",
          link: { name: "cc-companies" },
        },
        {
          prompt: "CC Cards",
          link: { name: "cc-cards" },
        },
      ],
    };
  },
  computed: {
    showMenuItems: function () {
      let menuItems = this.menuItems.filter((item) =>
        userService.canAccess(item.link.name)
      );
      return menuItems;
    },
  },
  mounted() {},
  updated() {},
  destroyed() {},
  methods: {},
};
</script>

