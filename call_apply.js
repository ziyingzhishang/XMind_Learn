function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b ;
}

var res = add.call(sub, 3,1);
console.log(res);

