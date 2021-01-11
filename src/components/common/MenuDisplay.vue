<template>
  <v-menu v-model="showModel">
    <v-list>
      <v-list-item v-if="title > ''">{{ title }}</v-list-item>
      <v-list-item v-for="(item, index) in showMenuItems" :key="index">
        <router-link v-if="link in item" :to="item.link">{{
          item.prompt
        }}</router-link>
        <v-list-item-title v-else>{{ item.prompt }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: "MenuDisplay",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    menuItems: {
      type: Array,
      default: () => [],
    },

    data() {
      return {
        showMenuItems: [],
      };
    },
    computed: {},
    mounted() {
      this.showMenuItems = this.menuItems.filter((item) => {
        return "link" in item ? userService.canAccess(item.link.name) : true;
      });
    },
  },
  updated() {},
  destroyed() {},
  methods: {},
};
</script>

