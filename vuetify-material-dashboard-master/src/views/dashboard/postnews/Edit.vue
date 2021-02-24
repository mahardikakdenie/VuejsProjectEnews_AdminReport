/* eslint-disable vue/no-unused-components */
<template>
  <div class="blog-post-creator rteditor">
    <div class="post-inputs">
      <div class="title-input">
        <v-text-field
          v-model="post.title"
          placeholder="Enter a post title"
          prepend-icon="mdi-message"
        />
      </div>
      <div class="cat-input">
        <v-select
          v-model="post.category_id"
          label="Category"
          :items="categoryState.data"
          item-text="name"
          item-value="id"
        />
      </div>
      <div class="cat-input">
        <v-select
          v-model="post.status"
          label="Status"
          :items="status"
          item-text="name"
          item-value="id"
        />
      </div>
    </div>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="12"
      >
        <quill-editor
          ref="myQuillEditor"
          v-model="post.post"
          :style="
            $vuetify.theme.dark
              ? 'background-color: #5D5863;'
              : 'background-color: white;'
          "
          :options="editorOption"
        />
      </v-col>
    </v-row>
    <div
      class="post-actions-row"
      @click="editPostNews"
    >
      <v-btn text>
        Edit
      </v-btn>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import { quillEditor } from 'vue-quill-editor'
  import { Button, Input, Select } from 'iview'
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  axios.defaults.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('access')

  export default {
    name: 'HelloWorld',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Button,
      // eslint-disable-next-line vue/no-unused-components
      Input,
      // eslint-disable-next-line vue/no-unused-components
      Select,
      quillEditor,
    },
    data: () => ({
      title: '',
      statusKey: '',
      category: '',
      image_url: '',
      content: '',
      editorOption: {
        debug: 'info',
        placeholder: 'Type your post...',
        readOnly: true,
        theme: 'snow',
      },
      ctgr: {
        data: [],
      },
      status: ['publish', 'draft', 'preview'],
      showImageModal: false,
      formEntered: false,
      mounting: false,
    }),
    watch: {
      content (val) {
        if (!this.mounting) {
          this.$store.commit(
            'setDelta',
            this.$refs.myQuillEditor.quill.getContents(),
          )
        }
        this.$store.commit('setContent', val)
        this.mounting = false
      },
    },
    methods: {
      publish () {
        // TODO
        this.formEntered = true
      },
      getCategory () {
        this.$store.dispatch({
          type: 'category/getCategory',
        })
      },
      showPostnews () {
        this.$store.dispatch({
          type: 'post/showListNews',
          id: this.$route.params.id,
        })
      },
      editPostNews () {
        this.$store.dispatch({
          id: this.$route.params.id,
          type: 'post/editShow',
          title: this.post.title,
          category: this.post.category_id,
          status: this.post.status,
          post: this.post.post,
        })
        this.$router.push({ path: '/post/news' })
        this.$toast.success('Berhasil mengubah data', {
          type: 'success',
          position: 'top-right',
          duration: 3000,
          dismissible: true,
        })
      },
    },
    // eslint-disable-next-line vue/order-in-components
    computed: {
      ...mapGetters(['delta', 'contents']),
      ...mapGetters('category', ['categoryState']),
      ...mapGetters('post', ['post']),
    },
    // eslint-disable-next-line vue/order-in-components
    mounted () {
      this.mounting = true
      if (!this.content && this.contents) {
        this.content = this.contents
      }
      this.getCategory()
      this.content = ''
      this.showPostnews()
    },
  }
</script>
<style>
.rteditor {
  margin-left: 20px;
  margin-right: 20px;
}

.cat-input,
.title-input {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-inputs {
  display: grid;
  width: 90%;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding-bottom: 15px;
  padding-top: 15px;
  /* padding: 20px; */
}

.ql-editor {
  height: 72vh;
  width: 100h;
  cursor: red;
}

.inner-image-input {
  display: flex;
  align-items: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-actions-row {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.ivu-icon-ios-camera-outline {
  font-size: 16px;
}

.btn-delete {
  color: #2d8cf0 !important;
  border: 1px solid #2d8cf0 !important;
}

.btn-delete:hover {
  color: red !important;
  border: 1px solid red !important;
}
</style>
