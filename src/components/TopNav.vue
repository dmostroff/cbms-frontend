<template>
  <div style="border-bottom: 1px solid steelblue;">
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
          prompt: "Credit Summary",
          link: { name: "creditsummary" },
        },
        {
          prompt: "Clients",
          link: { name: "clients" },
        },
        {
          prompt: "Credit XXXX Cards",
          link: { name: "cchome" },
        },
        {
          prompt: "Admin",
          link: { name: "adminhome" },
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

