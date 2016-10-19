
createJournalEntry = function(){

	var _journal_entry = "<td class=&quot;journalEntry&quot;><textarea class=&quot;journalText&quot;></textarea></td>";
	var _journal_date = "<td class=&quot;journalDate&quot;></td>";
	var _blank_td = "<td></td>";
	var _journal_DateRow = "<tr class=&quot;journalDateRow&quot;>" + _journal_date + _blank_td + "</tr>";
	var _journal_EntryRow = "<tr class=&quot;journalEntryRow&quot;>" + _blank_td + _journal_entry + "</tr>";
	var mytable = document.getElementById("journalTable");
	$("#journalTable tbody").prepend(_journal_EntryRow.toString());
	$("#journalTable tbody").prepend(_journal_DateRow);

}

