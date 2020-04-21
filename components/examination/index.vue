<template>
	<view class="examination">
		<van-dialog
		  :title="title"
		  :show="showDialog"
		  :message="message"
		  confirmButtonText="知道了"
		  @confirm="confirm"
		>
		</van-dialog>
		
		<!-- <van-transition :show="showContent" :name="transitionName" :duration="400"> -->
			<view class="progress" v-if="show">
				<view class="count-box">
					<text class="count">{{index + 1}}</text> / <text>{{list.length}}</text>
				</view>
				<view class="percentage">
					<van-progress :percentage="percentage" :show-pivot="false" color="#08CFC0" :stroke-width="8" />
				</view>
			</view>
			<!-- 主页选择 -->
			<template v-if="list.length != 0 && index != -1">
				<view>
					<!-- 标题 -->
					<view class="title">
						<view>{{list[index].title}}</view>
						<view class="remark" v-if="list[index].remark">{{list[index].remark}}</view>
					</view>
					<view class="desc">{{list[index].desc}}</view>
					<view class="gapFilling">
						<!-- 填空题 -->
						<template v-if="list[index].type == '1'">
							<input
								v-show="index % 2 != 0"
								class="gapFillingInput"
								:value="value"
								:type="list[index].txtType == 'string' ? 'text' : 'number'"
								placeholder="请在此输入"
								@input="onChange"
							/>
							<input
								v-show="index % 2 == 0"
								class="gapFillingInput"
								:value="value"
								:type="list[index].txtType == 'string' ? 'text' : 'number'"
								placeholder="请在此输入"
								@input="onChange"
							/>
						</template>
						<!-- 单选题 -->
						<template v-else-if="list[index].type == '2'">
							<view>
								<radio-group @change="onRadioChange">
									<label v-for="item in radioList" :key="item.value">
										<view class="itemLabel">
											<radio :value="item.value" :checked="item.value === value" color="#08CFC0"/>
											<text class="itemtext">{{item.lable}}</text>
										</view>
									</label>
								</radio-group>
							</view>
						</template>
						<!-- 多选题 -->
						<template v-else-if="list[index].type == '3' && list[index].mold != 'card'">
							<view v-if="showCheckNum == '2'">
								<checkbox-group @change="onCheckboxChange">
									<label v-for="item in checkboxList1" :key="item.value">
										<view class="itemLabel">
											<checkbox :value="item.value" :checked="item.checked" />
											<text class="itemtext">{{item.lable}}</text>
										</view>
									</label>
								</checkbox-group>
							</view>
							<view v-else>
								<checkbox-group @change="onCheckboxChange">
									<label v-for="item in checkboxList2" :key="item.value">
										<view class="itemLabel">
											<checkbox :value="item.value" :checked="item.checked" />
											<text class="itemtext">{{item.lable}}</text>
										</view>
									</label>
								</checkbox-group>
							</view>
						</template>
						<!-- 多选题-卡片 -->
						<template v-else-if="list[index].type == '3' && list[index].mold == 'card'">
							<van-row gutter="20">
							  <van-col span="8" v-for="item in checkboxList" :key="item.value">
								  <view class="itemView">
									  <view class="viewBox">
										<button class="itemBtn" :class="{activeItemBtn: itemBtnChange(item.value)}" @click="onClickBtn(item.value)"><text class="iconfont" :class="item.icon" /></button>
									  </view>
									  <view class="view-p">{{item.lable}}</view>
								  </view>
							  </van-col>
							</van-row>
						</template>
					</view>
					<view v-if="list[index].title == '您的身高？'" class="reminder">{{stature}}</view>
					<view v-if="list[index].title == '您的体重？'" class="reminder">{{weight}}</view>
					<view v-if="list[index].bottom" class="bottom-content">{{list[index].bottom}}</view>
					
					<!-- 填空时的下一步 -->
					<view class="nextStep" v-if="list[index].type == '1'">
						<van-button round type="primary" color="#08CFC0" custom-style="padding: 10px 11px;height: auto;font-size: 24px;border:none;border-radius: 50%;" @click="clickNextStep">
							<van-icon name="arrow" />
						</van-button>
					</view>
				</view>
			</template>
		<!-- </van-transition> -->
		
		
		<view class="bottom-btn">
			<van-row gutter="20">
				<van-col span="8">
					<van-button round plain type="primary" block color="#999999" custom-style="font-size: 25px;border:none;" @click="clickGoBack">
						<van-icon name="arrow-left" />
					</van-button>
				</van-col>
				<van-col span="16" v-if="list[index].type != '1'">
					<van-button round type="primary" block color="#08CFC0" custom-style="font-size: 16px;border:none;" @click="clickNextStep">
						下一步
					</van-button>
				</van-col>
			</van-row>
		</view>
		<view v-if="!showContent" class="mskview"></view>
	</view>
</template>
<script>
	import { getStorage, setStorage, removeStorage } from 'pages/common/util';
	export default {
		name: "examination",
		data() {
			return {
				index: -1,
				value: '',
				listData: [],
				checkboxList: [],
				checkboxList1: [],
				checkboxList2: [],
				radioList: [],
				list: [],
				newList: [],
				weight: '',
				stature: '',
				isGoHome: false,
				showDialog: false,
				showGoBack: false,
				showContent: false,
				showCheckNum: '1',
				title: '',
				message: '',
				transitionName: 'slide-left'
			}
		},
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			},
			count: {
				type: Number,
				default: -1
			},
			showProgress: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ''
			}
		},
		created() {
			this.index = this.count
		},
		watch: {
			count (now) {
				// console.log('计数变化')
				this.index = now
			},
			index (now) {
				this.setDefault()
			}
		},
		computed: {
			percentage () {
				const totality = this.list.length
				const count = JSON.parse(JSON.stringify(this.index)) + 1
				const num = parseInt(totality == 0 || count == 0 ? 0 : (count / totality * 100))
				return num
			},
			show () {
				return (this.list.length != 0 && this.showProgress)
			}
		},
		methods: {
			setShowContent (type) {
				const that = this
				that.showContent = false
				setTimeout(() => {
					that.showContent = true
					if (type == 'add') {
						that.index++
					} else if (type == 'min') {
						that.index--
					}
				}, 300)
			},
			setDefault () {
				const that = this
				try{
					that.value = ''
					const type = JSON.parse(JSON.stringify(that.list[that.index].type))
					const mold = that.list[that.index].mold
					const list = JSON.parse(JSON.stringify(that.list[that.index].list))
					const value = JSON.parse(JSON.stringify(that.list[that.index].value))
					if (type == '2') {
						that.value = value
						that.radioList = list
					} else if (type == '3') {
						that.value = value
						that.checkboxList = list
						if (mold != 'card' && that.showCheckNum == '1') {
							that.checkboxList1 = list.map(item => {
								return {
									...item,
									checked: (that.checkboxChecked(item.value))
								}
							})
							that.showCheckNum = '2'
						} else if (mold != 'card' && that.showCheckNum == '2') {
							that.checkboxList2 = list.map(item => {
								return {
									...item,
									checked: (that.checkboxChecked(item.value))
								}
							})
							that.showCheckNum = '1'
						}
					}
				}catch(e){}
			},
			confirm () {
				this.showDialog = false
				if (this.isGoHome) {
					// this.goHomeUni()
				}
				this.isGoHome = false
			},
			/* 判断是否被选中 */
			itemBtnChange (val) {
				const that = this
				let list = JSON.parse(JSON.stringify(that.list[that.index].value))
				if (list) {
					if (!(Object.prototype.toString.call(list) === '[object Array]')) {
						list = list.split(',')
					}
					const index = list.indexOf(val)
					return !(index === -1)
				}
				return false
			},
			/* 点击特殊复选框 */
			onClickBtn (val) {
				const that = this
				let value = JSON.parse(JSON.stringify(that.list[that.index].value))
				if (value) {
					value = value.split(',')
				} else {
					value = []
				}
				const index = value.indexOf(val)
				if (index > -1) {
					value.splice(index,1)
				} else {
					value.push(val)
				}
				that.list[that.index].value = JSON.parse(JSON.stringify(value)).join(',')
				
				that.value = JSON.parse(JSON.stringify(value)).join(',')
				const max = Number(that.list[that.index].max)
				if (value.length > max) {
					that.title = "每次最多可选" + max + "项"
					that.message = "健康改善需循序渐进，请选择不超过" + max + "项您最想改善的健康问题。"
					that.showDialog = true
				}
				
				// console.log('结果：', value)
				// console.log('结果：', that.list[that.index].value)
			},
			/* 判断是否为数字类型 */
			isNumber(value) {
				var patrn = /^(-)?\d+(\.\d+)?$/;
				if (patrn.exec(value) == null || value == "") {
					return false
				} else {
					return true
				}
			},
			/* 多选是否选中 */
			checkboxChecked (val) {
				const that = this
				const value = JSON.parse(JSON.stringify(that.value))
				return (!(value.indexOf(val) === -1))
			},
			/* 输入框 */
			onChange (event) {
				const that = this
				const { value } = event.detail
				if (that.list[that.index].title == '您的身高？' && that.isNumber(value)) {
					const num = Number(JSON.parse(JSON.stringify(value)))
					let stature = (String(num / 100)).split('.')
					that.stature = (stature[0] + '米' + (stature.length > 1 ? stature[1] : ''))
					if (num > 250) {
						that.isGoHome = true
						that.title = "提示"
						that.message = "身高不能大于250CM"
						that.showDialog = true
					}
				} else if (that.list[that.index].title == '您的身高？') {
					that.stature = ''
				} else if (that.list[that.index].title == '您的体重？' && that.isNumber(value)) {
					const num = Number(JSON.parse(JSON.stringify(value)))
					let stature = (String(num * 2))
					that.weight = stature + '斤'
					if (num > 300) {
						that.isGoHome = true
						that.title = "提示"
						that.message = "体重不能大于300KG"
						that.showDialog = true
					}
				} else if (that.list[that.index].title == '您的体重？') {
					that.weight = ''
				} else if (that.list[that.index].title == '您的年龄？') {
					const num = Number(JSON.parse(JSON.stringify(value)))
					if (num > 150) {
						that.isGoHome = true
						that.title = "提示"
						that.message = "年龄不能大于150岁"
						that.showDialog = true
					}
				}
				that.value = JSON.parse(JSON.stringify(value))
				that.list[that.index].value = value
			},
			/* 单选框 */
			onRadioChange (event) {
				const that = this
				const { value } = event.detail
				that.list[that.index].value = value
				that.value = JSON.parse(JSON.stringify(value))
				if (that.list[that.index].title == '您是否处于以下阶段？' && (value == '怀孕期' || value == '哺乳期')) {
					that.isGoHome = true
					that.title = "提示"
					that.message = "十分抱歉，我们非常在意您和您的宝宝，所以如果您正处于怀孕期或者哺乳期，我们建议您向医生寻求健康咨询"
					that.showDialog = true
					return false
				}
				
				setTimeout(()=> {
					that.clickNextStep()
				}, 200)
			},
			/* 多选框 */
			onCheckboxChange (event) {
				const that = this
				const { value } = event.detail
				const topicTitle = that.list[that.index].title
				let newValue = JSON.parse(JSON.stringify(value))
				let index = -1
				try{
					index = newValue.indexOf('以上均无')
					if (index > -1) {
						newValue = ['以上均无']
					}
				}catch(e){}
				
				that.value = JSON.parse(JSON.stringify(newValue))
				that.list[that.index].value = newValue
				if (index > -1) {
					that.setDefault()
				}
			},
			/* 上一步 */
			clickGoBack () {
				const that = this
				if (that.index < 1) {
					return false
				}
				that.setShowContent ('min')
				that.showGoBack = true
				// console.log('上一步', that.index)
				// console.log('结果：', that.list[that.index])
			},
			/* 下一步 */
			clickNextStep () {
				const that = this
				that.showGoBack = false
				const list = JSON.parse(JSON.stringify(that.list))
				const newList = JSON.parse(JSON.stringify(that.newList))
				let value = list[that.index].type == '1' ? list[that.index].value.replace(/(^\s*)|(\s*$)/g, "") : list[that.index].value
				if (list[that.index].mold != 'card' && list[that.index].type == '3' && value.length) {
					value = value.join(',')
				} else if (list[that.index].mold != 'card' && list[that.index].type == '3' && !value.length) {
					value = ''
				}
				if (value == '') {
					that.$showToast('内容为空，不能下一题')
					return false
				}
				const topicTitle = list[that.index].title
				
				// console.log('index:', that.index, '---length：', list.length)
				if (that.index >= (list.length - 1)) {
					if (topicTitle == '您是否处于以下阶段？' && (value == '怀孕期' || value == '哺乳期')) {
						that.isGoHome = true
						that.title = "提示"
						that.message = "十分抱歉，我们非常在意您和您的宝宝，所以如果您正处于怀孕期或者哺乳期，我们建议您向医生寻求健康咨询"
						that.showDialog = true
						return false
					}
					// console.log('需要下一个类型了：', that.index)
					that.$emit('on-next', list)
				} else {
					if (list[that.index].type == '1') {
						const num = Number(value)
						if (isNaN(num) && that.index != 0) {
							that.$showToast('请输入正确的数字')
							return false
						} else if ( topicTitle == '您的年龄？' && num < 18) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "十分抱歉，我们暂不对18岁以下的未成年人提供服务"
							that.showDialog = true
							return false
						} else if (topicTitle == '您的年龄？' && num > 150) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "年龄不能大于150岁"
							that.showDialog = true
							return false
						} else if (topicTitle == '您的体重？' && num > 300) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "体重不能大于300KG"
							that.showDialog = true
							return false
						} else if (topicTitle == '您的体重？' && num < 20) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "体重不能小于20KG"
							that.showDialog = true
							return false
						} else if (topicTitle == '您的身高？' && num > 250) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "身高不能大于250CM"
							that.showDialog = true
							return false
						} else if (topicTitle == '您的身高？' && num < 50) {
							that.isGoHome = true
							that.title = "提示"
							that.message = "身高不能小于50CM"
							that.showDialog = true
							return false
						}
					} else if (value == '男') {
						that.isGoHome = true
						that.title = "提示"
						that.message = "十分抱歉，该产品目前主要针对女性健康提供服务"
						that.showDialog = true
						return false
					} else if (topicTitle == '您是否处于以下阶段？' && (value == '怀孕期' || value == '哺乳期')) {
						that.isGoHome = true
						that.title = "提示"
						that.message = "十分抱歉，我们非常在意您和您的宝宝，所以如果您正处于怀孕期或者哺乳期，我们建议您向医生寻求健康咨询"
						that.showDialog = true
						return false
					} else if (list[that.index].mold == 'card') {
						const arrList = value.split(',')
						const max = Number(list[that.index].max)
						if (arrList.length > max) {
							that.title = "每次最多可选" + max + "项"
							that.message = "健康改善需循序渐进，请选择不超过" + max + "项您最想改善的健康问题。"
							that.showDialog = true
							return false
						} else if (topicTitle == '您希望改善的健康问题') {
							setStorage('healthList', arrList)
							const newActiveList = []
							for (let item in arrList) {
								const itemType = arrList[item]
								for (let i in newList) {
									const affiliation = newList[i].affiliation ? newList[i].affiliation.split(',') : ''
									const valueIndex = affiliation ? affiliation.indexOf(itemType) : -1
									const listTitle = newList[i].title
									const titleIndex = newActiveList.findIndex(element => element.title == listTitle)
									if ((valueIndex > -1 && titleIndex == -1 && affiliation) || (!affiliation && titleIndex == -1)) {
										let activeValue = list.find(element => element.title == listTitle)
										if (activeValue) {
											activeValue = activeValue.value
										} else {
											activeValue = ''
										}
										newList[i].value = activeValue
										newActiveList.push(newList[i])
									}
								}
							}
							that.list = JSON.parse(JSON.stringify(newActiveList))
						}
					} else if (that.type == 'mode' && topicTitle == '平均每周运动几次？') {
						const newActiveList = []
						for (let i in newList) {
							const listTitle = newList[i].title
							const titleIndex = newActiveList.findIndex(element => element.title == listTitle)
							const falg = value != '基本不运动' ? true : (newList[i].exercise !== '1')
							if (falg && titleIndex == -1) {
								let activeValue = list.find(element => element.title == listTitle)
								if (activeValue) {
									activeValue = activeValue.value
								} else {
									activeValue = ''
								}
								newList[i].value = activeValue
								newActiveList.push(newList[i])
							}
						}
						that.list = JSON.parse(JSON.stringify(newActiveList))
					} else if (that.type == 'mode' && topicTitle == '平均喝酒的频率？') {
						const newActiveList = []
						let exercise = false
						for (let i in newList) {
							const listTitle = newList[i].title
							const titleIndex = newActiveList.findIndex(element => element.title == listTitle)
							let itemExercise = false
							const falg = value != '几乎不饮酒' ? true : (newList[i].drink !== '1')
							if (!exercise && listTitle === '平均每周运动几次？') {
								const exerciseValue = that.list.find(element => element.title == listTitle)
								if (exerciseValue && exerciseValue.value == '基本不运动') {
									exercise = true
								}
							} else if (exercise) {
								itemExercise = newList[i].exercise === '1'
							}
							if (falg && titleIndex == -1 && !itemExercise) {
								let activeValue = list.find(element => element.title == listTitle)
								if (activeValue) {
									activeValue = activeValue.value
								} else {
									activeValue = ''
								}
								newList[i].value = activeValue
								newActiveList.push(newList[i])
							}
						}
						that.list = JSON.parse(JSON.stringify(newActiveList))
					}
					
					that.setShowContent ('add')
					// console.log('下一步', that.index)
					// console.log('结果：', that.list[that.index])
				}
			},
			goHomeUni (msg) {
				const that = this
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		},
		mounted() {
			this.list = JSON.parse(JSON.stringify(this.data))
			this.newList = JSON.parse(JSON.stringify(this.data))
			this.setShowContent()
			this.setDefault()
		}
	}
</script>
<style lang="scss" scoped>
	.examination {
		width: 100%;
		height: 100%;
		padding-bottom: 22%;
		box-sizing: border-box;
	}
	.progress {
		width: 90%;
		margin: 0 auto;
		padding: 10rpx 0;
		.count-box {
			text-align: right;
			color: $default-color;
			font-size: $uni-font-size-base;
			.count {
				font-size: $uni-font-size-lg;
				color: $primary-color;
			}
		}
		.percentage {
			width: 100%;
			padding: 10rpx 0;
		}
	}
	.title, .remark {
		color: #333333;
		font-size: 40rpx;
		text-align: center;
		font-weight: bold;
		padding: 90rpx 0 30rpx;
	}
	.remark {
		font-size: 30rpx;
		font-weight: 400;
		padding: 10rpx 0;
	}
	.desc {
		color: #999999;
		font-size: 26rpx;
		text-align: center;
		margin-bottom: 40rpx;
	}
	.reminder, .bottom-content {
		width: 90%;
		margin: 10rpx auto;
		text-align: center;
		color: #333333;
		font-size: 40rpx;
	}
	.bottom-content {
		font-size: 22rpx;
		color: #999999;
		// text-align: left;
	}
	.gapFilling {
		width: 90%;
		margin: 36rpx auto;
		.itemLabel {
			padding: 30rpx 40rpx;
			border-radius: 20rpx;
			background: #fff;
			box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
			margin-bottom: 30rpx;
		}
		.itemtext {
			color: #999999;
		}
		.gapFillingInput {
			width: 100%;
			text-align: center;
			background: #fff;
			border-radius: 10px;
			height: 50px;
			line-height: 50px;
			-moz-box-shadow:0px 0px 7px #ddd;
			-webkit-box-shadow:0px 0px 7px #ddd;
			box-shadow:0px 0px 7px #ddd;
		}
	}
	.bottom-btn {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		padding: 0 5% 8%;
		background: #f5f7f9;
		box-sizing: border-box;
	}
	.itemView {
		width: 100%;
		margin-bottom: 20px;
		.viewBox {
			width: 100%;
			position: relative;
			height: 0;
			padding-bottom: 100%;
			.itemBtn {
				position: absolute;
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
				align-items: center;
				background: #fff;
				border-radius: 10px;
				overflow: hidden;
				-moz-box-shadow:0px 0px 7px #ddd;
				-webkit-box-shadow:0px 0px 7px #ddd;
				box-shadow:0px 0px 7px #ddd;
				.iconfont {
					font-size: 34px;
					color: #666666;
				}
			}
			.activeItemBtn {
				background: #08CFC0;
				.iconfont {
					color: #fff;
				}
			}
		}
		.view-p {
			width: 100%;
			height: 28px;
			line-height: 28px;
			margin-top: 5rpx;
			text-align: center;
			font-size: 26rpx;
			color: #666666;
		}
	}
	.nextStep {
		margin: 20rpx auto;
		text-align: center;
	}
	.mskview {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		// background: rgba(0,0,0,0.5);
	}
</style>