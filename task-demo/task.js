
var runing  =  false;
var s = {
    addTasks: function(data) {
        console.log(data+"=====")
    },
    
    test: (function(){
        var tasks = [];
        var self = this;
        console.log("test function --------");
        return function(data) {
            tasks.push({
                addTasks:this.addTasks, 
                data : data
            });
            if(!runing) 
                return ;
             
            while(tasks.length > 0) {
                var task = tasks.pop();
                task.addTasks(task.data);
            }
        }
    }())
}

window.onload = function() {
    runing = false;
    for(var i = 0; i < 10; i ++){
        if(i == 9)
            runing = true;
        s.test(i);
    }

}

