import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

/* 通用提示 */
const showToast = (title, duration=1500, mask=false, icon='none') => {
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
/* 通用获取上一页实例 */
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$store = store;

Vue.prototype.$showToast = showToast;
Vue.prototype.$prePage = prePage;



const app = new Vue({
	...App
})
app.$mount()
