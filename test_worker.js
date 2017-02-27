//     var stack = [], 
//         allowed = ["push", "pop", "length"];
        
//     var handler =  {
//         get : function(recevier, name) {
//             console.log(name);
//             if(allowed.indexOf(name) > -1) {
//                 if(typeof stack[name] === "function") {
//                     return stack[name].bind(stack);
//                 }else {
//                     return stack[name];
//                 }
//             }else {
//                 return undefined;
//             }
//         },
//         set : function(target, value) {
//             console.log(target, value);
//         }
//     };

// var p = new Proxy(stack, handler);

// p.push("Hello NodeJs.");
// p.add = "sss";
var handler = {
    get : function(target , key , recevier) {
        if(! (key in target)) {
            target[key] = Tree();
        }
        return Reflect.get(target, key, recevier);          //只执行委托给目标的默认行为
    }
}
function Tree() {
    return new Proxy({}, handler);
}

var tree = Tree();
tree.b.b1 = "green";
tree.b.b2 = "red"
console.log(tree.b);