<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        :readonly="isReadOnly"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>
<script>
export default {
  name: "DialogDatePicker",
  props: {
    label: String,
    tag: String,
    date: String,
    isReadOnly: Boolean,
  },
  data: () => ({
    modal: false,
  }),
  methods: {
    save(date) {
      this.$emit("datepicker", this.tag, date);
    },
  },
};
</script>


