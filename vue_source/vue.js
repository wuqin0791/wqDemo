/*
 * @Description: This is a javascript file
 * @Author: JeanneWu
 * @Date: 2020-02-23 09:02:22
 */

function Vue(options = {}) {
    // console.log(options);
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);
    // 这一部分实现了数据代理
    for(let key in data){
        Object.defineProperty(this, key, {
            enumerable: true,
            get(){
                return this._data[key];
            },
            set(newVal){
                this._data[key] = newVal;
            }
        });
    }
    new Compile(options.el, this);
};
/**
 * @description:  编译，把数据放到内存中（createDocumentFragment）
 * @param {type} 
 * @return: 
 */
function Compile(el, vm) {
    avoidExceed(vm);
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while(child = vm.$el.firstChild){
        fragment.appendChild(child);
    };
    replace(fragment);
    function replace(fragment){
        Array.from(fragment.childNodes).forEach(node => {
            let content = node.textContent;
            let regExp = /\{\{(.*)\}\}/;
            if(node.nodeType === 3 && regExp.test(content)){
                console.log(RegExp.$1);
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(k => { //取到this.a.a
                    val = val[k];
                })
                node.textContent = content.replace(regExp, val);
            }
            if (node.childNodes){
                replace(node);
            }
        });
       
    }
    
    vm.$el.appendChild(fragment);
};
function observe(data){
    new Observe(data)
};
function Observe(data){
    // 类型判断，防止溢出
    avoidExceed(data);
    for(let key in data){
        let val = data[key];
        // 通过defineProperty的方式去定义属性
        Object.defineProperty(data, key,{
            enumerable: true,
            get(){
                return val;
            },
            set(newVal){
                if (newVal === val) return
                val = newVal;
                observe(newVal);
            }
        })
    }
    
}

function avoidExceed(data){
    if (Object.prototype.toString.call(data) !== "[object Object]") return;
}