

/*
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-03-17 09:13:53
 */
// js文件头部注释之后的内容
import Vue from 'vue'
import App from './app.vue'


let root = document.createElement('div');
document.body.appendChild(root);


new Vue({
	render: (h)=> h(App)
}).$mount(root)
