<script>
	import { getStorage, setStorage, removeStorage } from 'pages/common/util';
	export default {
		onLaunch: function() {
			// 日期转换格式  使用提示：new Date().Format("yyyy-MM-dd HH:mm:ss")
			Date.prototype.Format = function (fmt) { // author: meizz
			  var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"H+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			  };
			  if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			  for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			  return fmt;
			}
			// 微信  执行以下操作
			// #ifdef MP-WEIXIN
			
			// #endif
		},
		onShow: function() {
			console.log('App Show', this.$store.state.statusBarHeight)
			// 微信  执行以下操作
			// #ifdef MP-WEIXIN
			// this.autoUpdate();
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
			// 微信  执行以下操作
			// #ifdef MP-WEIXIN
			// removeStorage('isUpDate')
			// #endif
		},
		methods: {
			/**
			* 检查小程序版本
			*/
			autoUpdate () {
				var that = this
				uni.showLoading({
				  title: '加载中..',
				  mask: true
				})
				this.$store.state.MonitorVersion = false
				let isUpDate = getStorage('isUpDate');
				if (!isUpDate) {
				  // 获取小程序更新机制兼容
				  if (wx.canIUse('getUpdateManager')) {
					const updateManager = wx.getUpdateManager()
					//1. 检查小程序是否有新版本发布
					updateManager.onCheckForUpdate(function (res) {
					  // 请求完新版本信息的回调
					  if (res.hasUpdate) {
						uni.showLoading({
						  title: '升级中..',
						  mask: true
						})
						//检测到新版本，需要更新，给出提示
						that.downLoadAndUpdate(updateManager)
					  } else {
						// 监测完毕以后调用方法
						that.initData()
					  }
					})
				  }
				} else {
				   // 监测完毕以后调用方法
				   that.initData()
				}
			},
			/**
			* 下载小程序新版本并重启应用
			*/
			downLoadAndUpdate (updateManager) {
				let that = this
				//静默下载更新小程序新版本
				updateManager.onUpdateReady(function () {
				  uni.hideLoading();
				  setStorage('isUpDate', true)
				  //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				  updateManager.applyUpdate()
				})
				updateManager.onUpdateFailed(function () {
				  uni.hideLoading();
				  // 新的版本下载失败
				  uni.showModal({
				    title: '已经有新版本了哟~',
				    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
				  })
				})
			},
			/* 检查完毕，隐藏弹窗 */
			initData () {
				this.$store.state.MonitorVersion = true
				console.log('检查完毕；', this.$store.state.MonitorVersion)
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss">
	@import "./static/icon/iconfont.css";
	/*每个页面公共css */
	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
</style>
