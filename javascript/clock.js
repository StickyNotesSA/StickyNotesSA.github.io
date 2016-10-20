//arrays to convert numbers to nice text values
var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

//get the clock data down to the second and set the value into the clock elements
function GetClock(){
	var d=new Date();
	var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
	if(nyear<1000) nyear+=1900;
	var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

	if(nhour==0){ap=" AM";nhour=12;}
	else if(nhour<12){ap=" AM";}
	else if(nhour==12){ap=" PM";}
	else if(nhour>12){ap=" PM";nhour-=12;}

	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;
	document.getElementById('clockDate').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+"";
	document.getElementById('clockTime').innerHTML=""+nhour+":"+nmin+":"+nsec+ap+"";
}

//return a date and time entry for journal entries - only down to the minute..
function GetJournalDate(){
	var d=new Date();
	var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
	if(nyear<1000) nyear+=1900;
	var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

	if(nhour==0){ap=" AM";nhour=12;}
	else if(nhour<12){ap=" AM";}
	else if(nhour==12){ap=" PM";}
	else if(nhour>12){ap=" PM";nhour-=12;}
	if(nmin<=9) nmin="0"+nmin;

	var jdate = ""+tmonth[nmonth]+" "+ndate+", " + nyear + " " + nhour + ":" + nmin + ap +"";
	return jdate;
}