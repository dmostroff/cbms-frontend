<template>
  <v-layout class="mb-2">
    <v-spacer></v-spacer>
    <v-flex xs1>
      <v-btn v-if="isReadOnly" @click="editForm">Edit</v-btn>
      <v-btn v-else @click="saveForm">Save</v-btn>
    </v-flex>
    <v-flex class="mr-2" xs1>
      <v-btn v-if="isReadOnly" @click="closeForm">Close</v-btn>
      <v-btn v-else @click="cancelForm">Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "EditSaveCancelBtn",
  props: {
    isReadOnly: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    editForm() {
      this.$emit("editForm");
    },
    saveForm() {
      this.$emit("saveForm");
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
    closeForm() {
      this.$emit("closeForm");
    },
  },
};
</script>

