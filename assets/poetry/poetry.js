// query string parser from javascript.faqts.com
function parseQueryString (str) {
  str = str ? str : location.search;
  var query = str.charAt(0) == '?' ? str.substring(1) : str;
  var args = new Object();
  if (query) {
    var fields = query.split('&');
    for (var f = 0; f < fields.length; f++) {
      var field = fields[f].split('=');
      args[unescape(field[0].replace(/\+/g, ' '))] = 
unescape(field[1].replace(/\+/g, ' '));
    }
  }
  return args;
}

function getWords(){
  args = parseQueryString();
  var words = args.words;
  if (!words){
    words = "please enter a search string/so I can find your words";
  }else{
    
  }
  var lines = words.split('/');
  var wordlist = new Array();
  for (var i = 0; i < lines.length; i++){
    var linewords = lines[i].split(" ");
    for (var j = 0; j < linewords.length; j++){
      var word = $.trim(linewords[j]);
      if (!word) continue;
      linewords[j] = '<span class="word">' + linewords[j] + '</span>';
    }
    wordlist.push('<p class="line">' + linewords.join('') + '</p>');
  }
  return wordlist.join('');
}

$.fn.extend({
    fix_position: function(){
        // fix for Webkit dragging of inline elements
        this.each(function(idx){
            var self = $(this);
            var pos = self.position();
            console.log('setting %dth to position: %o', idx, pos);
            self.css({top: pos.top, left: pos.left});
        });
        this.css('position', 'absolute');
        return this;
    }
});

$(function(){
    $('#magnetic_poem').html(getWords())
        .height(function(idx,val){return val;}); // fix the height
    $('span.word').fix_position().draggable({
        containment: $('#magnetic_poem')
    });
});
