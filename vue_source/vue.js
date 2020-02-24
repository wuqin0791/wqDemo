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
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    };
    replace(fragment);

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let content = node.textContent;
            let regExp = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && regExp.test(content)) {
                let regExpGroup1 = RegExp.$1;
                let arr = regExpGroup1.split('.');
                let val = vm;
                arr.forEach(k => { //取到this.a.a
                    val = val[k];
                });
                // replace
                new Watch(vm, regExpGroup1, newVal => {
                    console.log(111);
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
    avoidExceed(data);
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
                if (newVal === val) return
                val = newVal;
                observe(newVal);
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