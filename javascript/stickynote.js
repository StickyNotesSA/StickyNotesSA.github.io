(function($) {
	
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
	$.fn.stickynote.defaults = {
		size 	: 'small',
		event	: 'click',
		ontop   : true,
		color	: 'yellow',
		containment  : 'content',
		top	: '40px',
		left	: '40px'
	};
	$.fn.stickynote.createNote = function(o) {
		var _note_content = $(document.createElement('textarea'));
		var _div_note 	= 	$(document.createElement('div'))
							.addClass('jStickyNote')
							.css('cursor','move');
		if(!o.text){
			_div_note.append(_note_content);
			var _div_create = $(document.createElement('div'))
		}


		
		var _div_delete = 	$(document.createElement('div'))
							.addClass('jSticky-delete');
		
		_div_delete.click(function(e){
			$(this).parent().remove();
		})
		
		var _div_wrap 	= 	$(document.createElement('div'))
							.css({'position':'absolute','top':'40px','left':'40px'})
							.append(_div_note)
							.append(_div_delete)

		if(o.top){
			_div_wrap.css('top', o.top);
		}

		if(o.left){
			_div_wrap.css('left', o.left);	
		}

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
		$('#content').append(_div_wrap);
	};
})(jQuery);