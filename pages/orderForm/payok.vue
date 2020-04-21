<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			fixed
		>
			<view slot="left">
				<van-button size="mini" custom-style="padding: 0px;height: auto;font-size: 22px;border:none;" @click="goHome" type="default">
					<van-icon name="arrow-left" />
					<van-icon name="wap-home" />
				</van-button>
			</view>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view class="content" :style="style">
			<view class="content-box">
				<image class="logo" :src="imgURL + '/payok.png'" mode="widthFix"></image>
			</view>
			<view class="bottom-box">
				<van-button @click="goHome" block custom-style="font-size: 15px;" color="#08CFC0" round>完成</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	export default {
		name: "payok",
		components: { statusBar },
		data() {
			return {
				statusBarHeight: this.$store.state.statusBarHeight,
				imgURL: this.$store.state.imgURL
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			},
			style () {
				return ("height:" + "calc(100% - " + this.statusBarHeight + "px);")
			}
		},
		onLoad(options) {},
		methods: {
			goHome () {
				uni.switchTab({
					url: '/pages/report/index'
				})
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
.box {
	background: #F4F8FB;
	height: 100%;
}
.content {
	padding: 44px 0 0;
	box-sizing: border-box;
	overflow-y: auto;
	overflow-x: hidden;
}
.logo {
	width: 50%;
	display: block;
	margin: 55px auto;
}
.content-box {}
.bottom-box {
	width: 70%;
	margin: 130px auto 20px;
}
</style>