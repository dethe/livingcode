// Initialize Raphael based on the div with id="veve"

(function(){
var WIDTH = 500,
    HEIGHT = 500,
    paper = Raphael("glass", WIDTH, HEIGHT);

function removeItem(list, item){
    list.splice(list.indexOf(item), 1);
}

function random(a,b){
    // 'Returns an integer between a and b, inclusive';
    // 'If b is not specified, returns an integer between 0 and a'
    // 'If a and b are not specified, returns a float between 0 and 1
    if (a === undefined && b === undefined){
        return Math.random();
    }
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

function horizontal(){
    var x1,y1,x2,y2;
    y1 = random(0,HEIGHT);
    if (y1 === 0 || y1 === HEIGHT){
       x1 = random(0, WIDTH);
    }else{
       x1 = 0;
    }
    y2 = random(0, HEIGHT);
    if (y2 === 0 || y2 === HEIGHT){
       x2 = random(0, WIDTH);
    }else{
       x2 = WIDTH;
    }
    return [[x1, y1], [x2,y2]];
}

function vertical(){
    var x1, y1, x2, y2;
    x1 = random(0, WIDTH);
    if (x1 === 0 || x1 === WIDTH){
        y1 = random(0, HEIGHT);
    }else{
        y1 = 0;
    }
    x2 = random(0, WIDTH);
    if (x2 === 0 || x2 === WIDTH){
        y2 = random(0, HEIGHT);
    }else{
        y2 = HEIGHT;
    }
    return [[x1,y1], [x2,y2]];
}

function randomcolor(){
   return Raphael.getColor();
}

function quad(l1, l2){
    var p1 = l1[0], p2 = l1[1], 
        p3 = l2[1], p4 = l2[0];
    var pth = 'M' + p1[0] + ' ' + p1[1] +
        'L' + p2[0] + ' ' + p2[1] +
        'L' + p3[0] + ' ' + p3[1] +
        'L' + p4[0] + ' ' + p4[1] + 'Z';
    paper.path(pth).attr({
        fill: randomcolor(),
        'fill-opacity': 0.3,
        stroke: '#333',
        'stroke-width': 2
    });
}

function fillpage(){
    var i;
    var h = [];for(i=0;i<7;i++){h.push(horizontal());}
    var v = [];for(i=0;i<7;i++){v.push(vertical());}
    for (i = 1; i < 7; i++){
       quad([[0,0],[0,HEIGHT]],[[WIDTH,0],[WIDTH,HEIGHT]]);
       quad(h[i-1], h[i]);
       quad(v[i-1], v[i]);
    }
}

fillpage();

}());