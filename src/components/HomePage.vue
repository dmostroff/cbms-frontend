<template>
<v-container>
  <v-row><v-col>
     <TopNav></TopNav>
    </v-col></v-row>
    <v-row>
      <v-col :cols="leftcols" style="background-color: red;">
        <p>{{leftcols}}</p>
        <router-view name="leftnav"></router-view>
      </v-col>
      <v-col :cols="containercols" style="background-color: plum;">
        <p>{{containercols}}</p>
        <router-view name="main"></router-view>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
  name: '',
  components: { TopNav},
  props: [],
  data () {
    return {
      leftcols: 1,
      containercols: 11,
    }
  },

  computed: {

  },
  method() {
    if( !localStorage.getItem('authorization')) {
      console.log(this.$route.path);
      console.log(this.$router.currentRoute)
      this.$router.push({name:'login'})
    }
  },
  mounted () {

  },
  updated() {},
  destroyed() {},
  methods: {

  }
}
</script>

