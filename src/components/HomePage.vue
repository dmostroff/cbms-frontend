<template>
  <div>
     <TopNav></TopNav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
  name: '',
  components: { TopNav},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  method() {
  },
  mounted () {

  },
  updated() {},
  destroyed() {},
  methods: {

  }
}
</script>

