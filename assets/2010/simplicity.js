(function() {
    var x1=75, x2=250, x3=425;
    var y1=75, y2=175, y3=375, y4=475, y5=575, y6=675, y7=850;
    var kether={x: x2, y: y1},
        chokmah={x: x3, y: y2},
        binah={x: x1, y: y2},
        chesed={x: x3, y: y3},
        geburah={x: x1, y: y3},
        tifereth={x: x2, y: y4},
        netsach={x: x3, y: y5},
        hod={x: x1, y: y5},
        yesod={x: x2, y: y6},
        malkuth={x: x2, y: y7};
    var sephiroths = [kether, chokmah, binah, chesed, geburah,
           tifereth, netsach, hod, yesod, malkuth];
    var laws = ['The One', 'Failure', 'Learn', 'Emotion', 'Context',
            'Differences', 'Time', 'Organize', 'Reduce', 'Trust'];
    var law_flavours = [
        "Simplicity is about subtracting the obvious, and adding the meaningful",
        "Some things can never be made simple",
        "Knowledge makes everything simpler",
        "More emotions are better than less",
        "What lies in the periphery of simplicity is deﬁnitely not peripheral",
        "Simplicity and complexity need each other",
        "Savings in time feel like simplicity",
        "Organization makes a system of many appear fewer",
        "The simplest way to achieve simplicity is through thoughtful reduction",
        "In simplicity we trust."
    ];
    var rules = [ 
        'Piranha Parallelism', 
        'Espalier', 
        'A Deep Picture that is also a Live Picture', 
        'Not Separateness', 
        'Alternating Repetition', 
        'Roughness', 
        'Recursive Simplicity',
        'Levels of Scale', 
        'Strong Centres', 
        'Thick Boundaries',
        'Experience', 
        'Positive Space', 
        'Good Shape',
        'Local Symmetries', 
        'Echoes', 
        'Contrast', 
        'Gradients', 
        'Uncoupling', 
        'Deep Interlock and Ambiguity', 
        'The Void',
        'Simplicity and Inner Calm', 
        'Agents' 
    ];
    var angles = [32, -32, 90, 0, -60, 90, 60, 90, 0, -30, 90, 30, 90, 30, -30, 0, 90, -30, -60, 30, 60, 90]; 
    var aleph=[kether, chokmah],
        beth=[kether, binah],
        gimel=[kether, tifereth],
        daleth=[chokmah, binah],
        heh=[chokmah, tifereth],
        vav=[chokmah, chesed],
        zayin=[binah, tifereth],
        cheth=[binah, geburah],
        teth=[chesed, geburah],
        yod=[chesed, tifereth],
        kaph=[chesed, netsach],
        lamed=[geburah, tifereth],
        mem=[geburah, hod],
        nun=[tifereth, netsach],
        samekh=[tifereth, yesod],
        ayin=[tifereth, hod],
        peh=[netsach, hod],
        tzaddi=[netsach, yesod],
        qoph=[netsach, malkuth],
        resh=[hod, yesod],
        shin=[hod, malkuth],
        tav=[yesod, malkuth];
    var paths = [aleph, beth, gimel, daleth, heh, vav, zayin,
            cheth, teth, yod, kaph, lamed, mem, nun,
            ayin, peh, samekh, tzaddi, qoph, resh, shin, tav];
    var r=50;
    var paper = Raphael('tree_of_simplicity', 500, 1000);
    var paths_vis = paper.set();
    var paths_text = paper.set();
    $.each(paths, function(idx, p){
        var pth = 'M' + p[0].x + ' ' + p[0].y + 'L' + p[1].x + ' ' + p[1].y;
        paper.path(pth).attr({stroke: 'black', 'stroke-width': 20});
        paths_vis.push(paper.path(pth));
        var center = {x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2};
        var text = paper.text(center.x, center.y, rules[idx]);
        text.rotate(angles[idx]);
        paths_text.push(text);
    });
    paths_vis.attr({
        stroke: '#FFCC33',
        'stroke-width': 18
    });
    paths_text[15].translate(50, 0);
    paths_text[2].attr({'font-size': 9});
    var seph_vis = paper.set();
    var seph_text = paper.set();
    $.each(sephiroths, function(idx, seph){
        var c = paper.circle(seph.x, seph.y, r);
        c.node.setAttribute('title', law_flavours[idx]);
        seph_vis.push(c);
        seph_text.push(paper.text(seph.x, seph.y, laws[idx]));
    });
    seph_vis.attr({
        stroke: 'black',
        'stroke-width': 10,
        fill: 'white'
    });
    seph_text.attr({
        'font-family': 'Helvetica',
        'font-size': 20
    });
    seph_text[5].attr({'font-size': 16});
    var left = paper.set();
    $.each([2,4,7], function(){left.push(seph_vis[this]);});
    var centre = paper.set();
    $.each([0,5,8,9], function(){centre.push(seph_vis[this]);});
    var right = paper.set();
    $.each([1,3,6], function(){right.push(seph_vis[this]);});
    left.attr({fill: 'green'});
    centre.attr({fill: 'blue'});
    right.attr({fill: 'red'});
    paper.text(x1, 925, 'Compression').attr({fill: 'green'});
    paper.text(x2, 925, 'Piecemeal Growth').attr({fill: 'blue'});
    paper.text(x3, 925, 'Habitability').attr({fill: 'red'});
})();