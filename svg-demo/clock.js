var clock;
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

    var hands = clock.appendChild(document.createElementNS(svgns,'g'));
    hands.style.cssText="stroke:black; "

}