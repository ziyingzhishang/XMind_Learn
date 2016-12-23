var clock;
var secPerMinutes = 60;
var secPerHour = 60*60;
var secPer12Hour = 60 * 60 * 12;

var hourHand , minute, seconds;

function init() {
    clock = document.getElementById('clock');
    var svgns = clock.namespaceURI, doc = document;

    clock.suspendRedraw(1000);

    var face = doc.createElementNS(svgns, "circle");
    face.cx.baseVal.value = 125;
    face.cy.baseVal.value = 125;
    face.r.baseVal.value = 100;
    face.style.cssText = "fill:white; stroke:black;";
    clock.appendChild(face);

    var ticks = clock.appendChild(doc.createElementNS(svgns, 'g'));
    ticks.setAttribute("transform", "translate(125,125)");

    var tickMark;
    for (var i = 1; i <= 12; i++) {
        tickMark = doc.createElementNS(svgns, "path");
        tickMark.setAttribute('d', "M95,0 L100,-5 L100,5 Z");
        tickMark.setAttribute('transform', "rotate(" + (30 * i) + ")")

        ticks.appendChild(tickMark);
    }

    var hands = clock.appendChild(doc.createElementNS(svgns,'g'));
    hands.style.cssText="stroke:black; stroke-width: 5px; stroke-linecap:round;";

    hourHand = hands.appendChild(doc.createElementNS(svgns, 'path'));
    hourHand.id = 'hour';
    hourHand.setAttribute('d', "M125,125 L125,75");
    hourHand.setAttribute('transform',"rotate(0,125,125)");
    hands.appendChild(hourHand);

    minute = hands.appendChild(doc.createElementNS(svgns,'path'));
    minute.id="minute";
    minute.setAttribute('d',"M125,125 L125 65");
    minute.setAttribute("transform", "rotate(0,125,125)");
    hands.appendChild(minute);

    seconds = hands.appendChild(doc.createElementNS(svgns, 'path'));
    seconds.id="seconds";
    seconds.setAttribute("d","M125, 125 L125, 55");
    seconds.setAttribute("transform", "rotate(0, 125,125)");
    hands.appendChild(seconds);
    secondsTransform = seconds.getAttribute('transform');

    var knob = doc.createElementNS(svgns, 'circle');
    knob.setAttribute("cx","125");
    knob.setAttribute("cy", "125");
    knob.setAttribute("r","6");
    clock.appendChild(knob);

    updateClock();
}

function updateClock() {

    var date = new Date();
    var time = date.getMilliseconds()/1000+
        date.getSeconds()+
        date.getMinutes()*60+
        date.getHours()*60*60;

    var s = (360/secPerMinutes)*(time%secPerHour),
        m = (360/secPerHour)*(time%secPerHour),
        h = (360/secPer12Hour)*(time%secPer12Hour);
    hourHand.setAttribute("transform","rotate("+h+",125,125)");
    minute.setAttribute("transform", "rotate("+m+",125,125)");
    seconds.setAttribute("transform","rotate("+s+", 125,125)");

    window.requestAnimationFrame(updateClock);
}