//function to save sticky notes position, color, and content to LocalStorage
saveNotes = function(){
    var noteList = document.getElementsByClassName("jStickyNote");
    var noteNum;
    var noteobj;
	//the values are placed in an array
    var noteArr = [];
    for (noteNum = 0; noteNum < noteList.length; noteNum++) {
	noteObj = new Object();
	noteObj["top"] = noteList[noteNum].getBoundingClientRect().top.toString() + "px";
	noteObj["left"] = noteList[noteNum].getBoundingClientRect().left.toString() + "px";
	noteObj["color"] = noteList[noteNum].parentNode.getAttribute('class').split(' ')[0];
	noteObj["content"] = noteList[noteNum].getElementsByTagName("TEXTAREA")[0].value;
	noteArr.push(noteObj);
    }
	//and we use JSON to stringify the array for LocalStorage
    localStorage.setItem('NoteList', JSON.stringify(noteArr));
}

//function to read LocalStorage and parse objects in the array
loadNotes = function(){
	//JSON parse loads elements back into an array
	var noteList = JSON.parse(localStorage.getItem("NoteList"));
	var noteNum;
	//for each entry in the array, generate a sticky note
	for (noteNum = 0; noteNum < noteList.length; noteNum++) {
		var _note_content = $(document.createElement('textarea'));
		_note_content.val(noteList[noteNum].content.toString());
		var _div_note 	= $(document.createElement('div'))
					.addClass('jStickyNote')
					.css('cursor','move');
		_div_note.append(_note_content);

		var _div_delete = $(document.createElement('div'))
				.addClass('jSticky-delete');

		//put a little delete button in the corner of each sticky note
		_div_delete.click(function(e){
			$(this).parent().remove();
		});
		
		//build the sticky note
		var _div_wrap = $(document.createElement('div'))
				.css({'position':'fixed'})
				.append(_div_note)
				.append(_div_delete)
		_div_wrap.css('top', noteList[noteNum].top.toString());
		_div_wrap.css('left', noteList[noteNum].left.toString());	
		_div_wrap.addClass(noteList[noteNum].color.toString());
		_div_wrap.draggable({ scroll: false ,start: function(event, ui) {
			$(this).parent().append($(this));
		}});	
		//put it on screen as a draggable object
		$('#content').append(_div_wrap);

	}
}

