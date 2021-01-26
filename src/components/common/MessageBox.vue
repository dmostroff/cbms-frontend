<template>
      <div class="modal">
        <div class="container">
          <div class="modal__title">{{title}}</div>
          <div class="pa-4">{{prompt}}</div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  props: {
      title: String,
      prompt: String,
  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    ok() {
      this.$emit( "messageBox", "close")
    },
  }
}
</script>
<style lang="css" scoped>
        .modal {
          background-color: rgba(0, 0, 0, 0.7);
      }
    </style>

