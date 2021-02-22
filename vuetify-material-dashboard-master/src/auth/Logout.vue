<template>
  <v-app>
    <!--  -->
  </v-app>
</template>

<script>
  export default {
    name: 'Logout',
    data: () => ({}),
    created () {
      this.logout()
    },
    methods: {
      logout () {
        this.$store
          .dispatch({
            type: 'auth/destroyToken',
          })
          .then(() => {
            this.$router.push({ path: '/login' })
          })
          .catch(e => {
            console.log(e)
            this.$router.push({ path: '/login' })
          })
      },
    },
  }
</script>

<style></style>
