// 递归的正确使用姿势

function factorial(num) {
    if (num <= 1)
        return 1;
    else
        return num * factorial(num - 1);
}
//若在执行过程中修改factorial的指向，将导致程序出问题；


function factorial1(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}

//arguments.callee指向一个正在执行的函数指针，但在严格模式下无法正常访问arguments.callee,因此还有另一种方式
var factorial = (function f(num) {
    if(num <= 1)
        return 1;
    else 
        return num * f(num - 1);
});

/* 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存，要慎重使用闭包。 */

// 在闭包环境中要谨慎使用this关键字，this是在运行时基于函数的执行环境绑定的，匿名函数的执行环境有全局性。
var name = "this is window";
var obj = {
    name: "obj",
    getName: function() {
        return function() {
            return this.name;
        };
    }
}
obj.getName()();    //this is window; 