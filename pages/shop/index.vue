<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			title="商城"
			fixed
		/>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view class="content">
			<van-skeleton title row="3" :loading="!MonitorVersion" >
				<view class="imagebox">
					<image class="logo" :src="imgURL + '/shop.png'" mode="widthFix"></image>
					<view class="btn">
						<van-button v-if="MonitorVersion" @click="onClick" size="mini" custom-style="padding: 1px 42px;height: auto;font-size: 14px;border:none;" color="#08CFC0" type="default">11</van-button>
					</view>
				</view>
				
			</van-skeleton>
			
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	export default {
		name: "shop",
		components: { statusBar },
		data() {
			return {
				imgURL: this.$store.state.imgURL
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			}
		},
		onLoad() {},
		methods: {
			onClick () {
				const that = this
				uni.navigateTo({
				    url: '/pages/test/index'
				});
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
.box {
	background: #fff;
	height: 100%;
}
.content {
	padding: 44px 0 18px;
	box-sizing: border-box;
}
.imagebox {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
}
.logo {
	width: 100%;
}
.btn {
	position: absolute;
	display: inline-block;
	position: absolute;
	right: 15%;
	top: 34%;
	opacity: 0;
}
</style>
