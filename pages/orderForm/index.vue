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
		<!-- 内容展示 -->
		<view class="content" :style="style">
			<image class="imageHeight" :style="topImage" :src="imgURL + '/order-b.png'" mode="widthFix"></image>
			<view class="content-box" :style="contentboxstyle">
				<view class="list">
					<view class="list-box">
						<view class="top">
							<text class="topTitle">私人定制营养包</text>
							<view class="">
								<van-stepper :value="num" step="1" min="1" @change="onChange" :disable-input="true" />
							</view>
						</view>
						<view class="desc">30日装</view>
						<view class="itemData" v-for="(item,index) in dataList" :key="index">
							<image class="left" :src="imgURL + item.img"></image>
							<view class="right">
								<view class="title">{{item.title}}</view>
								<view class="dosage">{{item.dosage}}</view>
								<view class="keyList">
									<van-button v-for="key in item.list" :key="key" plain hairline type="primary" custom-style="padding: 5rpx 8px; height: auto;font-size: 12px;margin:2px;color:#999;" color="#E5E5E7">{{key}}</van-button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-box">
					<view class="t">总价：￥<text class="money">{{univalence * num}}</text></view>
					<van-button @click="goPay" custom-style="padding: 5px 35px; height: auto;font-size: 15px;" color="#08CFC0" round>结算</van-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "orderForm",
		data() {
			return {
				statusBarHeight: this.$store.state.statusBarHeight,
				imgURL: this.$store.state.imgURL,
				imageHeight: 0,
				num: 1,
				univalence: 280,
				dataList: []
			}
		},
		computed: {
			style () {
				return ("height:" + "calc(100% - " + this.statusBarHeight + "px)")
			},
			contentboxstyle () {
				return ("height:" + "calc(100vh - " + (this.statusBarHeight + 0) + "px);top:" + (this.statusBarHeight + 0) + "px;padding-top:" + (this.imageHeight - 64) + "px;padding-bottom:" + ( this.statusBarHeight > 20 ? "80" : "60" ) + "px")
			},
			topImage () {
				return ("padding-top:" + (this.statusBarHeight + 44) + "px")
			}
		},
		onLoad(options) {
			if (options.list) {
				this.dataList = JSON.parse(options.list)
			}
			this.getImageHeight()
		},
		methods: {
			goBack () {
				uni.navigateBack({
				    delta: 1
				})
			},
			onChange (event) {
				const that = this
				const { detail } = event
				// console.log('结果：', detail)
				that.num = detail
			},
			getImageHeight () {
				const that = this
				const query = uni.createSelectorQuery().in(this)
				query.select('.imageHeight').boundingClientRect( (rect) => {
					that.imageHeight = rect.height
				}).exec()
			},
			goPay () {
				const that = this
				uni.navigateTo({
				    url: '/pages/orderForm/pay?num=' + that.num + "&money=" + that.univalence
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
	padding: 0 0 18px;
	box-sizing: border-box;
	position: relative;
}
.imageHeight {
	width: 100%;
	display: block;
}
.content-box {
	width: 100%;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	.list {
		height: 100%;
		width: 100%;
		background: #fff;
		border-radius: 70rpx 70rpx 0 0;
		padding-top: 60rpx;
		box-sizing: border-box;
	}
	.list-box {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 0 5%;
		overflow-x: hidden;
		overflow-y: auto;
		.top {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
		}
		.topTitle {
			font-size: 42rpx;
			font-weight: bold;
		}
		.desc {
			padding: 10px 0;
			font-size: 32rpx;
			color: #67696B;
		}
		.itemData {
			width: 100%;
			-moz-box-shadow:0px 0px 14px #ddd;
			-webkit-box-shadow:0px 0px 14px #ddd;
			box-shadow:0px 0px 14px #ddd;
			margin-bottom: 10px;
			border-radius: 20px;
			padding: 15px;
			box-sizing: border-box;
			.left {
				width: 75px;
				height: 75px;
				display: inline-block;
				vertical-align: top;
			}
			.right {
				width: calc(100% - 75px);
				height: 75px;
				display: inline-block;
				vertical-align: top;
				box-sizing: border-box;
				padding-left: 10rpx;
				.title {
					font-size: 35rpx;
					color: #333;
				}
				.dosage {
					font-size: 26rpx;
					color: #999;
					margin: 10rpx 0;
				}
				.keyList {
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.itemBtn {
					display: inline-block;
					padding: 5rpx;
				}
			}
		}
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
}
</style>
<style lang="scss">
.content-box .top .van-stepper__input--disabled {
	color: #000000;
}
</style>