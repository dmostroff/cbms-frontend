<template>
<div>
  Train
  <v-navigation-drawer 
    v-model="displayMenu" absolute temporary
    @transitioned="toggleLeftNav" >
    <v-list-item v-if="title">
      <v-list-item-content>
        <v-list-item-title>
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(item, index) in menuItems" :key="index">
      <router-link v-if="item.link" :to="item.link">{{
        item.prompt
      }}</router-link>
      <v-list-item-title v-else>{{ item.prompt }}</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  name: "LeftNav",
  components: {},
  props: {
    title: {
      type: String,
      default: "Select",
    },
    showMenuItems: {
      type: Array,
      default: () => [
        {
          prompt: "Home",
          link: { name: "home" },
        },
        {
          prompt: "Credit Summary",
          link: { name: "creditsummary" },
        },
        {
          prompt: "Clients",
          link: { name: "clientx" },
        },
      ],
    },
  },
  data() {
    return {
      displayMenu: false,
      menuItems: [
        {
          prompt: "Home",
          link: { name: "home" },
        },
        {
          prompt: "Credit Summary",
          link: { name: "creditsummary" },
        },
        {
          prompt: "Clients",
          link: { name: "client" },
        },
        {
          prompt: "CC Accounts",
          link: { name: "ccaccounts" },
        },
        {
          prompt: "Admin",
          link: { name: "adminhome" },
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.$root.$on( 'toggleLeftNav', data => {
      console.log( "LeftNav "+ data)
      this.displayMenu = !this.displayMenu
    });
  },
  methods: {
    toggleLeftNav() {
      console.log( "drawer")
      this.$root.$emit( "toggleLeftNav", this.displayMenu)
    }
  },
};
</script>
