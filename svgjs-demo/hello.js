var draw = SVG('viewport')
var rect = draw.rect(100,100).animate().fill('#f03');
var group = draw.group();

var group1 = draw.group();

var group2 = draw.group();

group.add(group1,0);
group.add(group2,0);
var index = group.index(group2)

console.log(index);
// var viewbox = draw.viewbox(0,0,200,120);
// var zoom = viewbox.zoom;
