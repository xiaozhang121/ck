<template>
	<view :style="'padding-top:' + statusBarHeight + 'px'"></view>
</template>
<script>
	export default {
		data() {
			return {
				statusBarHeight: this.$store.state.statusBarHeight
			}
		}
	}
</script>