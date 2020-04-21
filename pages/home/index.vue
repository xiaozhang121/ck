<template>
	<view class="home-box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			v-if="showNav"
			fixed
		>
			<view slot="left">
				<image class="nav-logo" src="/static/imgage/logo.png" mode="widthFix"></image>
				<!-- <van-button size="mini" @click="immediately" custom-style="padding: 3px 10px; height: auto;font-size: 12px;" color="#08CFC0" round>即刻定制</van-button> -->
			</view>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view>
			<image class="logo" src="/static/imgage/logo.png" mode="widthFix"></image>
			<van-skeleton title row="3" :loading="!MonitorVersion" >
				<view class="one-image">
					<!-- <image class="image" :src="imgURL + '/kaiping.png'" mode="widthFix"></image> -->
					<image class="image" :src="imgURL + '/home-03311130.png'" mode="widthFix"></image>
					<view class="customization-box">
						<van-button @click="immediately" custom-style="padding: 6px 20px; height: auto;font-size: 13px;" color="#08CFC0" round>立即定制</van-button>
					</view>
					<view :class="['arrows', noneview ? 'noneview' : '']"><van-icon name="arrow-down" /></view>
				</view>
				<view class="area-box" ref="btn">
					<!-- 第二步 -->
					<view class="">
						<!-- <view class="area-image">
							<image class="image" :src="imgURL + '/san2.png'" mode="widthFix"></image>
						</view> -->
						<van-transition :show="showNav" :duration="500">
							<view v-if="showNav" :class="['button-box', showNav ? 'fixedBtn' : '']">
								<van-button @click="immediately" block custom-style="font-size: 15px;" color="#08CFC0" round>立即定制</van-button>
							</view>
						</van-transition>
					</view>
					<!-- 第三步 -->
					<!-- <view class="">
						<view class="area-image">
							<image class="image" :src="imgURL + '/chengnuo3.png'" mode="widthFix"></image>
						</view>
					</view> -->
				</view>
			</van-skeleton>
		</view>
		<view class="imgbox" :style="style"></view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	import { getStorage, setStorage, removeStorage } from 'pages/common/util';
	export default {
		components: { statusBar },
		data() {
			return {
				showNav: false,
				noneview: false,
				statusBarHeight: this.$store.state.statusBarHeight,
				imgURL: this.$store.state.imgURL,
				imgboxHeight: 0
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			},
			style () {
				return ("height: calc(100vh - " + this.statusBarHeight + "px)")
			}
		},
		onLoad() {
			const reportList = getStorage('report')
			const newData = []
			const oldData = []
			for (let i = 0; i < reportList.length; i++) {
				const drug = reportList[i].drug
				if (drug[0] != '润亮片' && drug[0].indexOf(';') == -1) {
					oldData.push(i)
				} else {
					newData.push(reportList[i])
				}
			}
			if (oldData.length) {
				setStorage('report', newData)
			}
		},
		onShow() {
			const that = this
			that.removeStorageData()
			setTimeout(()=> {
				const query = uni.createSelectorQuery().in(this)
				query.select('.imgbox').boundingClientRect( (rect) => {
					let top = rect.top
					let bottom = rect.bottom
					let height = rect.height
					that.imgboxHeight = height
				}).exec()
			}, 100)
		},
		onPageScroll: function (e) {
			const that = this
			const query = uni.createSelectorQuery().in(this)
			query.select('.one-image').boundingClientRect( (rect) => {
				let top = rect.top
				let bottom = rect.bottom
				let height = rect.height
				if (-(top) > 430) {
					that.showNav = true
				} else {
					that.showNav = false
				}
				
				if ((height - that.imgboxHeight - 60) < -(top)) {
					that.noneview = true
				} else {
					that.noneview = false
				}
			}).exec()
		},
		methods: {
			immediately () {
				const that = this
				uni.navigateTo({
				    url: '/pages/test/index'
				});
			},
			/* 删除storage中的数据 */
			removeStorageData () {
				/* 获取缓存中前面两部分的内容 */
				try{
					removeStorage('basicsInfo')
					removeStorage('health')
					removeStorage('healthList')
					removeStorage('mode')
				}catch(e){}
			}
		},
		mounted() {}
	}
</script>

<style lang="scss">
	.home-box {
		background: #fff;
		.nav-logo {
			width: 180rpx;
			padding: 18rpx 30rpx;
			vertical-align: middle;
		}
		.logo {
			display: block;
			width: 180rpx;
			padding: 18rpx 30rpx;
		}
		.imgbox {
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
		}
		.image {
			display: block;
			width: 100%;
			margin-top: 20rpx;
			position: relative;
		}
		.one-image {
			position: relative;
			.customization-box {
				position: absolute;
				top: 13.3%;
				left: 50%;
				margin-left: -47px;
			}
			.arrows {
				position: fixed;
				bottom: 10rpx;
				width: 100%;
				text-align: center;
				transition: transform .2s ease;
			}
			.noneview {
				transform: rotateZ(180deg);
				transition: transform .2s ease;
			}
		}
		.customization {
			.van-button {
				padding: 5px 15px;
			}
		}
		.heightVh {
			height: 100vh;
		}
		.area-box {
			.area-image {
				width: 100%;
				padding-top: 65rpx;
				margin-bottom: 80rpx;
			}
			.button-box {
				width: 80%;
				margin: 0 auto;
			}
			.heightVh:last-of-type {
				height: calc(100vh - 64px);
			}
		}
		.fixedBtn {
			position: fixed;
			bottom: 50rpx;
			left: 10%;
		}
	}
</style>
