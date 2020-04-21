<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			fixed
		>
			<view slot="left">
				<van-button size="mini" custom-style="padding: 0px;height: auto;font-size: 22px;border:none;" @click="goHome" type="default">
					<van-icon name="arrow-left" />
					<!-- <van-icon name="wap-home" /> -->
				</van-button>
			</view>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view class="content">
			<van-skeleton title row="3" :loading="!MonitorVersion" >
				<image v-if="activeNum == 1" class="steps" :src="imgURL + '/test2.png'" mode="widthFix"></image>
				<image v-else-if="activeNum == 2" class="steps" :src="imgURL + '/test3.png'" mode="widthFix"></image>
				<image v-else class="steps" :src="imgURL + '/test1.png'" mode="widthFix"></image>
			</van-skeleton>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	export default {
		name: "test-index",
		components: { statusBar },
		data() {
			return {
				activeNum: 0,
				timer: null,
				imgURL: this.$store.state.imgURL
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			}
		},
		onLoad(option) {
			const that = this
			console.log('参数：', option)
			try{
				const num = option.num
				if (num) {
					that.activeNum = Number(num)
				} else {
					that.activeNum = 0
				}
			}catch(e){}
		},
		onShow() {
			this.startInterval()
		},
		onHide() {
			this.endInterval()
		},
		methods: {
			startInterval () {
				const that = this
				that.timer = setInterval(() => {
					that.redirectTo()
				}, 3000)
			},
			endInterval () {
				const that = this
				try{
					clearInterval(that.timer)
				}catch(e){}
				console.log('停')
			},
			goHome () {
				this.endInterval()
				uni.navigateBack({
				    delta: 1
				})
				// uni.switchTab({
				// 	url: '/pages/home/index'
				// })
			},
			redirectTo () {
				const that = this
				that.endInterval()
				console.log('跳')
				let URL = '/pages/questionnaire/basicsInfo'
				if (that.activeNum == 1) {
					URL = '/pages/questionnaire/health'
				} else if (that.activeNum == 2) {
					URL = '/pages/questionnaire/mode'
				}
				uni.redirectTo({
					url: URL
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
	padding: 44px 0 18px;
	.steps {
		width: 50%;
		margin: 48rpx auto;
		display: block;
	}
}
</style>
