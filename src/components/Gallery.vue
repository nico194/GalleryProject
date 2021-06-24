<template>
  <v-row>
    <v-col
      v-for="image in images"
      :key="image.id"
      class="d-flex child-flex"
      md="4"
      sm="6"
      cols="12"
    >
      <Photo
        :image="image"
        @openPhotoOverlay="openPhoto"
        />
    </v-col>
  </v-row> 
</template>

<script>
import Photo from './Photo';

export default {
    name: 'Gallery',
    components: {
      Photo
    },
    props: {
      images: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      openPhoto(image) {
        this.$emit('openOverlay', image)
      }
    }
}
</script>