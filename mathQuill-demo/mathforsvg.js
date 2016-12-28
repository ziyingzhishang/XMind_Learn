//1. 首先创建一个div,可以编辑math的div；
//2. 创建一个SVG 的rectagle；鼠标拖动，悬浮效果
//3. 将div，悬浮到svg上方；
//4. 让div始终随着svg的位置进行变化；
//5. 实现渲染静态latx标签;
//6. 实现div放缩;

var mathSpan = document.getElementById('math'),
    svg = document.getElementById('svg'),
    centerdiv = document.getElementById('boundary');

var rect;
var wmargin = 10, hmargin = 5;

var answerMathField = MQ.MathField(mathSpan, {
    handlers: {
        edit: function () {
            var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
            var w = mathSpan.offsetWidth, h = mathSpan.offsetHeight;
            // checkAnswer(enteredMath);
            resizeSvg(rect, w, h);
            console.log(enteredMath);
        }
    }
});

function resizeSvg(target, w = 0, h = 0) {
    if (w != 0)
        target.width(w + 2 * wmargin);
    if (h != 0)
        target.height(h + 2 * hmargin);
}


//实现拖拽事件
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

window.onload = function () {
    var body = document.getElementById("body");
    var outw = body.offsetWidth, outh = body.offsetHeight;
    var draw = SVG('svg').size(outw, outh);
    var w = mathSpan.offsetWidth, h = mathSpan.offsetHeight;
    rect = draw.rect(w + 2 * wmargin, h + 2 * hmargin).attr({ fill: "lightblue", stroke: "black" });

    rDrag.init(centerdiv);    //初始化可拖拽的对象

    var problemSpan = document.getElementById('problem');
    // MQ.StaticMath(problemSpan);
    var proMathField = MQ.MathField(problemSpan, {
        handlers: {
            edit: function () {
                var enteredMath = proMathField.latex(); // Get entered math in LaTeX format
                var w = problemSpan.offsetWidth, h = problemSpan.offsetHeight;
                // checkAnswer(enteredMath);
                resizeSvg(rect1, w, h);
                // console.log(enteredMath);
            }
        }
    });

    var w1 = problemSpan.offsetWidth + 2 * wmargin; h1 = problemSpan.offsetHeight + 2 * hmargin;
    rect1 = draw.rect(w1, h1).attr({ fill: "lightblue", stroke: "gray" });
    rect1.move(100 - wmargin, 100 - hmargin);
}