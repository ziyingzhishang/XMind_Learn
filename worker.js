var worker = new Worker("test_worker.js");
worker.postMessage("test data");

worker.onerror = function(e) {

}

worker.onmessage = function(e) {
    console.log(e.data);
    
}