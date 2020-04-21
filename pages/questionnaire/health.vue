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
			<view class="examination">
				<examination :data="list" :count="count" type="health" :showProgress="true" @on-next="goNext"></examination>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	import examination from "../../components/examination/index.vue"
	const question = require("../../static/json/index.json")
	import { setStorage } from 'pages/common/util';
	export default {
		name: "health",
		components: { statusBar, examination },
		data() {
			return {
				count: 0,
				list: question.health
			}
		},
		onLoad(option) {},
		methods: {
			goHome () {
				uni.navigateBack({
				    delta: 1
				})
				// uni.switchTab({
				// 	url: '/pages/home/index'
				// })
			},
			goNext (data) {
				/* 存入缓存 */
				setStorage('health', data)
				
				
				const URL = '/pages/test/index?num=2'
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
	background: #f5f7f9;
	height: 100%;
}
.content {
	padding: 44px 0 18px;
	background: #f5f7f9;
	.examination {
		width: 90%;
		margin: 0 auto;
	}
}
</style>
