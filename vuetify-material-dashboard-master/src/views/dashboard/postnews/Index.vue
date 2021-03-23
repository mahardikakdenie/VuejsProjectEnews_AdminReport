<template>
  <v-app
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col>
        <div>
          <base-table
            title="Index News"
            icon="mdi-clipboard-text"
            col1="Id"
            col2="Title"
            col3="Status"
            col4="Views"
            col5="Category"
            col6="Sender"
            col7="Actions"
            :page="page"
            :contents="post.data"
            @deltPostNews="delPost($event)"
            @getPost="getPost"
          />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  axios.defaults.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('access')
  export default {
    name: 'PostNews',
    data: () => ({
      isLoading: true,
      q: '',
      page: 1,
    }),
    computed: {
      ...mapGetters('post', ['post']),
    },
    mounted () {
      this.getPost()
    },
    methods: {
      getPost () {
        this.$store.dispatch({
          type: 'post/getPost',
          page: this.page,
        })
        this.isLoading = false
      },
      delPost (id) {
        this.$store.dispatch({
          type: 'post/delPost',
          id: id,
        })
        //  Update
        this.getPost()
        this.$toast.error('Berhasil menghapus data', {
          type: 'error',
          position: 'top-right',
          duration: 3000,
          dismissible: true,
        })
      },
      serchPost () {
        if (this.q !== '') {
          this.$store.dispatch('post/searchPost', { q: this.q })
        }
      },
      search () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.serchPost()
        }, 700)
      },
    },
  }
</script>

<style></style>
