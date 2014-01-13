//
//  javascript_selectors.js
//
//  Bookmarklet hosted at http://livingcode.org/javascripts/
//  Copyright 2010 Dethe Elza
//  MIT-licensed
//
// Requires jQuery (bookmarklet will take care of this)

(function($){
    var selectors_set = {};
    var used_selectors = [];
    var used_selector_counts = {};
    var unused_selectors = [];
    // define elementary report window
    var output = $('<div title="Element Counts"></div>').css({backgroundColor: '#CCF', width: 300});
    // find all selectors used
    $.each(document.styleSheets, function(idx, ss){
        $.each(ss.rules, function(idx, rule){
            if (selectors_set[rule.selectorText] === undefined){
                selectors_set[rule.selectorText] = 1;
            }
        });
    });
    // test all the selectors
    $.each(selectors_set, function(selector){
        var count = $(selector).length;
        if (count){
            used_selectors.push(selector);
            used_selector_counts[selector] = count;
        }else{
            unused_selectors.push(selector);
        }
    });
    // sort and report
    used_selectors.sort();
    unused_selectors.sort();
    output.append('<b>Matched selectors:</b><br/>');
    $.each(used_selectors, function(idx, selector){
        output.append('<span>' + selector + ' matches ' + used_selector_counts[selector] + ' elements</span><br />');
    });
    output.append('<br/><b>Unmatched selectors:</b><br/>');
    $.each(unused_selectors, function(idx, selector){
        output.append('<span>' + selector + '</span><br />');
    });
    output.dialog();
})(jQuery);
