<template>
    <v-row
      justify="center"
      no-gutters
      align="center"
    >
      <v-btn
        v-for="item in links"
        :key="item.prompt"
        color="white"
        text
        rounded
        class="my-2"
      >
        <span @click="linkto(item.link)">{{item.prompt}}</span>
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Ostroff Ent.</strong>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Footer',
    data: () => ({
        links: [
            { prompt: 'Home', link: "home" },
            { prompt: 'About Us', link: 'aboutus' },
            { prompt: 'Contact Us', link: "home" },
        ]
    }),
    methods: {
      linkto( name)  {
          this.$router.push( { name: name });
      }
    },
}
</script>

