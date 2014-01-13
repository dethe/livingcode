// Initialize Raphael based on the div with id="veve"
var paper = Raphael("veve", 500, 500);

// Initialize a list of 8 directions to re-use
var dA = Math.PI / 4;
var directions = [];
for (var a = 0; a < 8; a++){
    directions.push(dA * a);
}

var LINE_MULT = 20;
var RADIUS_MULT = 15;

function removeItem(list, item){
    list.splice(list.indexOf(item), 1);
}

function random(a,b){
    // 'Returns an integer between a and b, inclusive';
    // 'If b is not specified, returns an integer between 0 and a';
    if (b === undefined){
        b = a;
        a = 0;
    }
    return Math.floor(Math.random() * (b-a + 1)) + a;
}

function choice(list){
    // This is an exclusive, or mutating choice that
    // picks a random item from a list and removes that
    // item before returning it
    var idx = random(0, list.length - 1);
    var item = list[idx];
    list.splice(idx, 1); // remove item from list
    return item;
}


function start(centre_pt, direction, radius){
    // Find starting point outside of the circle
    return {
        x: centre_pt.x + Math.cos(direction) * radius,
        y: centre_pt.y + Math.sin(direction) * radius
    };
}

function end(start_pt, direction, units){
    // Find end point just outside next circle
    return {
        x: start_pt.x + Math.cos(direction) * (units * LINE_MULT),
        y: start_pt.y + Math.sin(direction) * (units * LINE_MULT)
    };
}

function next(end_pt, direction, radius){
    // Find point in center of next circle
    return {
        x: end_pt.x + Math.cos(direction) * radius,
        y: end_pt.y + Math.sin(direction) * radius
    };
}

function line(pt1, pt2){
    // Draw a line and style it
    var l = paper.path('M' + pt1.x + ' ' + pt1.y + 'L' + pt2.x + ' ' + pt2.y);
    l.attr({'stroke-width': random(1,4), 'stroke': 'rgba(0,0,0,30)'});
}

function veve(centre_pt, n, return_path){
    var i, radius, dirs, direction, start_pt, end_pt;
    radius = n * RADIUS_MULT;
    concentric(centre_pt, radius, n+2);
    if (n < 2) return;
    dirs = directions.slice(); // make a local copy
    // Don't go back the way we came
    removeItem(dirs, (return_path + 4) % 8);
    for (i = 0; i < n; i++){
        direction = choice(dirs);
        start_pt = start(centre_pt, direction, radius);
        end_pt = end(start_pt, direction, n);
        line(start_pt, end_pt);
        veve(next(end_pt, direction, (n-1) * RADIUS_MULT), n-1, direction);
    }
}

function concentric(centre_pt, radius, count){
    var c, i;
    for (i = 0; i < count; i++){
        c = paper.circle(centre_pt.x, centre_pt.y, radius);
        c.attr({'stroke-width': random(1,4), 'stroke': 'rgba(0,0,0,30)'});
        radius -= random(3,10);
        if (radius < 1) break;
    }
}

veve({x: 250, y: 250}, 3, -1);