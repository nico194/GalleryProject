<template>
  <v-img
    :src="image.cropped_picture"
    :lazy-src="image.cropped_picture"
    class="grey lighten-2 photoStyles"
    :aspect-ratio="4/3"
    @click="openPhotoOverlay"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "Photo",
	props: {
		image: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		openPhotoOverlay() {
			this.$emit('openPhotoOverlay', this.image);
		}
	}
};
</script>

<style lang="scss" scoped>
.photoStyles {
  width: 700px;

  @media  screen and (max-width: 960px){
    width: 600px;
  }

  @media  screen and (max-width: 600px){
    width: 400px;
  }
}
</style>