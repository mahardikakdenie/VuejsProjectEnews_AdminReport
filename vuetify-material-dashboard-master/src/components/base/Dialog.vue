<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <template>
            <v-card>
              <v-card-title>
                {{ text1 }}
              </v-card-title>
              <v-card-text>
                apakah anda yakin akan {{ text2 }} yang berjudul {..}
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn>
                  {{ text3 }}
                </v-btn>
                <v-spacer />
                <v-btn>
                  {{ text4 }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      text1: {
        type: String,
        default: '',
      },
      text2: {
        type: String,
        default: '',
      },
      text3: {
        type: String,
        default: '',
      },
      text4: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style></style>
