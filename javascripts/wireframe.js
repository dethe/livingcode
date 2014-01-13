//
//  Wireframe.js
//
//  Bookmarklet hosted at http://livingcode.org/javascripts/
//  Copyright 2010 Dethe Elza
//  MIT-licensed
//
// Requires jQuery (bookmarklet will take care of this)

(function($){
    $('*').each(function(){
        var self = $(this);
        self.css({backgroundColor: 'white', color: 'black'});
        if (self.css('display') == 'block'){
            self.css({outline: 'black solid 1px'});
            self.attr('title', this.tagName + '#' + this.id + '.' + this.className);
            if (self.css('background-image') != ''){
                self.css('background-image', 'none');
                //self.css('background-color', 'cyan'});
            }
        }else if(self.css('display') == 'inline' || self.css('display') == 'relative'){
            self.css({border: 0});
            if (self.css('background-image') != ''){
                self.css('background-image', 'none');
                //self.css('background-color', 'darkorange');
            }
        }
        if (this.tagName == 'IMG'){
            self.width(self.width());
            self.height(self.height());
            self.attr('src', 'http://livingcode.org/images/wireframe_image.png');
        }else if (this.tagName == 'A'){
            self.css({'color': 'blue', 'text-decoration': 'underline'});
        }
    });
})(jQuery);
