//jQuery function calls for the sticky notes
(function($) {
	
	//set up using defaults and passed options
	$.fn.stickynote = function(options) {
		var opts = $.extend({}, $.fn.stickynote.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			switch(o.event){
				case 'dblclick':
					$this.dblclick(function(e){$.fn.stickynote.createNote(o);})
					break;
				case 'click':
					$this.click(function(e){$.fn.stickynote.createNote(o);})
					break;
			}		
		});
	};
	//basic defaults for our objects
	$.fn.stickynote.defaults = {
		size 	: 'small',
		event	: 'click',
		ontop   : true,
		color	: 'yellow',
		containment  : 'content',
		top	: '40px',
		left	: '40px'
	};
	//create the actual stick note elements for on-screen
	$.fn.stickynote.createNote = function(o) {
		var _note_content = $(document.createElement('textarea'));
		var _div_note 	= 	$(document.createElement('div'))
							.addClass('jStickyNote')
							.css('cursor','move');
		//if we pass content text as an option, add it
		if(!o.text){
			_div_note.append(_note_content);
			var _div_create = $(document.createElement('div'))
		}

		//throw in a delete button
		var _div_delete = 	$(document.createElement('div'))
							.addClass('jSticky-delete');

		//set an event action on the delete button to allow us to throw away notes
		_div_delete.click(function(e){
			$(this).parent().remove();
		})
		
		//wrap it all up in a div and append the elements
		var _div_wrap 	= 	$(document.createElement('div'))
							.css({'position':'absolute','top':'40px','left':'40px'})
							.append(_div_note)
							.append(_div_delete)

		//set top if passed as an option
		if(o.top){
			_div_wrap.css('top', o.top);
		}

		//set left if passed as an option
		if(o.left){
			_div_wrap.css('left', o.left);	
		}

		//set color if passed as an option
		switch(o.color){
			case 'orange':
				_div_wrap.addClass('orange');
				break;
			case 'blue':
				_div_wrap.addClass('blue');
				break;
			case 'yellow':
				_div_wrap.addClass('yellow');
				break;
			case 'green':
				_div_wrap.addClass('green');
				break;
		}

		//set containment and configure for dragging around screen
		if(o.containment){
		        _div_wrap.draggable({ containment: '#'+o.containment , scroll: false ,start: function(event, ui) {
				if(o.ontop)
					$(this).parent().append($(this));
			}});	
		}	
		else{
			_div_wrap.draggable({ scroll: false ,start: function(event, ui) {
				if(o.ontop)
					$(this).parent().append($(this));
			}});	
		}
		//put the sticky note on the screen
		$('#content').append(_div_wrap);
	};
})(jQuery);