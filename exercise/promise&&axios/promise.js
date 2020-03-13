

/*
 * @Description: 关于axios的封装
 * @Author: JeanneWu
 * @Date: 2020-03-13 16:50:44
 */
// js文件头部注释之后的内容

function pajax({
    url= null,
	method = 'GET',
	dataType = 'JSON',
	async = true}){
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest()
		xhr.open(method, url, async)
		xhr.responseType = dataType
		xhr.onreadystatechange = () => {
			if(!/^[23]\d{2}$/.test(xhr.status)) return
			if(xhr.readyState === 4) {
				let result = xhr.responseText
				resolve(result)
			}
		}
		xhr.onerror = (err) => {
            console.log(err)
			reject(err)
		}
		xhr.send()
	})
}

pajax({
    url:'test.json',
    method: 'get'
}).then((result)=>{
    console.log(result)
},(err)=>{

})
