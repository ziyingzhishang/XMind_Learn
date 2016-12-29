/* 
    构造函数，原型，实例之间的关系，
    每一个构造函数都有一个原型对象，
    每一个原型都包含一个指向构造函数的指针，
    每一个实例都包含一个指向原型的内部指针
*/


// 实现继承的几种方式；
// 原型链继承


//借用构造函数, 很少使用
function SuperType() {

}

function SubType() {
    SuperType.call(this);
}


//组合继承，将原型链和构造函数组合在一起使用，最常用的继承模式,两次调用了超类构造函数
function SuperType(name) {
    this.name = name;
}

SuperType.prototype.sayName = function() {
    alert(this.name);
}

function SubType(name) {
    SuperType.call(this, this.name);    // 第二次
}

SubType.prototype = new SuperType();    // 第一次
SubType.prototype.constructor = SubType;


// 原型继承，没有严格意义上的构造函数
function object(o){
    function f() {}
    f.prototype = o;
    return new f();
}

var Person = {
    name : ""
}

var p1 = object(Person);



// 寄生式继承
function createObject(prigin) {
    var obj = object(origin);
    obj.sayName = function() {
        alert(this.name);
    }
    return obj;
}


// 寄生组合式，最理想的继承方式
function inheritObject(subObject,superObject) {

    var proto = object(superObject.prototype);  // 创建超类原型的副本
    proto.constructor = subObject;    // 指定超类原型的构造函数
    subObject.prototype = proto;      // 将新创建的副本指定为子类原型

}
