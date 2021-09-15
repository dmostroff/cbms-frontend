<template>
    <v-text-field
            autocomplete="current-password"
            :value="userPassword"
            :label="label"
            hint="Enter a strong password."
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            :rules="[rules.password]"
            :readonly="isReadOnly"
            @input="_=>userPassword=_"
            @blur="passwordDone"
          ></v-text-field>
</template>
<script>
  export default {
    name: "Password",
    data: () => ({
      userPassword: "",
      valid: true,
      value: true,
      rules: {
        required: value => !!value || "Required.",
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
          return ( (!this.hasRule) ||
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        }
      }
    }),
    props: {
        label: {
            type: String,
            default: "Enter password"
        },
        tag: {
            type: String,
            default: 'password'
        },
        isReadOnly: {
          type: Boolean,
          default: false,
        },
        hasRule: {
          type: Boolean,
          default: false,
        }
    },
    methods: {
        passwordDone() {
            this.$emit( 'passwordDone', this.userPassword, this.tag)
        }
    }
  };
</script>