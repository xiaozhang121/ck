<template>
	<view class="box">
		<!-- 切换导航-导航 -->
		<van-nav-bar
			title="我的"
			fixed
		/>
		<!-- 导航站位 -->
		<status-bar />
		<!-- 内容展示 -->
		<view class="content">
			<van-skeleton title row="3" :loading="!MonitorVersion" >
				<image class="logo" :src="imgURL + '/user.png'" mode="widthFix"></image>
				<view class="shopBox">
					<van-button size="mini" custom-style="padding: 12px;height: auto;font-size: 32px;border:none;border-radius: 50%;" color="#08CFC0" type="default">
						<van-icon name="shopping-cart-o" />
					</van-button>
				</view>
			</van-skeleton>
		</view>
	</view>
</template>

<script>
	import statusBar from "../../components/status-bar/index.vue"
	export default {
		name: "user",
		components: { statusBar },
		data() {
			return {
				imgURL: this.$store.state.imgURL
			}
		},
		computed: {
			MonitorVersion () {
				return this.$store.state.MonitorVersion
			}
		},
		onLoad() {},
		methods: {},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
.box {
	background: #f5f7f9;
	height: 100%;
}
.content {
	padding: 62px 0 18px;
	height: 100%;
	box-sizing: border-box;
	background: #f5f7f9;
}
.logo {
	width: 100%;
}
.shopBox {
	text-align: right;
	padding: 20rpx;
	box-sizing: border-box;
}
</style>
