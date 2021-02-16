<template>
<v-form>
  <v-card>
    <v-card-header :md-elevation="2">
      Auth User
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            
            <span class="caption">Id</span>
            <span class="">{{authUser.id }}</span>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.password"
              label="Last Login"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.last_login"
              label="Is Superuser"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.is_superuser"
              label="Username"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.username"
              label="First Name"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.first_name"
              label="Last Name"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.last_name"
              label="Email"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.email"
              label="Is Staff"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.is_staff"
              label="Is Active"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.is_active"
              label="Date Joined"
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field>
              v-model="authUser.date_joined"
              label=""
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>

export default {
  value: "AuthUser",
  components: {
  },
  props: {
    authUser: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editAuthUserForm" )
    },
    cancelForm() {
      this.$emit( "cancelAuthUserForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>