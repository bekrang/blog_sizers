// We need this to build our post string var querystring = require('querystring'); 
var http = require('http'); 
//var fs = require('fs');

var xml2json = require('./modules/xml2json.js').xml2json;

var xml = '<?xml version="1.0" encoding="iso-8859-1"?><response><error>0</error></response>';
var o = xml2json.parser(xml);

console.log(o.response.error);




/*
var querystring = require('querystring');
PostCode();
// ㅋㅋㅋㅋㅋㅋ 트랙백보내기 성공.. ㅋㅋㅋㅋㄹ
function PostCode() {   
	// Build the post string from an object   
	var post_data = {
		"url":"http://sizers.cloudfoundry.com/postview/1234",
		"title":"임시타이틀",
		"blog_name":"sizers",
		"excerpt":"test..."
	};
	post_data = querystring.stringify(post_data);

	// An object of options to indicate where to post to       http://blog.naver.com/tb/oralhazard/30133536689
	var post_options = {       
		host: 'blog.naver.com',//'sizers.cloudfoundry.com',       
		port: '80',       
		path: '/tb/oralhazard/30133536689',//'/stylesheets/style.css',       
		method: 'POST',       
		headers: {           
			'Content-Type': 'application/x-www-form-urlencoded',           
			'Content-Length': post_data.length       
		}   
	};    
	// Set up the request   
	var post_req = http.request(post_options, function(res) {       
		res.setEncoding('utf8');
		var res_data = "";
		res.on('data', function (chunk) {           
			res_data += chunk;
			//console.log('Response: ' + chunk);      
		});   
		res.on('end',function(){
			console.log(res_data);      
		});
	});    // post the data   
	
	post_req.write(post_data);   
	post_req.end();  
}  
*/