var userName = "";

function setCookie(cname, cval) {
	var expDate = new Date();
	expDate.setDate(expDate.getDate()+365);
    var mystring = cname + "=" + cval + "; expires=" + expDate.toGMTString();
    document.cookie = mystring;
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname){
	if(getCookie(cname) != ""){
		return true;
	} else {
		return false;
	}
}