

/*
 * @Description: 用promise封装ajax
 * @Author: JeanneWu
 * @Date: 2020-05-18 08:28:58
 */ 
// js文件头部注释之后的内容
function promise(obj){
    alert(1);
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let result;
        xhr.open(obj.method, obj.url, true);
        xhr.onreadystatechange = function(){
            if(+xhr.readyState === 4){
                result = xhr.reponseText;
                resolve(result)
            }else {
                reject(reject)
            }
        }
        xhr.send();
    })

}

// export default promise;