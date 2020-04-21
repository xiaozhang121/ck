<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			title="问卷报告"
			fixed
		>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<view class="content reportIndex" :style="style">
			<van-tabs nav-class="navClass" tab-class="tabClas" tab-active-class="tabActiveClass" :active="active" bind:change="onChange" sticky animated swipeable line-height="0">
				<van-tab title="我的报告">
					<view class="item-box" :style="itemStyle">
						<view class="item" @click="immediately">
							<view class="add"><van-icon name="add" size="40"/></view>
							<view class="addTxt">再测一次</view>
						</view>
						<view class="item" v-for="(item, index) in reportList" :key="index">
							<view class="top-title">
								<text>
									<template v-for="key in item.type">
										<text :key="key" :class="['iconfont', getIcon(key)]" />
									</template>
								</text>
								<text>{{item.time}}</text>
							</view>
							<view class="mid-title">
								<view class="mid-box">
									<view class="">姓名</view>
									<view class="name">{{item.name}}</view>
								</view>
								<view class="mid-box mid-right">
									<text class="iconfont icon-zu3" />
								</view>
							</view>
							<view class="bottom-btn">
								<view class="bottom-box">
									<text class="title">营养师推荐：{{item.drug.length}}种补剂</text>
								</view>
								<view class="bottom-box">
									<van-button @click="goDetails(item.id)" plain custom-style="padding: 3px 10px; height: auto;font-size: 15px;border-radius: 10px;" color="#08CFC0">查看报告</van-button>
								</view>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="他人报告">
					<view class="item-box" :style="itemStyle">
						<view class="item" v-for="(item, index) in restsList" :key="index">
							<view class="top-title">
								<text>
									<template v-for="key in item.type">
										<text :key="key" :class="['iconfont', getIcon(key)]" />
									</template>
								</text>
								<text>{{item.time}}</text>
							</view>
							<view class="mid-title">
								<view class="mid-box">
									<view class="">姓名</view>
									<view class="name">{{item.name}}</view>
								</view>
								<view class="mid-box mid-right">
									<text class="iconfont icon-zu3" />
								</view>
							</view>
							<view class="bottom-btn">
								<view class="bottom-box">
									<text class="title">营养师推荐：{{item.drug.length}}种补剂</text>
								</view>
								<view class="bottom-box">
									<van-button @click="goDetails(item.id)" plain custom-style="padding: 3px 10px; height: auto;font-size: 15px;border-radius: 10px;" color="#08CFC0">查看报告</van-button>
								</view>
							</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>
<script>
	import statusBar from "../../components/status-bar/index.vue"
	import { getStorage, removeStorage } from 'pages/common/util';
	export default {
		name: "reportIndex",
		components: { statusBar },
		data () {
			return {
				statusBarHeight: this.$store.state.statusBarHeight,
				active: 0,
				reportList: [],
				restsList: []
			}
		},
		onLoad() {
			this.getReportList()
		},
		onShow() {},
		watch: {},
		computed: {
			style () {
				return ("height:" + "calc(100% - " + this.statusBarHeight + "px)")
			},
			itemStyle () {
				return ("height:" + "calc(100vh - " + ( this.statusBarHeight + 102 ) + "px)")
			}
		},
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
			/* 获取缓存中的报告列表 */
			getReportList () {
				const that = this
				let reportList = getStorage('report')
				reportList = reportList ? reportList.reverse() : []
				console.log('报告：', reportList)
				that.reportList = reportList
			},
			/* tab标签切换 */
			onChange(event) {
				const {name} = event.detail
				debugger
			},
			/* 再测一次 */
			immediately () {
				uni.navigateTo({
				    url: '/pages/test/index'
				});
			},
			/* 报告详情 */
			goDetails (id) {
				uni.navigateTo({
				    url: '/pages/report/details?id=' + id
				})
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
	padding: 44px 0 18px;
	overflow: hidden;
	box-sizing: border-box;
	.item-box {
		width: 100%;
		margin: 0 auto;
		padding: 10px 5%;
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
		.item {
			width: 100%;
			border-radius: 20px;
			padding: 20px;
			box-sizing: border-box;
			background: #fff;
			overflow: hidden;
			margin-bottom: 30rpx;
		}
		.item:last-child {
			margin-bottom: 0;
		}
		.add {
			text-align: center;
			color: #08CFC0;
		}
		.addTxt {
			text-align: center;
			color: #999;
			font-size: 33rpx;
		}
		.top-title, .mid-title, .bottom-btn {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			color: #ccc;
			font-size: 17px;
			.iconfont {
				margin: 0 8rpx;
				color: #666;
				font-size: 18px;
			}
		}
		.mid-title {
			padding: 35rpx 0;
			.name {
				color: #333;
				margin-top: 20rpx;
				font-size: 40rpx;
			}
			.mid-box {
				vertical-align: middle;
				.iconfont {
					font-size: 96rpx;
					color: #ccc;
				}
			}
			.mid-right {
				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
				align-items: center;
				margin-right: 0.3em;
			}
		}
		.bottom-btn {
			.title {
				color: #666;
				font-size: 30rpx;
			}
			.bottom-box {
				vertical-align: middle;
			}
		}
	}
}
</style>
<style lang="scss">
	.reportIndex {
		.van-hairline--top-bottom:after {
			border-width: 0;
		}
		.van-tabs--line .van-tabs__wrap {
			height: auto !important;
		}
		.van-tabs__scroll {
			background: transparent !important;
		}
		.navClass {
			width: 66%;
			margin: 0 auto;
			padding: 15rpx 0;
		}
		.tabClas {
			color: #CCCCCC;
			font-size: 30rpx;
			font-weight: bolder;
			font-family: "PingFang SC";
		}
		.tabActiveClass {
			color: #009A9A;
			font-size: 40rpx;
		}
	}
</style>