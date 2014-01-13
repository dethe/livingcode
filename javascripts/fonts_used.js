//
//  fonts_used.js
//
//  Bookmarklet hosted at http://livingcode.org/javascripts/
//  Copyright 2010 Dethe Elza
//  MIT-licensed
//
// Requires jQuery (bookmarklet will take care of this)

(function($){
    function keys(obj){
        var k = [];
        $.each(obj, function(key, value){
            k.push(key);
        });
        return k;
    };
    $.fn.extend({
        hasText: function(){
            // only reports on first node in list
            var node = this[0];
            for (var i = 0; i < node.childNodes.length; i++){
                if (node.childNodes[i].nodeType == 3){ // Text Node
                    // check to make sure node contains text, not just white space
                    if ($.trim(node.childNodes[i].data)){
                        return true;
                    }   
                }
                if (this.eq(0).is(':input')){
                    return true;
                }
            }
            return false;
        },
        text_values: function(){
            var self = this;
            var values = [];
            var style = this[0].style;
            var css_names = [
                'font-family', 'font-size', 'font-weight',
                'font-style', 'font-variant', 'color',
                'line-height', 'letter-spacing', 'text-align',
                'text-decoration', 'text-indent', 'text-shadow',
                'text-transform', 'vertical-align', 'white-space',
                'word-spacing'
            ];
            var defaults = {
                'font-style': 'normal',
                'font-variant': 'normal',
                'font-weight': 'normal',
                'font-family': null,
                'font-size': null,
                'color': null,
                'line-height': 'normal',
                'letter-spacing': 'normal',
                'text-align': 'auto',
                'text-decoration': 'none',
                'text-indent': '0px',
                'text-shadow': 'none',
                'text-transform': 'none',
                'vertical-align': 'baseline',
                'white-space': 'normal',
                'word-spacing': '0px'
            };
            $.each(css_names, function(idx, name){
                var css_val = self.css(name);
                if (css_val != defaults[name]){
                    values.push(name + ': ' + css_val + ';');
                }
            });
            return values.join('\n');
        }
    });
    var text_nodes = $('body *').filter(function(){return $(this).hasText();});
    var text_unique = {};
    text_nodes.each(function(){
        var self = $(this);
        var val = self.text_values();
        var name = this.nodeName;
        if (this.id){
            name += '#' + this.id;
        }
        if (this.className){
            name += '.' + this.className.split(/\s/).join('.');
        }
        text_unique[val] = true;
        self.attr('title', name + '\n' + val);
    });
    var output = $('<div title="' + keys(text_unique).length + ' Text Formats Used"></div>').css({backgroundColor: '#CCF'});
    output.append('<h4>(hover text to see format)</h4>');
    $.each(text_unique, function(text){
        output.append('<p><pre>' + text + '</pre></p>');
    });
    output.dialog({width:600, buttons: {"OK": function() { $(this).dialog("close"); }}});
})(jQuery);
