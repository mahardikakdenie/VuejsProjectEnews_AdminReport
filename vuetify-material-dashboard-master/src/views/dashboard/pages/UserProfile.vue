<template>
  <v-app>
    <base-data-table
      :get-item="categories"
      @search="getCategories($event)"
    />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Other',
    data: () => ({}),
    computed: {
      ...mapGetters('other', ['categories']),
    },
    mounted () {
      this.getCategories()
      console.log(this.categories, 'hai')
    },
    methods: {
      getCategories (params) {
        this.$store.dispatch({
          type: 'other/getCategories',
          q: params,
        })
      },
    },
  }
</script>
