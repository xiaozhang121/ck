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
				<examination :data="list" :count="count" type="mode" :showProgress="true" @on-next="goNext"></examination>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	import examination from "../../components/examination/index.vue"
	const question = require("../../static/json/index.json")
	import { getStorage, setStorage, removeStorage } from 'pages/common/util';
	export default {
		name: "mode",
		components: { statusBar, examination },
		data() {
			return {
				count: 0,
				list: []
			}
		},
		onLoad(option) {
			const healthList = getStorage('healthList')
			console.log('结果：', healthList)
			const mode = JSON.parse(JSON.stringify(question.mode))
			const list = []
			for (let i in mode) {
				const affiliation = mode[i].affiliation
				if (affiliation) {
					const index = healthList.indexOf(affiliation)
					if (index == -1) list.push(mode[i])
				} else {
					list.push(mode[i])
				}
			}
			this.list = JSON.parse(JSON.stringify(list))
		},
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
				const that = this
				/* 存入缓存 */
				setStorage('mode', data)
				const URL = '/pages/circle/index'
				console.log('答题完毕，到生成报告')
				uni.reLaunch({
				    url: URL
				});
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
