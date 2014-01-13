// Extend the Global jQuery object
$.extend({
    count_keys: function(obj){
        var count = 0;
        $.each(obj, function(key,value){
            count++;
        });
        return count;
    },
    update_hash: function(){
        $.query.EMPTY();
        $('.scale').each(function(){
            var key_value = $(this).buzz_key_value();
            console.log('$.query.SET(%s, %d);', key_value[0], key_value[1]);
            $.query.SET(key_value[0], key_value[1]);
        });
        location.hash = $.query.toString();
    }
});

// Extend the jQuery results
$.fn.extend({
    buzzword: function(value){
        if (value === undefined){
            return this.find('.buzzword.a').text();
        }else{
            this.find('.buzzword.a').text(value);
            return this;
        }
    },
    alternate: function(value){
        if (value === undefined){
            return this.find('.buzzword.b').text();
        }else{
            this.find('.buzzword.b').text(value);
            return this;
        }
    },
    vex: function(){
        // return either text() or value()
        if (this.find('input').length){
            return this.find('input').val();
        }else{
            return this.text();
        }
    },
    buzz_key_value: function(){
        var str = [];
        this.find('.buzzword').each(function(){
            str.push($(this).vex());
        });
        return [str.join('/'), this.find('.slider').slider('value')];
    },
    edit_buzz: function(){
        this.find('.buzzword').html(function(index, html){
            return $('<input value="' + html + '" />');
        });
    },
    apply_edit_buzz: function(){
        this.find('.buzzword').each(function(){
            var self = $(this);
            var text = self.find('input').val();
            self.html(text);
        });
        $.update_hash();
    },
    add_eq_controls: function(selected){
        if (selected === undefined){
            selected = 7;
        }
        var controls = $('<div class="controls"></div>');
        controls.append('<label for="no_eq_ctls">How many controls:</label>');
        var select = $('<select id="no_eq_ctls"></select>');
        $.each([3,4,5,6,7,8,9,10,11,12], function(){
            if (this == selected){
                select.append('<option selected="selected">' + this + '</option>', {id: this});
            }else{
                select.append('<option>' + this + '</option>', {id: this});
            }
        });
        controls.append(select);
        select.change(function(){
            console.log('change the number of controls');
            var curr_sliders = $('.scale').length;
            var new_sliders = parseInt($('#no_eq_ctls').val(), 10);
            if (curr_sliders > new_sliders){ // delete the excess
                $('.scale:gt(' + (new_sliders - 1) + ')').remove();
            }else{ // create new sliders
                for (var i = curr_sliders; i < new_sliders; i++){
                    $('#equalizer').add_scale('Good', 'Bad', 0);
                }
            }
            $.update_hash();
        });
        controls.append('<button id="edit_eq_ctls">Edit Labels</button>');
        controls.find('button').toggle(
            function(){
                $(this).text('Done Editing');
                $('div.scale').edit_buzz();
            },
            function(){
                $(this).text('Edit Labels');
                $('div.scale').apply_edit_buzz();
            }
        );
        this.append(controls);
        return this;
    },
    add_scale: function(buzz,alternate,value){
        var scale = $('<div class="scale"></div>');
        scale.append('<div class="buzzword a">' + (buzz || 'Skateboard Shoes') + '</div>');
        scale.append('<div class="slider"></div>');
        scale.append('<div class="buzzword b">' + (alternate || '') + '</div>');
        this.append(scale);
        this.find('.slider').slider({
            max: 4,
            min: -4,
            orientation: 'vertical',
            stop: function(){
                $.update_hash();
            },
            value: value
        });
        return this;
    },
    equalizer: function(buzzwords){
        var self = this;
        this.add_eq_controls($.count_keys(buzzwords));
        $.each(buzzwords, function(words, value){
            var both = words.split('/');
            var buzz = both[0];
            var alt = both[1] || '';
            self.add_scale(buzz, alt, value);
        });
        return this;
    }
});

$(function(){
    var buzzwords;
    if (location.hash){
        buzzwords = $.query.get();
    }else{
        buzzwords = {'Good/Bad': 2, 'Open/Closed': -3, 'Fizz/Buzz': 0, 'Life/Death': 1, 'Reality/Fantasy': 4, 'Up/Down':-1, 'Utopia/Oblivion': 3};
    }
    $('#equalizer').equalizer(buzzwords);
});



