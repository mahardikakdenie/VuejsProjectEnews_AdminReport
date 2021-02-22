<template>
  <v-app>
    <!--  -->
    <v-img :src="img">
      <v-container class="mt-5">
        <v-row justify="center">
          <v-col
            cols="12"
            lg="6"
          >
            <base-material-card icon="mdi-account">
              <template v-slot:heading>
                <div class="text-h4 font-weight-light">
                  Login
                </div>
              </template>
              <v-form @submit.prevent="login">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Email"
                        rules="email"
                      >
                        <v-text-field
                          v-model="username"
                          :rules="emailRules"
                          label="E-mail"
                          :error-messages="errors"
                          placeholder="Masukan Username Or Email "
                          prepend-icon="mdi-account-circle"
                          autocomplete="off"
                          type="email"
                        />
                      </validation-provider>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field
                        v-model="password"
                        label="Masukan Password"
                        placeholder="Masukan Password"
                        prepend-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        autocomplete="off"
                        @click:append="see"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-checkbox label="Remember Me" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        text
                        color="red"
                      >
                        Forgot Password ?
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item class="d-flex justify-end">
                    <v-list-item-action>
                      <div>
                        <v-btn
                          color="green"
                          type="submit"
                          @click="login"
                        >
                          Login
                        </v-btn>
                      </div>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-form>
            </base-material-card>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      img: require('@/assets/Login.png'),
      showPassword: false,
      username: '',
      password: '',
      emailRules: [value => value !== '' || 'Form Harus Di isi '],
      isError: false,
    }),
    mounted () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      see () {
        this.showPassword = !this.showPassword
      },
      login () {
        this.$store
          .dispatch({
            type: 'auth/getToken',
            email: this.username,
            password: this.password,
          })
          .then(response => {
            this.$router.push({ path: '/' })
          })
      },
    },
  }
</script>

<style></style>
