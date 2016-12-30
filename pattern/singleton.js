// js中的单例, 单例都是作为全局对象存在的
var sigleton = function() {
    var privateVar = 10;
    function privateFunction() {

    }

    return {
        publicProperty: true,
        publicMethod: function() {
            privateVar ++;
            return privateFunction();
        }
    }
}


// 单例的增强模式，适用于单例必须是某种对象的实例
var sigleton = function() {
    var privateVar = 10;
    function privateFunction(){

    }

    var obj = new NewObjectType();
    obj.publicProperty = true;
    obj.publicMethod = function() {
        privateVar ++;
        return privateFunction();
    }

    return obj;
}
