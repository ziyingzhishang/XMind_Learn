window.onload = function() {
    Preview.Init();

}

var Preview = {
    delay: 150,

    preview: null,
    buffer: null,

    timeout: null,     
    mjRunning: false, 
    mjPending: false,
    oldText: null, 

    Init: function() {
        this.buffer = document.getElementById("buffer");
        this.preview = document.getElementById("preview");
    },

    CreatePreview: function () {
        Preview.timeout = null;
        if (this.mjPending) return;
        var text = document.getElementById("MathInput").value;
        if (text === this.oldtext) return;

        if (this.mjRunning) {
            this.mjPending = true;
            MathJax.Hub.Queue(["CreatePreview",this]);
        } else {
            this.buffer.innerHTML = this.oldtext = text;
            this.mjRunning = true;
            MathJax.Hub.Queue(
                ["Typeset",MathJax.Hub, this.buffer],
                ["PreviewDone", this]
            );
        }
    },

    Update: function() {
        if (this.timeout) {clearTimeout(this.timeout)}
        this.timeout = setTimeout(this.callback,this.delay);
    },

    SwapBuffers: function () {
        var buffer = this.preview, preview = this.buffer;
        this.buffer = buffer; this.preview = preview;
        buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
        preview.style.position = ""; preview.style.visibility = "";
    },

    PreviewDone: function () {
        this.mjRunning = this.mjPending = false;
        this.SwapBuffers();
    }

}

Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;

// function show(msg) {
//     alert(msg);
// }
// var queue = MathJax.Callback.Queue();
// queue.Push(
//     [show, 1],
//     MathJax.Ajax.Require("index.js"),
//     [show, 2],
//     [show, 3]);
// queue.Push([show, 4]);

