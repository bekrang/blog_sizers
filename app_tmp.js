

/*
var httpRequest = require("./modules/httpRequest.js").httpRequest;

var postData = 		{
	"url":"http://sizers.cloudfoundry.com/postview/1234",
	"title":"임시타이틀",
	"blog_name":"sizers",
	"excerpt":"test..."
}
var url = "http://sizers.cloudfoundry.com/trackback/4f6837de3e2bd0397200058b";//http://blog.naver.com/tb/oralhazard/30133536689
httpRequest.request(url, "80", postData, function(rtnData){
	console.log(rtnData);
	//res.end(JSON.stringify(rtnData));
});
*/


/*
var a = JSON.stringify({"a":"1","b":"2"});

console.log({"a":"1","b":"2"});
*/


// We need this to build our post string var querystring = require('querystring'); 
var http = require('http'); 
//var fs = require('fs');  
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