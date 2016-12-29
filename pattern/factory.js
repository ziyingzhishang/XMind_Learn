//工厂模式，解决创建多个相似的对象的问题，未解决对象识别的问题；
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.profile = function() {        //函数也是对象，等价于o.profile = new Funtion();
        alert(o.toString());
    }
    return o;
}
var p = createPerson('a',20,'b');

// ------------------------------------------------
// 构造函数模式
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

    this.profile = function() {
        alert(this.toString());
    }
}

var p1 = new Person('b',21,'b');
p1 instanceof Person //true;  推荐使用的形式
p1 instanceof Object // true;

p1.contructor == Person; // true

// ------------------------------------------------
//原型模式，使得每个函数都有一个prototype属性
function Person() {}

Person.prototype.name = "";
Person.prototype.age = 12;
Person.prototype.saynam = function() {
    alert(this.toString());
}
// 在实例中创建和原型一样的属性会将原型中的对应属屏蔽掉；


/*  
    重写原型会切断构造函数与最初原型之间的联系，实例中的指针仅仅指向原型，而不是构造函数；
    切断现有原型与之前已有的所有实例之间的联系；
 */


/*  
    所以，一般来说，最常见的是构造模式和原型模式组合使用；
    * 构造模式用于定义实例属性，原型模式用于定义方法和共享属性；最大限度节省内存

 */
function Person(name, age , job) {
    this.name = name ;
    this.age = age;
    this.job = job;
    this.friends = {};
}

Person.prototype = {
    contructor: Preson,
    sayname: function() {
        alert(this.name);
    }
}

//动态原型，通过检查某个应该存在的方法是否有效，来决定是否要初始化原型；Perfect;
function Person(name , age , job){
    this.name = name ;
    this.age = age;
    this.job = job;
    if(typeof this.sayName != "function"){
        Person.prototype.sayName= function() {
            alert(this.name);
        }
    }
}

//-------------------------------
// 寄生模式, 返回的对象与构造函数和原型之间没有关系，
function SpcialArray() {
    var a = new Array();
    a.push.apply(a,arguments);
    a.tosplit = function() {
        return this.join("|");
    }
    return a;
}

var aa = new SpcialArray("a","b","c");  //a|b|c


