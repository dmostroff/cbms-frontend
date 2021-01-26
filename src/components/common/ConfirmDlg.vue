<template>
  <div class="modal">
    <v-layout>
      <v-flex align-self-center class="h3">
        {{ title }}
      </v-flex>
      <v-flex align-self-center class="display-2 pa-4 text-center rounded-xl">
        {{ prompt }}
      </v-flex>
      <v-flex align-self-end>
        <v-btn class="mt-3 border-b border-teal font-semibold" @click="ok"
          >OK</v-btn
        >
      </v-flex>
      <v-flex align-self-end>
        <v-btn class="mt-3 border-b border-teal font-semibold" @click="cancel"
          >Cancel</v-btn
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "ConfirmDlg",
  components: {},
  props: {
    title: String,
    prompt: String,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ok() {
      this.$emit( "confirmResult", "ok")
    },
    cancel() {
      this.$emit( "confirmResult", "cancel")
    }
  },
};
</script>
<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

