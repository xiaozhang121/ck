<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			fixed
		>
		</van-nav-bar>
		<!-- 导航站位 -->
		<status-bar />
		<view class="content">
			<view class="circle">
				<van-circle :value="value" :stroke-width="15" :size="150" layer-color="#DBF4F4" color="#08CFC0">
					<text class="circleFont">
						{{value}}%
					</text>
				</van-circle>
			</view>
			<view class="contentFont">{{text}}</view>
			<view class="bottomFont">算法版本号：V116.201</view>
		</view>
	</view>
</template>
<script>
	import statusBar from "../../components/status-bar/index.vue"
	import { getStorage, setStorage, removeStorage, getUUID } from 'pages/common/util';
	const group = require("../../static/json/group.json")
	export default {
		name: "circle",
		components: { statusBar },
		data () {
			return {
				value: 0,
				text: '同态加密处理',
				uuid: ''
			}
		},
		onLoad() {
			this.getStorageData()
		},
		onShow() {
			this.setValue()
		},
		watch: {
			value (now) {
				if (now < 34) {
					this.text = '同态加密处理'
				} else if (now >= 100) {
					this.text = '报告生成完毕'
					this.goReportDetails()
				} else if (now > 76) {
					this.text = '正在生成报告'
				} else {
					this.text = '算法进行'
				}
			}
		},
		computed: {},
		methods: {
			/* 设置进度 */
			setValue () {
				const that = this
				const time = setInterval(() => {
					that.value++
					if (that.value >= 100) {
						console.log('停止：', that.value)
						clearInterval(time)
					}
				}, 70)
			},
			/* 获取storage中的数据 */
			getStorageData () {
				const that = this
				const basicsInfo = getStorage('basicsInfo')
				const health = getStorage('health')
				const healthList = getStorage('healthList')
				const mode = getStorage('mode')
				let report = getStorage('report')
				if (!report) {
					report = []
				}
				let data = []
				if (healthList.length == 3) {
					const list = JSON.parse(JSON.stringify(group.three))
					data = that.getTypeList(list, healthList)
				} else if (healthList.length == 2) {
					const list = JSON.parse(JSON.stringify(group.two))
					data = that.getTypeList(list, healthList)
				} else {
					const list = JSON.parse(JSON.stringify(group.one))
					data = that.getTypeList(list, healthList)
				}
				const uuid = getUUID()
				report.push(
					{
						id: uuid,
						drug: data,
						mode: mode,
						type: healthList,
						name: basicsInfo[0].value,
						time: new Date().Format("yyyy-MM-dd")
					}
				)
				setStorage('report', report)
				that.uuid = uuid
				try{
					removeStorage('basicsInfo')
					removeStorage('health')
					removeStorage('healthList')
					removeStorage('mode')
				}catch(e){}
			},
			/* 判断是那种类型 */
			getTypeList (list, val) {
				let data = []
				for (let i = 0; i < list.length; i++) {
					const group = list[i].group
					const groupList = []
					for (let item in group) {
						groupList.push(val.indexOf(group[item]))
					}
					if (groupList.indexOf(-1) == -1) {
						data = list[i].value
						break
					}
				}
				return data
			},
			/* 跳转至报告详情页 */
			goReportDetails () {
				const that = this
				setTimeout(() => {
					uni.reLaunch({
					    url: '/pages/report/details?id=' + that.uuid
					});
				}, 1000)
			}
		}
	}
</script>
<style lang="scss" scoped>
.box {
	background: #fff;
	height: 100%;
}
.content {
	padding: 44px 0 14%;
	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 160rpx auto 0;
		.circleFont {
			font-size: 48rpx;
		}
	}
	.contentFont, .bottomFont {
		margin-top: 58rpx;
		font-size: 40rpx;
		color: #333;
		text-align: center;
	}
	.bottomFont {
		font-size: 30rpx;
		position: fixed;
		bottom: 5%;
		left: 0;
		width: 100%;
		color: #999;
	}
}
</style>