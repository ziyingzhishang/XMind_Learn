//1. 首先创建一个div,可以编辑math的div；
//2. 创建一个SVG 的rectagle；鼠标拖动，悬浮效果
//3. 将div，悬浮到svg上方；
//4. 让div始终随着svg的位置进行变化；

var mathSpan = document.getElementById('math');
var rect, svg = document.getElementById('svg');

var wmargin = 10, hmargin = 5;
var mousedown;
var pos = function (x, y) {
    return { x: x, y: y };
}
var oldmouse = new pos(0, 0),
    oldpos = new pos(0, 0),
    newpos = new pos(0, 0);



var answerMathField = MQ.MathField(mathSpan, {
    handlers: {
        edit: function () {
            var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
            var w = mathSpan.offsetWidth, h = mathSpan.offsetHeight;
            // checkAnswer(enteredMath);
            resizeSvg(rect, w, h);
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
function move(e) {
    if (mousedown) {
        newpos.x = e.clientX - oldmouse.x;
        newpos.y = e.clientY - oldmouse.y;

        mathSpan.style.left = newpos.x + wmargin;
        mathSpan.style.top = newpos.y + hmargin;
        svg.style.left = newpos.x;
        svg.style.top = newpos.y;
    }
}

function down(e) {
    if (!isLeftButton(e.button))
        return;
    // console.log(e.target);
    mousedown = true;
    oldmouse.x = e.clientX;
    oldmouse.y = e.clientY;

    oldpos.x = mathSpan.style.left;
    oldpos.y = mathSpan.style.top;
}

function up(e) {
    if (!isLeftButton(e.button))
        return;
    mousedown = false;
}

function over(e) {

}

function out(e) {
    up(e);
}

function blur(e) {
    mathSpan.style.border = "none";
}

function isLeftButton(btn) {
    if (btn == 0)
        return true;
    else
        return false;
}

function bind(dom) {
    dom.addEventListener("mouseover", over, false);
    dom.addEventListener("mouseout", out, false);
    dom.addEventListener("mouseenter", over, false);
    dom.addEventListener("blur", blur, false);
    dom.addEventListener("mousedown", down, false);
    dom.addEventListener("mouseup", up, false);
    dom.addEventListener("mousemove", move, false);
}

this.bind(mathSpan);
this.bind(svg);

window.onload = function () {
    var body = document.getElementById("body");
    var outw = body.offsetWidth, outh = body.offsetHeight;
    var draw = SVG('svg').size(outw, outh);
    var w = mathSpan.offsetWidth, h = mathSpan.offsetHeight;
    rect = draw.rect(w + 2 * wmargin, h + 2 * hmargin).attr({ fill: "lightblue", stroke: "black" });
}