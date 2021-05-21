<template>
  <div class="modal">
    <v-container class="text-center">
      <v-row class="h4">
        <v-col>{{ title }}</v-col>
      </v-row>
      <v-row align-self-center class="primary display-2 pa-4 text-center rounded-xl">
        <v-col>{{ prompt }}</v-col>
      </v-row>
      <v-row v-if="areyousure" align-self-center class="subtitle">
        <v-col>Are you sure?</v-col>
      </v-row>
      <v-row align-self-end>
        <v-col>
        <v-btn class="mt-3 border-b border-teal font-semibold" @click="ok"
          >OK</v-btn
        >
        </v-col>
      <v-col align-self-end>
        <v-btn class="mt-3 border-b border-teal font-semibold" @click="cancel"
          >Cancel</v-btn
        >
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ConfirmDlg",
  components: {},
  props: {
    keyname: String,
    title: String,
    prompt: String,
    areyousure: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ok() {
      this.$emit("confirmResult", ["ok" , this.keyname ]);
    },
    cancel() {
      this.$emit("confirmResult", ["cancel", this.keyname]);
    },
  },
};
</script>
<style lang="css" scoped>
.modal {
  background-color: rgb(227, 249, 255);
}
</style>

