<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			title="专属健康报告"
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
		<view class="content" :style="style">
			<view class="swiperBox">
				<swiper class="swiper"
					indicator-color="#83E6DF"
					indicator-active-color="#08CFC0"
					:indicator-dots="indicatorDots"
					:autoplay="autoplay"
					:interval="interval"
					:duration="duration"
				>
					<swiper-item v-for="(item, index) in reportDateList" :key="index">
						<item-swiper :reportData="item.data" :type="item.type" :show="showDialog" @onDialogClick="onDialogClick" />
					</swiper-item>
				</swiper>
			</view>
			<view class="shopBox">
				<van-button size="mini" custom-style="padding: 12px;height: auto;font-size: 32px;border:none;border-radius: 50%;" color="#08CFC0" @click="goShop" type="default">
					<van-icon name="shopping-cart-o" />
				</van-button>
			</view>
		</view>
		<van-dialog
			use-slot
			width="90%"
			:show="showDialog"
			:show-confirm-button="false"
			:close-on-click-overlay="true"
			@close="showDialog = false"
		>
			<view class="popupBox">
				<view class="cross" @click="showDialog = false"><van-icon name="cross" /></view>
				<view class="popup">
					<image class="popupImage" :src="imgURL + '/popup.png'" mode="widthFix"></image>
				</view>
			</view>
		</van-dialog>
	</view>
</template>
<script>
	import statusBar from "../../components/status-bar/index.vue"
	import { getStorage, removeStorage } from 'pages/common/util';
	import itemSwiper from '../../components/itemSwiper/index.vue'
	const drug = require("../../static/json/drug.json")
	const report = require("../../static/json/report.json")
	export default {
		name: "reportDetails",
		components: { statusBar, itemSwiper },
		data () {
			return {
				statusBarHeight: this.$store.state.statusBarHeight,
				imgURL: this.$store.state.imgURL,
				reportDetails: {},
				reportDateList: [],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				showDialog: false,
				dataList: []
			}
		},
		onLoad(options) {
			const that = this
			const id = options.id
			const reportList = getStorage('report')
			const reportDetails = reportList.find(item => item.id == id)
			const typeList = reportDetails.type
			const drugList = reportDetails.drug
			const activeList = typeList.map(item => {return true})
			/* 轮播图数组 */
			const detailData = []
			/* 基础信息 */
			const baseInfo = {
				type: "home",
				data: {
					name: reportDetails.name,
					activeList: activeList,
					typeList: typeList
				}
			}
			detailData.push(baseInfo)
			/* 药品信息 */
			
			const dataList = []
			for (let i = 0; i < drugList.length; i++) {
				const titleArr = drugList[i].split(';')
				const image = that.getImage(titleArr[0])
				const newActiveList = titleArr.length > 1 ? titleArr[1].split(',') : [];
				detailData.push(
					{
						type: "drug",
						data: {
							title: titleArr[0],
							back: "/" + image + "-b.jpg",
							imgURL: "/" + image + ".jpg",
							list: drug[titleArr[0]],
							activeList: newActiveList,
							typeList: typeList
						}
					}
				)
				const orderActiveList = []
				for (let item in newActiveList) {
					if (typeList.indexOf(newActiveList[item]) > -1) {
						orderActiveList.push(newActiveList[item])
					}
				}
				
				dataList.push(
					{
						title: titleArr[0],
						img: "/" + image + ".jpg",
						dosage: "每日一粒",
						list: orderActiveList
					}
				)
			}
			that.dataList = JSON.parse(JSON.stringify(dataList))
			/* 报告信息 */
			const reportType = reportDetails.mode.find(item => item.title == '平均每日饮水量？')
			const reportValue = reportType ? reportType.value : ''
			const reportValueList = reportValue == '小于1500ml' ? report['one'] : report['two']
			for (let i = 0; i < reportValueList.length; i++) {
				detailData.push(
					{
						type: "report",
						data: {
							reportList: reportValueList[i]
						}
					}
				)
			}
			
			that.reportDateList = JSON.parse(JSON.stringify(detailData))
			console.log('报告详情：', detailData)
		},
		onShow() {},
		watch: {},
		computed: {
			style () {
				return ("height:" + "calc(100% - " + this.statusBarHeight + "px)")
			}
		},
		methods: {
			goBack () {
				uni.switchTab({
					url: '/pages/report/index'
				})
			},
			goShop () {
				const data = JSON.stringify(this.dataList)
				uni.navigateTo({
				    url: '/pages/orderForm/index?list=' + data
				})
			},
			getImage (val) {
				switch (val){
					case "女性复合膳维片":
						return "yw"
					case "润亮片":
						return "rl"
					case "护眠片":
						return "hm"
					case "免疫健康片":
						return "my"
					case "胶原蛋白冻龄丸":
						return "dl"
					case "美白丸":
						return "mb"
					case "女性内调滋养片":
						return "zy"
					default:
						break
				}
			},
			onDialogClick (data) {
				this.showDialog = true
			}
		}
	}
</script>
<style lang="scss" scoped>
.box {
	background: #f5f7f9;
	height: 100%;
}
.content {
	padding: 62px 8% 18px;
	overflow: hidden;
	box-sizing: border-box;
	.swiperBox {
		width: 100%;
		height: calc(100% - 72px);
		background: #fff;
		border-radius: 30px;
		overflow: hidden;
		
		.swiper {
			width: 100%;
			height: 100%;
		}
	}
	.shopBox {
		width: 100%;
		height: 62px;
		margin-top: 10px;
		text-align: center;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}
}

.popupBox {
	width: 100%;
	height: 70vh;
	position: relative;
	.cross {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		z-index: 10000;
	}
	.popup {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.popupImage {
		width: 100%;
		height: 100%;
	}
}
</style>