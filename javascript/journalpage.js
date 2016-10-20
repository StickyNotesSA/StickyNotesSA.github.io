//Journal entries are stored in LocalStorage as a single entry.

//Journal list kept coming up in random order, so a hidden attribute was added to assist in sorting.
//Cound not sort on date since we are only returning up to minute.
//found a really good generic sort scriptlet on stackoverflow

//track elements for sorting
var maxEntry = 0;

//create a new journal entry calls other functions
newJournalEntry = function(entryTime){
	updateJournalEntries();
	createJournalEntry(entryTime);
}

//code to create two table rows to store our journal elements
createJournalEntry = function(entryTime){
	var _journal_entry = "<td class=journalEntry id=journalEntry><textarea class=editjournalText id=editjournalText></textarea></td>";
	var _journal_date = "<td class=editjournalDate id=editjournalDate></td>";
	var _journal_DateRow = "<tr class=journalDateRow>" + _journal_date + "</tr>";
	var _journal_EntryRow = "<tr class=journalEntryRow>" + _journal_entry + "</tr>";
	var mytable = document.getElementById("journalTable");
	$("#journalTable tbody").prepend(_journal_EntryRow.toString());
	$("#journalTable tbody").prepend(_journal_DateRow);
	document.getElementById("editjournalDate").innerHTML = entryTime;
	//store some data in hidden values to make it easier to send to LocalStorage
	$("#editjournalText").attr("hiddenVal", entryTime);
	$("#editjournalText").attr("order", maxEntry++);
	document.getElementById("editjournalText").focus();
}

//change the editable text entry area to readonly and modif class for storage recall
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

//read the journal entries in place date, entry number, and content into array 
//disregard empty entries
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
	//stringify and place array in LocalStorage
	localStorage.setItem('JournalEntries', JSON.stringify(journalArr));
}

//load the entries from LocalStorage into an array using JSON parse
loadJournalEntries = function(){
	var journalList = JSON.parse(localStorage.getItem("JournalEntries"));
	var jNum;
	//reset maxEntry to 0 so we remove gaps in the numbering as we rebuild the entries to screen
	maxEntry = 0;
	//if there are entries to load, sort them by entry number so oldest go on screen at bottom
	if(journalList != null){
		var sortedList = journalList.sort(sort_by('jOrder', false, parseInt));
		for (jNum = 0; jNum < sortedList.length; jNum++) {
			createJournalEntry(sortedList[jNum].jDate.toString());
			document.getElementById("editjournalText").value = sortedList[jNum].jEntry.toString();
			updateJournalEntries();
		}
	} else {
		//open a new entry for the user
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
