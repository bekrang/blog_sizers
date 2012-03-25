//http://stackoverflow.com/questions/6158933/http-post-request-in-node-js

// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
//var fs = require('fs');


var httpRequest = exports.httpRequest = {
	
	request : function(url, port, jsonData, callback){   
		// Build the post string from an object   
		url = url.replace("http://",'').replace("https://",'');
		var host = url.split("/")[0];
		var path = url.replace(host,'');
		
		var post_data = jsonData;/*{
			"url":"http://sizers.cloudfoundry.com/postview/1234",
			"title":"임시타이틀",
			"blog_name":"sizers",
			"excerpt":"test..."
		};*/
		post_data = querystring.stringify(post_data);

		// An object of options to indicate where to post to       http://blog.naver.com/tb/oralhazard/30133536689
		var post_options = {       
			host: host,//'sizers.cloudfoundry.com',       
			port: port,       
			path: path,//'/stylesheets/style.css',       
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
				//console.log(res_data);
				if(callback) callback(res_data);
			});
		});    // post the data   
		
		post_req.write(post_data);   
		post_req.end();  
	}  
		
	/*
	request : function(url, port, jsonData, callback){
		  // Build the post string from an object
		  var post_data = querystring.stringify(jsonData);

		  // An object of options to indicate where to post to
		  var post_options = {
		      host: url.replace("http://","").split("/")[0],//'closure-compiler.appspot.com',
		      port: port,
		      path: "/" + url.split("/")[1],
		      method: 'POST',
		      headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'Content-Length': post_data.length
		      }
		  };

		  // Set up the request
		  var post_req = http.request(post_options, function(res) {
		      res.setEncoding('utf8');
		      var resp_data = "";
		      / *
		      res.on('data', function (chunk) {
		          console.log('Response: ' + chunk);
		      });
		      * /
		      res.on('data', function (chunk) {
		          //console.log('Response: ' + chunk);
		          resp_data += chunk;
		      });
		      res.on('end',function(){
				//console.log(resp_data);
		    	if(callback){
		    		callback(resp_data);
		    	}
		      });
		      
		  });

		  // post the data
		  post_req.write(post_data);
		  post_req.end();
	}
	*/
}