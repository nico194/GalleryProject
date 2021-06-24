<template>
  <v-container>
    <h1 class="heading">Gallery - Page {{ page }}</h1>
    <Gallery
      v-if="images.length > 0"
      :images="images"
      @openOverlay="openOverlay"
    />
    <Overlay
      :overlay="overlay"
      :images="images"
      :image="image"
      @hideOverlay="hideOverlay"
      @previousImage="previousImage"
      @nextImage="nextImage"
    />
    <div v-if="loading" class="d-flex justify-center mt-4">
      <v-progress-circular indeterminate color="blue darken-4"></v-progress-circular>
    </div>
    <div class="d-flex justify-end mt-4">
      <span
        class="mr-4 mt-4 grey--text"
      >
        Page {{ page }} of {{ pageCount }}
      </span>
      <v-btn
        fab
        dark
        color="blue darken-4"
        class="mr-1"
        :disabled="page === 1"
        @click="previousImages"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="blue darken-3"
        class="ml-1"
        :disabled="!hasMore"
        @click="nextImages"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>
<script>
import Gallery from "../components/Gallery";
import Overlay from "../components/Overlay";
import photos from '../api/photos';

export default {
  name: "Home",
  components: {
    Gallery,
    Overlay,
  },
  data() {
    return {
      overlay: false,
      image: {},
      images: [],
      loading: false,
      hasMore: false,
      page: 0,
      pageCount: 0,
    };
  },
  async beforeMount() {
    this.loading = true;
    const auth = await this.auth();
    if (auth) {
      await this.getImages();
    }
  },
  methods: {
    async auth() {
      try {
        const response = await photos.auth();
        if(response.data.auth) {
          localStorage.setItem('token', btoa(response.data.token));
          this.loading = false;
          return true;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        return false;
      }
    },
    async getImages(page = 0) {
      this.loading = true;
      try {
        const imagesResponse = await photos.getImages(page)
        this.images = imagesResponse.data.pictures;
        this.hasMore = imagesResponse.data.hasMore;
        this.page = imagesResponse.data.page;
        this.pageCount = imagesResponse.data.pageCount;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    openOverlay(img) {
      this.overlay = true;
      this.image = img;

      this.$nextTick(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.scroll = "no";
      });
    },
    hideOverlay() {
      this.overlay = false;
      this.image = {};

      this.$nextTick(() => {
        document.documentElement.style.overflow = "scroll";
        document.body.scroll = "yes";
      });
    },
    previousImage() {
      this.changeImage("previous");
    },
    nextImage() {
      this.changeImage("next");
    },
    changeImage(move) {
      const index = this.images.findIndex(image => image.id === this.image.id);
      const imageChanged =
        move === "previous" ? this.images[index - 1]   : this.images[index + 1];
      this.image = imageChanged;
    },
    async nextImages() {
      this.getImages(this.page + 1);
    },
    async previousImages() {
      this.getImages(this.page - 1);
    }
  },
};
</script>

<style lang='scss' scoped>
.heading {
  position: relative;
  text-align: center;
  font-weight: 300;
  color: lightslategray;
  margin-bottom: 30px;

  &::after {
    content: "";
    background: lightslategray;
    width: 170px;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>