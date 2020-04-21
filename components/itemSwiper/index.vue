<template>
	<view class="itemSwiper">
		<view :class="['top', type == 'report' ? 'report': (type == 'drug' ? 'drug' : '')]">
			<view  v-if="type != 'drug'" :class="['top-box', type == 'report' ? 'report-box': '']">
				<view v-if="type == 'report'">
					<view class="title">你，决定明天的自己</view>
					<view class="desc">建议您尽量遵循良好的生活方式建议</view>
					<view class="desc">配合每日营养补充剂，更快实现健康目标</view>
				</view>
				<view v-if="type == 'home'">
					<view class="name">Hi,{{reportData.name}}</view>
					<view class="descDesc">您的健康目标是：</view>
				</view>
			</view>
			<template v-if="type == 'drug'">
				<image class="top-logo" :src="imgURL + reportData.back"></image>
			</template>
		</view>
		<view class="bottom">
			<view class="bottom-box">
				<!-- 基础信息 -->
				<template v-if="type == 'home'">
					<view class="itemBox">
						<view :class="['itemBtn', reportData.activeList[index] ? 'activeItemBtn' : '']" v-for="(item, index) in reportData.typeList" :key="item">
							<view class="content">
								<text :class="['iconfont', getIcon(item)]" />
								<view class="itemFont">{{item}}</view>
							</view>
							<text v-if="reportData.activeList[index]" class="iconfont icon-xuanzhong" />
						</view>
					</view>
					<view class="placeholder"></view>
					<view class="introduce">同时结合您的身体状况和生活习惯</view>
					<view class="introduce">我们为您推荐每日保养方案</view>
					<view class="placeholder"></view>
					<view class="mi">它，专属于你</view>
				</template>
				<!-- 药品 -->
				<template v-if="type == 'drug'">
					<view class="title">{{reportData.title}}</view>
					<view class="patent">
						<view class="text">2项专利</view>
						<view class="text">28种营养</view>
						<view class="text">更优成分形式</view>
					</view>
					<view class="itemBox">
						<view :class="['itemBtn', (reportData.activeList.indexOf(item) > -1 ? 'activeItemBtn' : '')]" v-for="(item, index) in reportData.typeList" :key="item">
							<view class="content">
								<text :class="['iconfont', getIcon(item)]" />
								<view class="itemFont">{{item}}</view>
							</view>
							<text v-if="reportData.activeList.indexOf(item) > -1" class="iconfont icon-xuanzhong" />
						</view>
					</view>
					<view class="grug-detail">
						<view class="left">
							<image class="image" :src="imgURL + reportData.imgURL" mode="widthFix"></image>
							<view class="number">每日1粒</view>
						</view>
						<view class="right">
							<view v-for="(item, index) in reportData.list" :class="index == 0 ? 'grugTitle':'grugDesc'" :key="item">
								{{item}}
							</view>
						</view>
					</view>
					<view class="bottom-btn">
						<van-button @click="goGrugDetail" block custom-style="font-size: 16px;height: auto;padding: 7px 15px;" color="#08CFC0" round>查看成分详情</van-button>
					</view>
				</template>
				<!-- 报告 -->
				<template v-if="type == 'report'">
					<view class="itemReport" v-for="item in reportData.reportList" :key="item.title">
						<view class="reportTielt">
							<text class="circle"></text>
							<text class="title">{{item.title}}</text>
						</view>
						<view class="reportContent">
							<view class="left">
								{{item.content}}
							</view>
							<view class="right">
								<van-icon name="arrow" color="#0FA1AB" />
							</view>
						</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "itemSwiper",
		data() {
			return {
				imgURL: this.$store.state.imgURL,
				showDialog: false
			}
		},
		props: {
			reportData: {
				type: Object,
				default () {
					return {}
				}
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		created() {},
		watch: {
			show (now) {
				this.showDialog = now
			}
		},
		computed: {},
		methods: {
			/* 获取icon的类型 */
			getIcon (val) {
				switch (val){
					case "免疫":
						return "icon-mianyi"
					case "皮肤抗衰":
						return "icon-pifu"
					case "美白":
						return "icon-meibai"
					case "睡眠":
						return "icon-zu2"
					case "卵巢":
						return "icon-luanchao"
					case "头发":
						return "icon-toufa"
					case "指甲":
						return "icon-zhijia"
					case "眼睛":
						return "icon-yanjing"
					default:
						break
				}
			},
			/* 跳转药品详情 */
			goGrugDetail (id) {
				this.$emit('onDialogClick', id)
			}
		},
		mounted() {
			this.showDialog = this.show
		}
	}
</script>
<style lang="scss" scoped>
	.itemSwiper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.top {
		width: 100%;
		height: 26%;
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		.top-box {
			width: 100%;
			height: 100%;
			padding-bottom: 5%;
			box-sizing: border-box;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}
		.top-logo {
			width: 100%;
			height: 100%;
		}
		.title {
			text-align: left;
			margin-bottom: 20rpx;
			color: #fff;
			font-size: 36rpx;
		}
		.desc, .descDesc {
			margin-top: 5rpx;
			font-size: 26rpx;
			text-align: left;
			color: #83E6DF;
		}
		.name {
			font-size: 50rpx;
			color: #333;
			text-align: center;
			margin-bottom: 15rpx;
		}
		.descDesc {
			color: #999;
			text-align: center;
		}
	}
	.report {
		background: #01B7A9;
	}
	.bottom {
		width: 100%;
		height: 79%;
		position: absolute;
		top: 21%;
		left: 0;
		border-radius: 30px 30px 0 0;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
		padding-top: 30px;
		padding-bottom: 25px;
		.bottom-box {
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}
		.title {
			font-size: 38rpx;
			text-align: center;
			color: #333;
			font-weight: bold;
		}
	}
	.itemBox {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
		margin: 20rpx auto;
		width: 90%;
	}
	.itemBtn {
		width: 70px;
		height: 70px;
		border-radius: 10rpx;
		border: 1px solid #ccc;
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		.content {
			width: 100%;
			text-align: center;
			.iconfont, .itemFont {
				font-size: 34px;
				color: #ccc;
			}
			.itemFont {
				font-size: 22rpx;
				margin-top: 5rpx;
			}
		}
	}
	.activeItemBtn {
		.content {
			.iconfont, .itemFont {
				color: #666666;
			}
		}
		.icon-xuanzhong {
			position: absolute;
			font-size: 36rpx;
			right: -4px;
			top: -4px;
			color: #08CFC0;
		}
	}
	.placeholder {
		height: 100rpx;
		width: 100%;
	}
	.introduce {
		text-align: center;
		padding: 5rpx 0;
		color: #666;
		font-size: 33rpx;
	}
	.mi {
		font-size: 44rpx;
		color: #08CFC0;
		text-align: center;
	}
	.patent {
		width: 80%;
		margin: 25rpx auto;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
		.text {
			background: #F7F5F6;
			color: #9C9A9B;
			padding: 7rpx 15rpx;
			font-size: 24rpx;
			border-radius: 5rpx;
		}
	}
	.grug-detail {
		width: 90%;
		margin: 10px auto;
		height: calc(100% - 209px);
		overflow-x: hidden;
		overflow-y: auto;
		.left, .right {
			display: inline-block;
			width: 35%;
			vertical-align: top;
			.image {
				width: 100%;
			}
			.grugTitle {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			.grugDesc, .number {
				font-size: 24rpx;
				color: #999;
			}
			.number {
				text-align: center;
			}
		}
		.right {
			width: 65%;
			padding: 5rpx 15rpx;
			box-sizing: border-box;
		}
	}
	.bottom-btn {
		width: 75%;
		margin: 0 auto;
	}
	.itemReport {
		width: 90%;
		margin: 0 auto 20px;
		.reportTielt {
			padding: 15rpx 0;
			font-size: 36rpx;
			color: #333;
		}
		.circle {
			display: inline-block;
			width: 13rpx;
			height: 13rpx;
			border: 12rpx solid #08CFC0;
			background: #fff;
			margin-right: 1em;
			vertical-align: middle;
			border-radius: 50%;
		}
		.title {
			vertical-align: middle;
		}
		.reportContent {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			border-radius: 10px;
			color: #666;
			background: #F3F3F3;
			font-size: 30rpx;
			position: relative;
			.left {
				width: calc(100% - 10px);
				padding-right: 10rpx;
				box-sizing: border-box;
			}
			.right {
				width: 40px;
				height: 100%;
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.itemReport:last-child {
		margin-bottom: 10rpx;
	}
</style>