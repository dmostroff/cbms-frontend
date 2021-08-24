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
        v-model="mydate"
        :label="label"
        prepend-icon="mdi-calendar"
        :readonly="isReadOnly"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="mydate" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="save(mydate)"> OK </v-btn><!-- $refs.dialog.save(mydate) -->
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
    mydate: null
  }),
  mounted() {
    this.mydate = JSON.parse(JSON.stringify(this.date))
  },

  methods: {
    save(adate) {
      console.log( this.tag, adate);
      this.$emit("datepicker", this.tag, adate);
    },
  },
};
</script>


