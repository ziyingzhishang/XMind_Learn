/**
 * 1. 为body中的元素添加拖拽；
 * 2. 绘制svg；
 * 3. 设置公式编辑；
 * 4. 将生成的svg加入到原来的svg节点中；
 * ----------------------------------、
 * 1. 设置css ，在svg元素上进行公式编辑；
 * 2. 结合mathquill进行公式编辑；
 * 3. 模拟动态插入公式topic节点；
 * 4. svg的定位问题（使用transform 解决： transform）
 */

var rDrag = {

    o: null,

    init: function (o) {
        o.onmousedown = this.start;
        o.onkeydown = this.zoom;
        o.oldScale = 1.0;
    },
    start: function (e) {
        var o;
        e = rDrag.fixEvent(e);
        e.preventDefault && e.preventDefault();
        rDrag.o = o = this;
        o.x = e.clientX - rDrag.o.offsetLeft;
        o.y = e.clientY - rDrag.o.offsetTop;
        document.onmousemove = rDrag.move;
        document.onmouseup = rDrag.end;
    },
    zoom: function (e) {
        var o;
        e = rDrag.fixEvent(e);
        // e.preventDefault && e.preventDefault();
        rDrag.o = o = this;
        o.oldScale = rDrag.o.oldScale;
        o.bCtrlKey = e.ctrlKey;
        switch (e.keyCode) {
            case 38:
                rDrag.zoomin(e);
                break;
            case 40:
                rDrag.zoomout(e);
                break;
        }
    },
    zoomin: function (e) {
        if (!rDrag.o.bCtrlKey)
            return;
        rDrag.o.oldScale = rDrag.o.oldScale + 0.1;
        rDrag.o.style.transform = 'scale(' + (rDrag.o.oldScale) + ')';
    },
    zoomout: function (e) {
        if (!rDrag.o.bCtrlKey)
            return;
        rDrag.o.oldScale = rDrag.o.oldScale - 0.1;
        rDrag.o.style.transform = 'scale(' + (rDrag.o.oldScale) + ')';

    },
    move: function (e) {
        e = rDrag.fixEvent(e);
        var oLeft, oTop;
        oLeft = e.clientX - rDrag.o.x;
        oTop = e.clientY - rDrag.o.y;
        rDrag.o.style.left = oLeft + 'px';
        rDrag.o.style.top = oTop + 'px';
    },
    end: function (e) {
        e = rDrag.fixEvent(e);
        rDrag.o = document.onmousemove = document.onmouseup = null;
    },
    fixEvent: function (e) {
        if (!e) {
            e = window.event;
            e.target = e.srcElement;
            e.layerX = e.offsetX;
            e.layerY = e.offsetY;
        }
        return e;
    }
}

var wmargin = 10, hmargin = 5;
var group, draw, pNode;
window.onload = function() {
    var mathSpan = document.getElementById("body");
    var w = mathSpan.offsetWidth, h = mathSpan.offsetHeight;

    var body = document.getElementById("body");
    var outw = body.offsetWidth, outh = body.offsetHeight;

    draw = SVG('svg').size(outw, outh);
    rect = draw.rect(10, 10).attr({ fill: "lightblue", stroke: "black" });
    group = draw.group();
    pNode = group.node;
    pNode.setAttribute("transform","translate("+wmargin+","+hmargin+")");
    var centerdiv = document.getElementById('svg');
    rDrag.init(centerdiv);

    var problemSpan = document.getElementById('problem');
    draw.node.ondblclick = function() {
        //显示problemSpan
        problemSpan.style.visibility = "";
        problemSpan.focus();
    }
    problemSpan.onmouseleave = renderSvg;
    
    function renderSvg() {
        // 失去焦点之后，将svg渲染到图中；
        problemSpan.style.visibility = "hidden";
        Preview.Update();
    }

    // var math = MQ.StaticMath(problemSpan);
    var proMathField = MQ.MathField(problemSpan, {
        handlers: {
            edit: function () {
                // var enteredMath = proMathField.latex(); // Get entered math in LaTeX format
                // var w = problemSpan.offsetWidth, h = problemSpan.offsetHeight;
                // // checkAnswer(enteredMath);
                // document.getElementById("MathInput").value = '$'+enteredMath+'$'
                // Preview.Update();
                cacheLatex();
                // resizeSvg(rect, w, h);
            }
        }
    });
    function cacheLatex() {
        var enteredMath = proMathField.latex(); // Get entered math in LaTeX format
        var w = problemSpan.offsetWidth, h = problemSpan.offsetHeight;
        // checkAnswer(enteredMath);
        document.getElementById("MathInput").value = '$'+enteredMath+'$'
        // Preview.Update();
    }

    cacheLatex();
}

function resizeSvg(target, w = 0, h = 0) {
    if (w != 0)
        target.width(w + 2 * wmargin);
    if (h != 0)
        target.height(h + 2 * hmargin);
}



var Preview = {
  delay: 150,        // delay after keystroke before updating

  preview: null,     // filled in by Init below
  buffer: null,      // filled in by Init below

  timeout: null,     // store setTimout id
  mjRunning: false,  // true when MathJax is processing
  mjPending: false,  // true when a typeset has been queued
  oldText: null,     // used to check if an update is needed

  //
  //  Get the preview and buffer DIV's
  //
  Init: function () {
    this.preview = document.getElementById("MathPreview");
    this.buffer = document.getElementById("MathBuffer");
  },

  //
  //  Switch the buffer and preview, and display the right one.
  //  (We use visibility:hidden rather than display:none since
  //  the results of running MathJax are more accurate that way.)
  //
  SwapBuffers: function () {
    var buffer = this.preview, preview = this.buffer;
    this.buffer = buffer; this.preview = preview;
    buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
    preview.style.position = ""; preview.style.visibility = "";

    var e = preview.getElementsByTagName("svg");
    var image;
    if(e.length != 0){
      var old = pNode.getElementsByTagName('svg')
      if(old.length === 1){
        pNode.removeChild(old[0]);
      }
    //   e[0].y = hmargin;
      var w = e[0].getBoundingClientRect().width, h = e[0].getBoundingClientRect().height;
      pNode.appendChild(e[0]);
      resizeSvg(rect, w, h);
    }
  },

  //
  //  This gets called when a key is pressed in the textarea.
  //  We check if there is already a pending update and clear it if so.
  //  Then set up an update to occur after a small delay (so if more keys
  //    are pressed, the update won't occur until after there has been 
  //    a pause in the typing).
  //  The callback function is set up below, after the Preview object is set up.
  //
  Update: function () {
    if (this.timeout) {clearTimeout(this.timeout)}
    this.timeout = setTimeout(this.callback,this.delay);
  },

  //
  //  Creates the preview and runs MathJax on it.
  //  If MathJax is already trying to render the code, return
  //  If the text hasn't changed, return
  //  Otherwise, indicate that MathJax is running, and start the
  //    typesetting.  After it is done, call PreviewDone.
  //  
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
        ["Typeset",MathJax.Hub,this.buffer],
        ["PreviewDone",this]
      );
    }
  },

  //
  //  Indicate that MathJax is no longer running,
  //  and swap the buffers to show the results.
  //
  PreviewDone: function () {
    this.mjRunning = this.mjPending = false;
    this.SwapBuffers();
  }

};

//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;  // make sure it can run more than once
