<template>
  <v-overlay :value="overlay">
    <GalleryControls
      v-if="overlay"
      @hideOverlay="hideOverlay"
      @zoom="zoom"
      @resetZoom="resetZoom"
    />
    <Arrows
      :disabledPrevious="disabledPrevious"
      :disabledNext="disabledNext"
      @next="next"
      @previous="previous"
      />
    <div class="d-flex flex-column">
      <PhotoPanel v-if="!loading" :panelInfo="panelInfo" />
      <div v-else class="loadingPanel">
        <v-progress-circular indeterminate color="blue darken-4"></v-progress-circular>
      </div>
      <div :key="image.id" class="imageCarousel" style="overflow: hidden;">
        <div class="imageCarousel" :id="`panzoom-element-${image.id}`">
          <Photo :image="image" />
        </div>
      </div>
      <v-btn
        fab
        small
        class="shareButton"
        color="pink darken-2"
        @click="shareImage"
        >
        <v-icon color="white darken-2">{{ shareIcon }}</v-icon>
      </v-btn>
      <Points :imageCuantity="images.length" :imageSelected="imageSelected" />
    </div>
  </v-overlay>
</template>

<script>
import Panzoom from "@panzoom/panzoom";
import GalleryControls from './GalleryControls';
import Arrows from './Arrows';
import Photo from './Photo';
import Points from './Points';
import PhotoPanel from './PhotoPanel';
import photos from '../api/photos';
import { mdiShareVariant } from '@mdi/js';

export default {
  name: "Overlay",
  components: {
    Photo,
    GalleryControls,
    Arrows,
    Points,
    PhotoPanel
  },
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },
    image: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      panzoom: null,
      model: 0,
      shareIcon: mdiShareVariant,
      loading: false,
      panelInfo: {}
    }
  },
  watch: {
    async image(newValue) {
      if(Object.keys(newValue).length > 0) {
        this.loading = true;
        try {
          const response = await photos.getImage(newValue.id);
          this.panelInfo = response.data;
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }

        this.$nextTick(() => {
          const element = document.getElementById(`panzoom-element-${newValue.id}`);
          this.panzoom = Panzoom(element, { maxScale: 5 });
        })
      }
    }
  },
  methods: {
    hideOverlay() {
      this.model = 0;
      this.$emit("hideOverlay");
    },
    next() {
      this.$emit("nextImage");
    },
    previous() {
      this.$emit("previousImage");
    },
    zoom(level){
      level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn()
    },
    resetZoom() {
      this.panzoom.reset();
    },
    async shareImage() {

      const shareData = {
        title: this.panelInfo.author,
        text: this.panelInfo.camera,
        url: this.panelInfo.cropped_picture,
      }
      await navigator.share(shareData);
    },
  },
  computed: {
    disabledPrevious() {
      const index = this.images.findIndex(image => image.id === this.image.id);
      return index === 0;
    },
    disabledNext() {
      const index = this.images.findIndex(image => image.id === this.image.id);
      return index === this.images.length - 1;
    },
    imageSelected() {
      return this.images.indexOf(this.image) + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.imageCarousel {
  background-size: cover;
  width: 100%;
  height: stretch;
}

.shareButton {
  position: absolute;
  bottom: 21%;
  left: 93%;

  @media  screen and (max-width: 960px) {
    bottom: 22%;
    left: 92%;
  }

  @media  screen and (max-width: 600px) {
    bottom: 30%;
    left: 89%;
  }
}

.loadingPanel {
  position: absolute;
  top: 80px;
  left: 20px;
  z-index: 9999;
}
</style>
