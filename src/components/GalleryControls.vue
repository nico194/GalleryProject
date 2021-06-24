<template>
  <div class="controls mb-3">
    <div class="d-flex justify-center align-center">
      <v-btn fab small class="mr-2" color="blue darken-2" @click="zoom(1)">
        <v-icon color="white darken-2">{{ zoomInIcon }}</v-icon>
      </v-btn>
      <v-btn fab small class="mr-2" color="blue darken-2" @click="zoom(-1)">
        <v-icon color="white darken-2">{{ zoomOutIcon }}</v-icon>
      </v-btn>
      <v-btn small class="mr-2" color="blue darken-2" @click="resetZoom">
        Reset
      </v-btn>
    </div>
    <v-btn fab small color="error darken-2" @click="hideOverlay">
      <v-icon color="danger">
        {{ closeIcon }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  mdiWindowClose,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline
 } from '@mdi/js';

export default {
	data() {
		return {
			closeIcon: mdiWindowClose,
      zoomInIcon: mdiMagnifyPlusOutline,
      zoomOutIcon: mdiMagnifyMinusOutline
		}
	},
	methods: {
    hideOverlay() {
      this.$emit("hideOverlay");
    },
		zoom(level) {
			this.$emit("zoom", level)
		},
		resetZoom(){
			this.$emit("resetZoom");
		}
	}
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>