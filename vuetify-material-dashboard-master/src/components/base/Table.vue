<template>
  <v-app>
    <v-row class="mt-12">
      <v-col
        v-if="contents"
        cols="12"
        md="4"
        lg="4"
      >
        <v-text-field
          v-model="q"
          class="ml-5"
          append-icon="mdi-magnify"
          :label="$t('search')"
          color="secondary"
          hide-details
          @keyup="search"
        />
      </v-col>
    </v-row>
    <v-row class="mb-12">
      <v-col>
        <base-material-card
          :icon="icon"
          :title="title"
          class="px-5 py-3 mb-12"
        >
          <div>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="primary--text">
                    {{ col1 }}
                  </th>
                  <th class="primary--text">
                    {{ col2 }}
                  </th>
                  <th class="primary--text">
                    {{ col3 }}
                  </th>
                  <th class="primary--text">
                    {{ col4 }}
                  </th>
                  <th class="primary--text">
                    {{ col5 }}
                  </th>
                  <th class="primary--text">
                    {{ col6 }}
                  </th>
                  <th class="primary--text">
                    {{ col7 }}
                  </th>
                </tr>
              </thead>
              <template>
                <tbody
                  v-for="(item, i) in post.data.data"
                  :key="i"
                >
                  <tr>
                    <td>{{ i + post.data.from }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.status ? item.status : ' - ' }}</td>
                    <td>{{ item.views }}</td>
                    <td v-if="item.category.name">
                      {{ item.category.name ? item.category.name : ' - ' }}
                    </td>
                    <td v-if="item.user.name">
                      {{ item.user.name ? item.user.name : ' - ' }}
                    </td>
                    <td>
                      <v-btn
                        icon
                        @click="deltPostNews(item.id)"
                      >
                        <v-icon color="red">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        :to="`/post/${item.id}/edit`"
                      >
                        <v-icon color="blue">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        @click="approveNews(item.id)"
                      >
                        <v-icon color="primary">
                          mdi-checkbox-marked-circle-outline
                        </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-pagination
              v-model="page"
              :length="post.data.last_page ? post.data.last_page : 1"
              total-visible="5"
              @input="getNews()"
            />
          </div>
        </base-material-card>
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
    name: 'Table',
    props: {
      title: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      col1: {
        type: String,
        default: '',
      },
      col2: {
        type: String,
        default: '',
      },
      col3: {
        type: String,
        default: '',
      },
      col4: {
        type: String,
        default: '',
      },
      col5: {
        type: String,
        default: '',
      },
      col6: {
        type: String,
        default: '',
      },
      col7: {
        type: String,
        default: '',
      },
      contents: {
        type: Array,
        default: () => [],
      },
      isLoading: {
        type: Boolean,
        defaults: false,
      },
    },
    data: () => ({
      q: '',
      page: 1,
      approve: false,
      dialog: {
        open: false,
      },
    }),
    computed: {
      ...mapGetters('post', ['post']),
    },
    methods: {
      deltPostNews (id) {
        this.$emit('deltPostNews', id)
        this.getNews()
      },
      searchPost () {
        if (this.q !== '') {
          this.$store.dispatch({
            type: 'post/getPost',
            q: this.q,
          })
        } else if (this.q === '') {
          this.getNews()
        }
      },
      search () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.searchPost()
        }, 700)
      },
      getPost () {
        this.$emit('getPost')
      },
      approveNews (id) {
        this.$store.dispatch({
          type: 'post/approvePostNews',
          id: id,
        })
        // update
        this.$toast.success('Berhasil menyetujui data', {
          type: 'success',
          position: 'top-right',
          duration: 3000,
          dismissible: true,
        })
        this.getNews()
      },
      open (id) {
        this.dialog.open = false
        this.$store.dispatch({
          type: 'post/showListNews',
          id: id,
        })
        this.dialog.open = true
      },
      getNews () {
        this.$store.dispatch({
          type: 'post/getPost',
          page: this.page,
        })
      },
    },
  }
</script>

<style></style>
