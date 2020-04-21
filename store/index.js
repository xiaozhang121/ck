import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from 'pages/common/util';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		MonitorVersion: true, // 版本是否监测完毕
		hasLogin: false,
		systemInfo: uni.getSystemInfoSync(), // 获取系统信
		statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'], // 获取机型的高度
		userInfo: {},
		/* 购物车信息 */
		shoppingCart: {
			mall: [], // 商城购物车
			restaurant: {} // 餐厅购物车【餐厅id为key，value为数据】
		},
		imgURL: 'https://mega-wxapp.oss-cn-shanghai.aliyuncs.com/'
	},
	mutations: {
		/* 登录 */
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		/* 退出登录 */
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
		/* 
			@desc 设置购物车
			@param {Number} param.type 购物车类型: 0. 餐厅购物车  1.商城购物车
		    @param {Array} param.goodsList 购物车商品数组
		    @param {String} param.restaurantId 餐厅id
		    @param {String} param.cartStorageKey 设置缓存的key名称
		*/
		setShoppingCart ({ state, commit }, {type = 1, goodsList = [],cartStorageKey = 'shoppingCart'}) {
			return new Promise((resolve, reject) => {
				let shoppingCart = JSON.parse(getStorage(cartStorageKey) || null);
				if (!shoppingCart) {
					shoppingCart = {
						mall: [],
						restaurant: {}
					}
				}
				/* 餐厅购物车 */
				if (type == 0) {
					if (restaurantId) {
						shoppingCart.restaurant[restaurantId] = goodsList;
					}
					console.log('餐厅')
				}	else if (type == 1) { /* 商城购物车 */
					shoppingCart.mall = goodsList;
					console.log('商城:', goodsList)
				}
				/* 放入到本地数据中 */
				state.shoppingCart = shoppingCart;
				// 存储到storage
				setStorage(cartStorageKey, JSON.stringify(shoppingCart));
				resolve(shoppingCart)
			})
		},
		/**
		    @desc 读取购物车
		    @param {Number} param.type 购物车类型: 0. 餐厅购物车  1.商城购物车
		    @param {Array} param.goodsList 购物车商品数组
		    @param {String} param.restaurantId 餐厅id
		    @param {String} param.cartStorageKey 设置缓存的key名称
		*/
		getShoppingCart({ state, commit }, { type = 1, restaurantId, cartStorageKey = 'shoppingCart' }) {
			return new Promise((resolve, reject) => {
				let shoppingCart = JSON.parse(getStorage(cartStorageKey) || null)
				if (!shoppingCart) {
					resolve([])
				} else {
					/* 放入到本地数据中 */
					state.shoppingCart = shoppingCart;
					/* 处理购物车数据 */
					if (type == 0) { /* 餐厅购物车*/
						if (!restaurantId) {
							reject(`"restaurantId" can not be ${restaurantId}`)
						} else {
							let data = shoppingCart.restaurant.hasOwnProperty(restaurantId)
										? shoppingCart.restaurant[restaurantId]
										: []
							resolve(data)
						}
					} else if (type == 1) { /* 商城购物车 */
						let data = shoppingCart.mall || []
						resolve(data)
					}
				}
			})
		}
	}
})

export default store
