<template>
  <v-app>
    <base-data-table
      :get-item-comments="comment"
      @searchComments="getComment($event)"
    />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'IndexComments',
    data: () => ({}),
    computed: {
      ...mapGetters('comments', ['comment']),
    },
    mounted () {
      this.getComment()
      console.log(this.comment)
    },
    methods: {
      getComment (event) {
        this.$store.dispatch({
          type: 'comments/getComments',
          q: event,
        })
      },
    },
  }
</script>

<style></style>
