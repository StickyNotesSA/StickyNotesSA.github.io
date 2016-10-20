var userName = "";

//set the cookie value for a named key
function setCookie(cname, cval) {
	var expDate = new Date();
	expDate.setDate(expDate.getDate()+365);
    var mystring = cname + "=" + cval + "; expires=" + expDate.toGMTString();
    document.cookie = mystring;
}

//get the cookie value for the named key
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

//check if a cookie with the key requested is available
function checkCookie(cname){
	if(getCookie(cname) != ""){
		return true;
	} else {
		return false;
	}
}