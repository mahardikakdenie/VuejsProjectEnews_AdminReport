<template>
  <v-app>
    <v-row class="mt-12">
      <v-col>
        <v-data-table
          v-if="getItem"
          :headers="headers"
          :items="getItem"
          :items-per-page="5"
        >
          <template v-slot:top>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="search"
                label="Search (UPPER CASE ONLY)"
                @keyup="setSearch"
              />
            </v-col>
          </template>
          <!-- <template v-slot:[`item.actions`]="{ item }">
          </template> -->
        </v-data-table>
        <v-data-table
          v-if="getItemComments"
          :headers="headersComments"
          :items="getItemComments"
        >
          <template v-slot:top>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="search"
                label="Search (UPPER CASE ONLY)"
                @keyup="setSearchComments"
              />
            </v-col>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  export default {
    name: 'Data',
    props: {
      col1: {
        type: String,
        default: '',
      },
      col2: {
        type: String,
        default: '',
      },
      getItem: {
        type: Array,
        default: undefined,
      },
      getItemComments: {
        type: Array,
        default: undefined,
      },
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Status', align: 'right', value: 'status' },
          { text: 'Sender', align: 'right', value: 'user.name' },
          {
            text: 'Created_at',
            value: 'created_at',
            align: 'right',
          },
          { text: 'Update_at', value: 'updated_at', align: 'right' },
        ],
        headersComments: [
          {
            text: 'Comments',
            align: 'start',
            value: 'comments',
          },
          { text: 'Status', align: 'right', value: 'status' },
          { text: 'Artikel', align: 'right', value: 'post.title' },
          {
            text: 'Created_at',
            value: 'created_at',
            align: 'right',
          },
          { text: 'Update_at', value: 'updated_at', align: 'right' },
        ],
      }
    },
    methods: {
      getItemat () {
        return this.getItem
      },
      getSearchComments () {
        this.$emit('searchComments', this.search)
      },
      getSearch () {
        this.$emit('search', this.search)
      },
      setSearch () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.getSearch()
        }, 700)
      },
      setSearchComments () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.getSearchComments()
        }, 700)
      },
    },
  }
</script>

<style></style>
