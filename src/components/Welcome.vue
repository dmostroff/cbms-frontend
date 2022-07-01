<template>
    <div>
        <p>Welcome</p>
    </div>
</template>

<script>
export default {
  name: "Welcome",
  components: { },
  props: [],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    if( !localStorage.getItem('authorization')) {
      console.log('Welcome', this.$route.path);
      console.log(this.$router.currentRoute)
      this.$router.push({name:'login'})
    }
  },
  methods: {},
};
</script>

