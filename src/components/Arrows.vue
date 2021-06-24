<template>
  <div class="arrows">
    <v-icon large @click="previous" color="white" :disabled="disabledPrevious">
			{{ leftArrowIcon }}
    </v-icon>
    <v-icon large @click="next" color="white" :disabled="disabledNext">
      {{ rightArrowIcon }}
    </v-icon>
  </div>
</template>

<script>
import {
  mdiArrowRightCircleOutline,
  mdiArrowLeftCircleOutline
 } from '@mdi/js';

export default {
	props: {
		disabledPrevious: {
			type: Boolean,
			default: false
		},
		disabledNext: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			leftArrowIcon: mdiArrowLeftCircleOutline,
			rightArrowIcon: mdiArrowRightCircleOutline
		}
	},
	methods: {
		previous() {
			this.$emit("previous");
		},
		next() {
			this.$emit("next");
		}
	}
};
</script>

<style lang="scss" scoped>
.arrows {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 50%;
  z-index: 99;

}
</style>