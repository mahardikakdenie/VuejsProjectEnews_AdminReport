<template>
  <v-footer
    id="dashboard-core-footer"
    color="dark"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <v-btn
            icon
            :color="$vuetify.theme.dark ? 'primary' : 'white'"
          >
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2021, made with
            <v-icon size="18">
              mdi-heart
            </v-icon>
            by
            <a
              href="https://instagram.com/mahardikakdenie"
              target="_blank"
            >Mahardika Kessuma Denie</a>
            for a better web.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
        {
          href: '#',
          text: 'Creative Tim',
          icon: 'mdi-telegram',
        },
        {
          href: '#',
          text: 'About Us',
          icon: 'mdi-youtube',
        },
        {
          href: '#',
          text: 'Blog',
          icon: 'mdi-facebook',
        },
        {
          href: '#',
          text: 'Licenses',
          icon: 'mdi-instagram',
        },
      ],
    }),
  }
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
