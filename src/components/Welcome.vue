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
    if( !localStorage.getItem('jwt')) {
      this.$router.push({name:'login'})
    }
  },
  methods: {},
};
</script>

