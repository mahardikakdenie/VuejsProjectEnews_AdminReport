/* eslint-disable vue/no-unused-components */
<template>
  <div class="blog-post-creator rteditor">
    <div class="post-inputs">
      <div class="title-input">
        <v-text-field
          v-model="title"
          placeholder="Enter a post title"
          prepend-icon="mdi-message"
        />
      </div>
      <div class="cat-input">
        <v-select
          v-model="category"
          label="Category"
          :items="categoryState.data"
          item-text="name"
          item-value="id"
        />
      </div>
      <div class="cat-input">
        <v-select
          v-model="statusKey"
          label="Status"
          :items="status"
          item-text="name"
          item-value="id"
        />
      </div>
      <div class="cat-input">
        <!-- <v-file-input
          v-model="file"
          counter
          show-size
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          placeholder="Unggah Gambar Thumbnail"
          @change="selected"
        /> -->
        <v-text-field
          v-model="url_thumbnail"
          placeholder="Enter a post title"
          prepend-icon="mdi-message"
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
          v-model="content"
          :style="
            $vuetify.theme.dark
              ? 'background-color: #5D5863;'
              : 'background-color: white;'
          "
          :options="editorOption"
        />
      </v-col>
    </v-row>
    <div class="post-actions-row">
      <v-btn
        text
        @click="postNews"
      >
        Publish
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
  axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
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
      file: null,
      image_id: null,
      title: '',
      statusKey: '',
      category: '',
      image_url: '',
      url_thumbnail: '',
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
      status: ['draft', 'preview'],
      showImageModal: false,
      formEntered: false,
      mounting: false,
      selectedFile: null,
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
      selected (event) {
        console.log(this.file)
        const data = new FormData()
        data.append('photo', this.file)
        data.append('name_thumbnail', this.file.name)
        const URL = 'api/thumbnail'
        axios.post(URL, data).then(response => {
          this.image_id = response.data.data.id
        })
      },
      publish () {
        // TODO
        this.formEntered = true
      },
      getCategory () {
        this.$store.dispatch({
          type: 'category/getCategory',
        })
      },
      postNews () {
        this.$store.dispatch({
          type: 'post/UploadNews',
          title: this.title,
          category_id: this.category,
          status: this.statusKey,
          post: this.content,
          url_thumbnail: this.url_thumbnail,
        })
        //   .then(response => {
        // if (response.data.meta.status) {
        this.$router.push({ path: '/post/news' })
        this.$toast.success('Berhasil menambahkan data', {
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
    },
    // eslint-disable-next-line vue/order-in-components
    mounted () {
      this.mounting = true
      if (!this.content && this.contents) {
        this.content = this.contents
      }
      this.getCategory()
      this.content = ''
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
