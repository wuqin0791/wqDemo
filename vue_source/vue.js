/*
 * @Description: This is a javascript file
 * @Author: JeanneWu
 * @Date: 2020-02-23 09:02:22
 */

function Vue(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    console.log(data);
    observe(data);
    // 这一部分实现了数据代理
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
    }
    initComputed.call(this);
    new Compile(options.el, this);
    
};
function initComputed(){
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach(key => {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] == 'function' ? computed[key]: computed[key].get,
            set(){

            }
        });
    });
}
/**
 * @description:  编译，把数据放到内存中（createDocumentFragment）
 * @param {type} 
 * @return: 
 */
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    };
    replace(fragment);

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let content = node.textContent;
            let regExp = /\{\{(.*)\}\}/;
            if (node.nodeType == 1){
                let nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    let name = attr.name;
                    let exp = attr.value;
                    if(name.indexOf('v-') == 0){
                        node.value = vm[exp];
                    }
                    new Watch(vm, exp, newVal => {
                        node.value = newVal;
                    });
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                    })
                });
            };
            if (+node.nodeType === 3 && regExp.test(content)) { //文本
                let regExpGroup1 = RegExp.$1;
                let arr = regExpGroup1.split('.');
                let val = vm;
                arr.forEach(k => { //取到this.a.a
                    val = val[k];
                });
                
                // replace
                new Watch(vm, regExpGroup1, newVal => {
                    node.textContent = content.replace(regExp, newVal);
                });
                node.textContent = content.replace(regExp, val);
            }
            if (node.childNodes) {
                replace(node);
            }
        });

    }

    vm.$el.appendChild(fragment);
};

function observe(data) {
    new Observe(data)
};

function Observe(data) {
    // 类型判断，防止溢出
    console.log(data,999);
    if (Object.prototype.toString.call(data) !== "[object Object]") return;
      
    let dep;
    for (let key in data) {
        dep = new Dep();
        let val = data[key];
        // 通过defineProperty的方式去定义属性
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                observe(val);
                dep.notify();
            }
        })
    }

}

function avoidExceed(data) {
    if (Object.prototype.toString.call(data) !== "[object Object]") return;
}

// 发布订阅
function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}

Dep.prototype.notify = function () {
    this.subs.forEach(sub => sub.update());
}

function Watch(vm, regExp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.regExp = regExp;
    
    Dep.target = this;
    let val = vm;
    let arr = regExp.split('.');
    arr.forEach(k => {
        val = val[k];
    });

    Dep.target = null;
}

Watch.prototype.update = function () {
    let val = this.vm;
    let arr = this.regExp.split('.');
    arr.forEach(k => {
        val = val[k];
    })
    this.fn(val);
}