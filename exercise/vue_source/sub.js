/*
 * @Description: This is a javascript file  demo 无用的实例代码
 * @Author: JeanneWu
 * @Date: 2020-02-23 21:41:12
 */

function Dep(){
    this.subs = [];
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}

Dep.prototype.notify = function (){
    this.subs.forEach(sub => sub.update());
}

function Watch (fn) {
    this.fn = fn;
}

Watch.prototype.update = function () {
    this.fn();
}

let watcher = new Watch(_ => console.log(1));

let dep = new Dep();
dep.addSub(watcher);
dep.addSub(watcher);

console.log(dep.subs);
dep.notify();

