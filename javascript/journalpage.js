//Journal entries are stored in LocalStorage as a single entry.

//Journal list kept coming up in random order, so a hidden attribute was added to assist in sorting.
//Cound not sort on date since we are only returning up to minute.
//found a really good generic sort scriptlet on stackoverflow

var maxEntry = 0;

newJournalEntry = function(entryTime){
	updateJournalEntries();
	createJournalEntry(entryTime);
}

createJournalEntry = function(entryTime){
	var _journal_entry = "<td class=journalEntry id=journalEntry><textarea class=editjournalText id=editjournalText></textarea></td>";
	var _journal_date = "<td class=editjournalDate id=editjournalDate></td>";
	var _journal_DateRow = "<tr class=journalDateRow>" + _journal_date + "</tr>";
	var _journal_EntryRow = "<tr class=journalEntryRow>" + _journal_entry + "</tr>";
	var mytable = document.getElementById("journalTable");
	$("#journalTable tbody").prepend(_journal_EntryRow.toString());
	$("#journalTable tbody").prepend(_journal_DateRow);
	document.getElementById("editjournalDate").innerHTML = entryTime;
	$("#editjournalText").attr("hiddenVal", entryTime);
	$("#editjournalText").attr("order", maxEntry++);
	document.getElementById("editjournalText").focus();
}

updateJournalEntries = function(){
	var curEntry = document.getElementById("editjournalText");
	if(curEntry != null){
		curEntry.id = "journalText";
		curEntry.className = "journalText";
	}
	curEntry = document.getElementById("editjournalDate");
	if(curEntry != null){
		curEntry.id = "journalDate";
		curEntry.className = "journalDate";
	}
	var existingEntries = document.getElementsByClassName("journalText");
	var i;
	for(i=0; i<existingEntries.length;i++){
		existingEntries[i].setAttribute("readOnly","true");
	}
}

commitJournalEntries = function(){
	var journalArr = [];
	var journalObj;
	var existingEntries = document.getElementsByClassName("journalText");
	var i;
	for(i=0; i<existingEntries.length;i++){
		if(existingEntries[i].value != ""){
			journalObj = new Object();
			journalObj["jDate"] = existingEntries[i].getAttribute("hiddenVal");
			journalObj["jOrder"] = existingEntries[i].getAttribute("order");
			journalObj["jEntry"] = existingEntries[i].value;
			existingEntries[i].setAttribute("readOnly","true");
			journalArr.push(journalObj);
		}
	}
	localStorage.setItem('JournalEntries', JSON.stringify(journalArr));
}

loadJournalEntries = function(){
	var journalList = JSON.parse(localStorage.getItem("JournalEntries"));
	var jNum;
	maxEntry = 0;
	if(journalList != null){
		var sortedList = journalList.sort(sort_by('jOrder', false, parseInt));
		for (jNum = 0; jNum < sortedList.length; jNum++) {
			createJournalEntry(sortedList[jNum].jDate.toString());
			document.getElementById("editjournalText").value = sortedList[jNum].jEntry.toString();
			updateJournalEntries();
		}
	} else {
		createJournalEntry(GetJournalDate());
	}
}

//Sort attribution:  http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}
