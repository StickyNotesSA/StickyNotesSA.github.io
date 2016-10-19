
createJournalEntry = function(){

	var _journal_entry = "<td class=&quot;journalEntry&quot;><textarea class=&quot;journalText&quot;></textarea></td>";
	var _journal_date = "<td class=&quot;journalDate&quot;></td>";
	var _blank_td = "<td></td>";
	var _journal_DateRow = "<tr class=&quot;journalDateRow&quot;>" + _journal_date + _blank_td + "</tr>";
	var _journal_EntryRow = "<tr class=&quot;journalEntryRow&quot;>" + _blank_td + _journal_entry + "</tr>";
	
	//alert(_journal_EntryRow);
	var mytable = document.getElementById("journalTable");
	//alert(mytable);
	$("#journalTable tbody").prepend(_journal_EntryRow.toString());
		//alert("?????");
	$("#journalTable tbody").prepend(_journal_DateRow);

	//alert("Appended");
}

createJournalEntry2 = function(){
	var _journal_content = $(document.createElement('textarea'));
		_journal_content.val("This is a test");
	var _journal_entry 	= $(document.createElement('td'))
					.addClass('journalEntry');
	
	var _journal_date 	= $(document.createElement('td'))
					.addClass('journalDate');
	var _journal_EntryRow 	= $(document.createElement('tr'))
					.addClass('journalEntryRow');
	var _journal_DateRow 	= $(document.createElement('tr'))
					.addClass('journalDateRow');
					
	var _td_blank1 = $(document.createElement('td'));
	var _td_blank2 = $(document.createElement('td'));

	_journal_entry.append(_journal_content);
	_journal_DateRow.append(_journal_date);
	_journal_DateRow.append(_td_blank1);
	
	_journal_EntryRow.append(_td_blank2);
	_journal_EntryRow.append(_journal_entry);
	
	$("#journalTable tbody").prepend(_journal_EntryRow.toString());
	$("#journalTable tbody").prepend(_journal_DateRow.toString());
	
}