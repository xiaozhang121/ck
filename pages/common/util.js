/* 获取storage */
export const getStorage = (name) => {
	let value = uni.getStorageSync(name);
	if (value) {
		value = JSON.parse(value)
	}
	return value
}
/* 设置storage */
export const setStorage = (name, data) => {
	data = JSON.stringify(data)
	uni.setStorage({
		key: name,
		data: data
	})
}
/* 删除storage */
export const removeStorage = (name) => {
	uni.removeStorage({
		key: name
	})
}
/* 通用请求 */
export const $http = ({ url, method, header, data, success: callback, fail: errorback }) => {
	method = method || 'get'
	header = header || {}
	data = data || {}
	header = {
		...header,
	}
	/* 显示提示框 */
	uni.showLoading({
		title: '加载中……',
		mask: true
	})
	uni.request({
		url,
		method,
		header,
		data,
		success(res) {
			if (res.errMsg !== 'request:ok') {
				uni.showToast({
					title: res.errMsg
				});
				return false
			}
			callback(res.data)
		},
		fail(res) {
			if (errorback) errorback(res)
		},
		complete(res) {
			uni.hideLoading()
			if (res.errMsg == 'request:faill') {
				uni.showToast({
					title: '网络错误',
					icon: 'none'
				});
			}
		}
	})
}
/* 生成uuid */
export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}