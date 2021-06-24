<template>
  <div class="points">
		<v-icon
      v-for="n in imageCuantity" 
      :key="n" 
      :medium="$vuetify.breakpoint.smOnly"
      :large="$vuetify.breakpoint.smAndUp"
      :color="n === imageSelected ? 'white' : 'black darken-2'"
      >
      {{ pointIcon }}
    </v-icon>
	</div>
</template>

<script>
import { mdiBrightness1 } from '@mdi/js';

export default {
	props: {
		imageCuantity: {
			type: Number,
			default: 0
		},
    imageSelected: {
      type: Number,
      default: 0
    }
	},
	data() {
    return {
      panzoom: null,
      model: 0,
      pointIcon: mdiBrightness1,
    }
  },
}
</script>

<style lang="scss" scoped>
.points {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: relative;
	bottom: 60px;
  background-color: rgba(0,0,0,.3);
  z-index: 99;

  span {
    transition: all 1s ease;
  }
}
</style>