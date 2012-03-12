var mongoose = require('mongoose');
var properties = require('./properties.js');
var models = require('./modules/models.js');
var svcController = require('./modules/svccontroller.js');

var getCateNm = exports.getCateNm = function(cateKey){
	for(var i=0;i<properties.postCate.length;i++){
		if(properties.postCate[i].key == cateKey) return properties.postCate[i].val;
	}
	return "";
}


//Prototyping Date Object 
Date.prototype.format = function(f) { 
	if (!this.valueOf()) return " "; 

	var weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
	var d = this; 
	
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) { 
		switch ($1) { 
			case "yyyy": return d.getFullYear(); 
			case "yy": return (d.getFullYear() % 1000).zf(2); 
			case "MM": return (d.getMonth() + 1).zf(2); 
			case "dd": return d.getDate().zf(2); 
			case "E": return weekName[d.getDay()]; 
			case "HH": return d.getHours().zf(2); 
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); 
			case "mm": return d.getMinutes().zf(2); 
			case "ss": return d.getSeconds().zf(2); 
			case "a/p": return d.getHours() < 12 ? "AM" : "PM"; 
			default: return $1; 
		} 
	}); 
}; 
//But I don't think it's a good idea.
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;}; 
String.prototype.zf = function(len){return "0".string(len - this.length) + this;}; 
Number.prototype.zf = function(len){return this.toString().zf(len);};

//It's a useful mehtod
var dump = exports.dump = function (obj, name) {
	var indent = "	";
	if (typeof obj == "object") {
		var child = null;
		var output = (name) ? indent + name + "\n" : "";
		indent += "\t";

		for (var item in obj)
		{
			try {
				child = obj[item];
			} catch (e) {
				child = "<Unable to Evaluate>";
			}

			if (typeof child == "object") {
				output += dump(child, item);
			} else {
				output += indent + item + ": " + child + "\n";
			}
		}
		return output;
	} else {
		return obj;
	}
};

//Making RFC822DATE
var getRFC822Date = exports.getRFC822Date = function (oDate)
{
	var aMonths = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", 
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

	var aDays = new Array( "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	var dtm = new String();
			
	dtm = aDays[oDate.getDay()] + ", ";
	dtm += padWithZero(oDate.getDate()) + " ";
	dtm += aMonths[oDate.getMonth()] + " ";
	dtm += oDate.getFullYear() + " ";
	dtm += padWithZero(oDate.getHours()) + ":";
	dtm += padWithZero(oDate.getMinutes()) + ":";
	dtm += padWithZero(oDate.getSeconds()) + " " ;
	dtm += getTZOString(oDate.getTimezoneOffset());
	return dtm;
}
//Pads numbers with a preceding 0 if the number is less than 10.
function padWithZero(val)
{
	if (parseInt(val) < 10)
	{
		return "0" + val;
	}
	return val;
}

/* accepts the client's time zone offset from GMT in minutes as a parameter.
returns the timezone offset in the format [+|-}DDDD */
function getTZOString(timezoneOffset)
{
	var hours = Math.floor(timezoneOffset/60);
	var modMin = Math.abs(timezoneOffset%60);
	var s = new String();
	s += (hours > 0) ? "-" : "+";
	var absHours = Math.abs(hours)
	s += (absHours < 10) ? "0" + absHours :absHours;
	s += ((modMin == 0) ? "00" : modMin);
	return(s);
}
