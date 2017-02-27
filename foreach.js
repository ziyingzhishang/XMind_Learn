Array.prototype.for = function(callback) {
    if(typeof callback !== "function") 
        return ;
    var len = this.length;
    for(var i = 0; i < len ; i ++) {
        callback(this[i]);
    }
}

var a = [1,2,3];

a.for(function(i) {
    console.log(i);
});

