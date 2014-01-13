//
//  count_element.js
//
//  Bookmarklet hosted at http://livingcode.org/javascripts/
//  Copyright 2010 Dethe Elza
//  MIT-licensed
//
// Requires jQuery (bookmarklet will take care of this)

(function($){
    var counts = {};
    var names = [];
    var output = $('<div title="Element Counts"></div>').css({backgroundColor: '#CCF', width: 300});;
    $('*').each(function(){
        var self = $(this);
        var name = this.tagName.toLowerCase();
        if (counts[name] === undefined){
            counts[name] = 0;
            names.push(name);
        }
        counts[name]++;
    });
    names.sort();
    $.each(names, function(){
        output.append('<span>' + this + ': ' + counts[this] + ' instances</span><br />');
    });
    output.dialog();
})(jQuery);
