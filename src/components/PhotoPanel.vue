<template>
  <div class="panel">
    <h2>{{ panelInfo.author }}</h2>
    <h3>{{ panelInfo.camera }}</h3>
    <p>{{ panelInfo.tags }}</p>
  </div>
</template>

<script>
export default {
  name: "PhotoPanel",
	props: {
		panelInfo: {
			type: Object,
			default: () => {}
		}
	}
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  color: #fff;
  z-index: 99;
  padding: 15px;
}
</style>