<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			fixed
		>
			<view slot="left">
				<van-button size="mini" custom-style="padding: 0px;height: auto;font-size: 22px;border:none;text-align: left;" @click="goBack" type="default">
					<van-icon name="arrow-left" />
					<!-- <van-icon name="wap-home" /> -->
				</van-button>
			</view>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view class="content" :style="style">
			<view class="content-box" :style="contentboxstyle">
				<image class="logo" :src="imgURL + '/order-pay.png'" mode="widthFix"></image>
			</view>
			<view class="bottom-box">
				<view class="t">总价：￥<text class="money">{{univalence * num}}</text></view>
				<van-button @click="goPay" custom-style="padding: 5px 35px; height: auto;font-size: 15px;" color="#08CFC0" round>提交订单</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	export default {
		name: "pay",
		components: { statusBar },
		data() {
			return {
				statusBarHeight: this.$store.state.statusBarHeight,
				imgURL: this.$store.state.imgURL,
				num: 1,
				univalence: 280
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			},
			style () {
				return ("height:" + "calc(100% - " + this.statusBarHeight + "px);")
			},
			contentboxstyle () {
				return ("height:" + "calc(100% - " + (this.statusBarHeight > 20 ? '80' : '60') + "px);")
			}
		},
		onLoad(options) {
			this.num = options.num
			this.univalence = options.money
		},
		methods: {
			goBack () {
				uni.navigateBack({
				    delta: 1
				})
			},
			goPay () {
				uni.navigateTo({
				    url: '/pages/orderForm/payok'
				})
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
	padding: 44px 0 0;
	overflow: hidden;
	box-sizing: border-box;
}
.logo {
	width: 100%;
	display: block;
	margin-bottom: 20rpx;
}
.content-box {
	overflow-y: auto;
	overflow-x: hidden;
	box-sizing: border-box;
}
.bottom-box {
	width: 100%;
	height: 120rpx;
	padding: 10rpx 5%;
	box-sizing: border-box;
	background: #fff;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	color: #333333;
	font-size: 34rpx;
	-moz-box-shadow:0px -1px 2px #ddd;
	-webkit-box-shadow:0px -1px 2px #ddd;
	box-shadow:0px -1px 2px #ddd;
	.money {
		font-size: 44rpx;
		color: #F91515;
	}
}
</style>
