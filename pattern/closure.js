// 弄清楚闭包的概念
// 闭包指的是有权访问另一个函数作用域中的变量的函数
function compare(propertyName) {
    return function(obj) {
        var x = obj[propertyName];

    }
}

/* 
    当某个函数被调用时：
    1. 创建一个执行环境以及相应的作用域链 ；
    2. 使用arguments 和其他参数的值来初始化函数的活动对象；

    全局环境的变量对象始终存在，
*/


// 闭包可能会引起内存泄漏, 
function assigneHander() {
    var element = document.getElementById("id");
    element.click = function() {
        alert(element.id);
    }
}

// 改进, 消除循环引用
function assigneHander() {
    var element = document.getElementById('id');
    var id = element.id;
    element.click = function() {
        alert(id);
    }
    element = null;
}